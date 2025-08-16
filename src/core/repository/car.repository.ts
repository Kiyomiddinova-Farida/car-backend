import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Car } from '../entity/car.entity';
import { CreateCarDto } from '../../common/dto/create-car.dto';
import { UpdateCarDto } from '../../common/dto/update-car.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class CarRepository {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  async create(createCarDto: CreateCarDto): Promise<Car> {
    const car = this.carRepository.create(createCarDto);
    return await this.carRepository.save(car);
  }

  async findAll(paginationDto: PaginationDto, filters?: any): Promise<{
    cars: Car[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    let queryBuilder = this.carRepository.createQueryBuilder('car');

    // Apply filters if provided
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

  async findOne(id: number): Promise<Car> {
    return await this.carRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCarDto: UpdateCarDto): Promise<Car> {
    await this.carRepository.update(id, updateCarDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.carRepository.delete(id);
  }

  async findByBrand(brand: string): Promise<Car[]> {
    return await this.carRepository.find({
      where: { brand },
      order: { createdAt: 'DESC' },
    });
  }

  async findByPriceRange(minPrice: number, maxPrice: number): Promise<Car[]> {
    return await this.carRepository
      .createQueryBuilder('car')
      .where('car.price >= :minPrice', { minPrice })
      .andWhere('car.price <= :maxPrice', { maxPrice })
      .orderBy('car.price', 'ASC')
      .getMany();
  }

  async findByPowerRange(minPower: number, maxPower: number): Promise<Car[]> {
    return await this.carRepository
      .createQueryBuilder('car')
      .where('car.power >= :minPower', { minPower })
      .andWhere('car.power <= :maxPower', { maxPower })
      .orderBy('car.power', 'DESC')
      .getMany();
  }

  async getBrands(): Promise<string[]> {
    const result = await this.carRepository
      .createQueryBuilder('car')
      .select('DISTINCT car.brand', 'brand')
      .getRawMany();
    return result.map((item) => item.brand);
  }

  async getColors(): Promise<string[]> {
    const result = await this.carRepository
      .createQueryBuilder('car')
      .select('DISTINCT car.color', 'color')
      .getRawMany();
    return result.map((item) => item.color);
  }

  async getStatistics(): Promise<{
    totalCars: number;
    averagePrice: number;
    totalPower: number;
    brandsCount: number;
  }> {
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

  private applyFilters(
    queryBuilder: SelectQueryBuilder<Car>,
    filters: any,
  ): SelectQueryBuilder<Car> {
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
      queryBuilder.andWhere(
        '(car.name LIKE :search OR car.brand LIKE :search)',
        { search: `%${filters.search}%` },
      );
    }

    return queryBuilder;
  }
}
