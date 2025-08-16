import { Repository } from 'typeorm';
import { Car } from '../entity/car.entity';
import { CreateCarDto } from '../../common/dto/create-car.dto';
import { UpdateCarDto } from '../../common/dto/update-car.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
export declare class CarRepository {
    private readonly carRepository;
    constructor(carRepository: Repository<Car>);
    create(createCarDto: CreateCarDto): Promise<Car>;
    findAll(paginationDto: PaginationDto, filters?: any): Promise<{
        cars: Car[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: number): Promise<Car>;
    update(id: number, updateCarDto: UpdateCarDto): Promise<Car>;
    remove(id: number): Promise<void>;
    findByBrand(brand: string): Promise<Car[]>;
    findByPriceRange(minPrice: number, maxPrice: number): Promise<Car[]>;
    findByPowerRange(minPower: number, maxPower: number): Promise<Car[]>;
    getBrands(): Promise<string[]>;
    getColors(): Promise<string[]>;
    getStatistics(): Promise<{
        totalCars: number;
        averagePrice: number;
        totalPower: number;
        brandsCount: number;
    }>;
    private applyFilters;
}
