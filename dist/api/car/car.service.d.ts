import { CarRepository } from '../../core/repository/car.repository';
import { CreateCarDto } from '../../common/dto/create-car.dto';
import { UpdateCarDto } from '../../common/dto/update-car.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Car } from '../../core/entity/car.entity';
export declare class CarService {
    private readonly carRepository;
    constructor(carRepository: CarRepository);
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
    remove(id: number): Promise<{
        message: string;
    }>;
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
    searchCars(searchTerm: string): Promise<Car[]>;
}
