"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const car_entity_1 = require("../entity/car.entity");
let CarRepository = class CarRepository {
    constructor(carRepository) {
        this.carRepository = carRepository;
    }
    async create(createCarDto) {
        const car = this.carRepository.create(createCarDto);
        return await this.carRepository.save(car);
    }
    async findAll(paginationDto, filters) {
        const { page = 1, limit = 10 } = paginationDto;
        const skip = (page - 1) * limit;
        let queryBuilder = this.carRepository.createQueryBuilder('car');
        if (filters) {
            queryBuilder = this.applyFilters(queryBuilder, filters);
        }
        const [cars, total] = await queryBuilder
            .skip(skip)
            .take(limit)
            .orderBy('car.createdAt', 'DESC')
            .getManyAndCount();
        return {
            cars,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async findOne(id) {
        return await this.carRepository.findOne({ where: { id } });
    }
    async update(id, updateCarDto) {
        await this.carRepository.update(id, updateCarDto);
        return await this.findOne(id);
    }
    async remove(id) {
        await this.carRepository.delete(id);
    }
    async findByBrand(brand) {
        return await this.carRepository.find({
            where: { brand },
            order: { createdAt: 'DESC' },
        });
    }
    async findByPriceRange(minPrice, maxPrice) {
        return await this.carRepository
            .createQueryBuilder('car')
            .where('car.price >= :minPrice', { minPrice })
            .andWhere('car.price <= :maxPrice', { maxPrice })
            .orderBy('car.price', 'ASC')
            .getMany();
    }
    async findByPowerRange(minPower, maxPower) {
        return await this.carRepository
            .createQueryBuilder('car')
            .where('car.power >= :minPower', { minPower })
            .andWhere('car.power <= :maxPower', { maxPower })
            .orderBy('car.power', 'DESC')
            .getMany();
    }
    async getBrands() {
        const result = await this.carRepository
            .createQueryBuilder('car')
            .select('DISTINCT car.brand', 'brand')
            .getRawMany();
        return result.map((item) => item.brand);
    }
    async getColors() {
        const result = await this.carRepository
            .createQueryBuilder('car')
            .select('DISTINCT car.color', 'color')
            .getRawMany();
        return result.map((item) => item.color);
    }
    async getStatistics() {
        const totalCars = await this.carRepository.count();
        const averagePrice = await this.carRepository
            .createQueryBuilder('car')
            .select('AVG(car.price)', 'avgPrice')
            .getRawOne();
        const totalPower = await this.carRepository
            .createQueryBuilder('car')
            .select('SUM(car.power)', 'sumPower')
            .getRawOne();
        const brandsCount = await this.carRepository
            .createQueryBuilder('car')
            .select('COUNT(DISTINCT car.brand)', 'brandsCount')
            .getRawOne();
        return {
            totalCars,
            averagePrice: parseFloat(averagePrice.avgPrice) || 0,
            totalPower: parseInt(totalPower.sumPower) || 0,
            brandsCount: parseInt(brandsCount.brandsCount) || 0,
        };
    }
    applyFilters(queryBuilder, filters) {
        if (filters.brand) {
            queryBuilder.andWhere('car.brand = :brand', { brand: filters.brand });
        }
        if (filters.color) {
            queryBuilder.andWhere('car.color = :color', { color: filters.color });
        }
        if (filters.minPrice) {
            queryBuilder.andWhere('car.price >= :minPrice', {
                minPrice: filters.minPrice,
            });
        }
        if (filters.maxPrice) {
            queryBuilder.andWhere('car.price <= :maxPrice', {
                maxPrice: filters.maxPrice,
            });
        }
        if (filters.minPower) {
            queryBuilder.andWhere('car.power >= :minPower', {
                minPower: filters.minPower,
            });
        }
        if (filters.maxPower) {
            queryBuilder.andWhere('car.power <= :maxPower', {
                maxPower: filters.maxPower,
            });
        }
        if (filters.search) {
            queryBuilder.andWhere('(car.name LIKE :search OR car.brand LIKE :search)', { search: `%${filters.search}%` });
        }
        return queryBuilder;
    }
};
exports.CarRepository = CarRepository;
exports.CarRepository = CarRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(car_entity_1.Car)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CarRepository);
//# sourceMappingURL=car.repository.js.map