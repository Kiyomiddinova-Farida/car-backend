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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarService = void 0;
const common_1 = require("@nestjs/common");
const car_repository_1 = require("../../core/repository/car.repository");
let CarService = class CarService {
    constructor(carRepository) {
        this.carRepository = carRepository;
    }
    async create(createCarDto) {
        try {
            return await this.carRepository.create(createCarDto);
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to create car: ' + error.message);
        }
    }
    async findAll(paginationDto, filters) {
        try {
            return await this.carRepository.findAll(paginationDto, filters);
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch cars: ' + error.message);
        }
    }
    async findOne(id) {
        try {
            const car = await this.carRepository.findOne(id);
            if (!car) {
                throw new common_1.NotFoundException(`Car with ID ${id} not found`);
            }
            return car;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to fetch car: ' + error.message);
        }
    }
    async update(id, updateCarDto) {
        try {
            await this.findOne(id);
            return await this.carRepository.update(id, updateCarDto);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to update car: ' + error.message);
        }
    }
    async remove(id) {
        try {
            await this.findOne(id);
            await this.carRepository.remove(id);
            return { message: `Car with ID ${id} has been successfully deleted` };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to delete car: ' + error.message);
        }
    }
    async findByBrand(brand) {
        try {
            const cars = await this.carRepository.findByBrand(brand);
            if (cars.length === 0) {
                throw new common_1.NotFoundException(`No cars found for brand: ${brand}`);
            }
            return cars;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to fetch cars by brand: ' + error.message);
        }
    }
    async findByPriceRange(minPrice, maxPrice) {
        try {
            if (minPrice > maxPrice) {
                throw new common_1.BadRequestException('Minimum price cannot be greater than maximum price');
            }
            const cars = await this.carRepository.findByPriceRange(minPrice, maxPrice);
            if (cars.length === 0) {
                throw new common_1.NotFoundException(`No cars found in price range: $${minPrice} - $${maxPrice}`);
            }
            return cars;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to fetch cars by price range: ' + error.message);
        }
    }
    async findByPowerRange(minPower, maxPower) {
        try {
            if (minPower > maxPower) {
                throw new common_1.BadRequestException('Minimum power cannot be greater than maximum power');
            }
            const cars = await this.carRepository.findByPowerRange(minPower, maxPower);
            if (cars.length === 0) {
                throw new common_1.NotFoundException(`No cars found in power range: ${minPower} - ${maxPower} hp`);
            }
            return cars;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException || error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to fetch cars by power range: ' + error.message);
        }
    }
    async getBrands() {
        try {
            return await this.carRepository.getBrands();
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch brands: ' + error.message);
        }
    }
    async getColors() {
        try {
            return await this.carRepository.getColors();
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch colors: ' + error.message);
        }
    }
    async getStatistics() {
        try {
            return await this.carRepository.getStatistics();
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to fetch statistics: ' + error.message);
        }
    }
    async searchCars(searchTerm) {
        try {
            const filters = { search: searchTerm };
            const result = await this.carRepository.findAll({ page: 1, limit: 100 }, filters);
            if (result.cars.length === 0) {
                throw new common_1.NotFoundException(`No cars found matching: ${searchTerm}`);
            }
            return result.cars;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.BadRequestException('Failed to search cars: ' + error.message);
        }
    }
};
exports.CarService = CarService;
exports.CarService = CarService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [car_repository_1.CarRepository])
], CarService);
//# sourceMappingURL=car.service.js.map