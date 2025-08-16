import { CarService } from './car.service';
import { CreateCarDto } from '../../common/dto/create-car.dto';
import { UpdateCarDto } from '../../common/dto/update-car.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Car } from '../../core/entity/car.entity';
export declare class CarController {
    private readonly carService;
    constructor(carService: CarService);
    create(createCarDto: CreateCarDto): Promise<Car>;
    findAll(paginationDto: PaginationDto, brand?: string, color?: string, minPrice?: number, maxPrice?: number, minPower?: number, maxPower?: number, search?: string): Promise<{
        cars: Car[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    search(searchTerm: string): Promise<Car[]>;
    getBrands(): Promise<string[]>;
    getColors(): Promise<string[]>;
    getStatistics(): Promise<{
        totalCars: number;
        averagePrice: number;
        totalPower: number;
        brandsCount: number;
    }>;
    findByBrand(brand: string): Promise<Car[]>;
    findByPriceRange(minPrice: number, maxPrice: number): Promise<Car[]>;
    findByPowerRange(minPower: number, maxPower: number): Promise<Car[]>;
    findOne(id: number): Promise<Car>;
    update(id: number, updateCarDto: UpdateCarDto): Promise<Car>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
