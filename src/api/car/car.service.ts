import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CarRepository } from '../../core/repository/car.repository';
import { CreateCarDto } from '../../common/dto/create-car.dto';
import { UpdateCarDto } from '../../common/dto/update-car.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Car } from '../../core/entity/car.entity';

@Injectable()
export class CarService {
  constructor(private readonly carRepository: CarRepository) {}

  async create(createCarDto: CreateCarDto): Promise<Car> {
    try {
      return await this.carRepository.create(createCarDto);
    } catch (error) {
      throw new BadRequestException('Failed to create car: ' + error.message);
    }
  }

  async findAll(paginationDto: PaginationDto, filters?: any): Promise<{
    cars: Car[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    try {
      return await this.carRepository.findAll(paginationDto, filters);
    } catch (error) {
      throw new BadRequestException('Failed to fetch cars: ' + error.message);
    }
  }

  async findOne(id: number): Promise<Car> {
    try {
      const car = await this.carRepository.findOne(id);
      if (!car) {
        throw new NotFoundException(`Car with ID ${id} not found`);
      }
      return car;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to fetch car: ' + error.message);
    }
  }

  async update(id: number, updateCarDto: UpdateCarDto): Promise<Car> {
    try {
      // Check if car exists
      await this.findOne(id);
      return await this.carRepository.update(id, updateCarDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to update car: ' + error.message);
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      // Check if car exists
      await this.findOne(id);
      await this.carRepository.remove(id);
      return { message: `Car with ID ${id} has been successfully deleted` };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to delete car: ' + error.message);
    }
  }

  async findByBrand(brand: string): Promise<Car[]> {
    try {
      const cars = await this.carRepository.findByBrand(brand);
      if (cars.length === 0) {
        throw new NotFoundException(`No cars found for brand: ${brand}`);
      }
      return cars;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to fetch cars by brand: ' + error.message);
    }
  }

  async findByPriceRange(minPrice: number, maxPrice: number): Promise<Car[]> {
    try {
      if (minPrice > maxPrice) {
        throw new BadRequestException('Minimum price cannot be greater than maximum price');
      }
      const cars = await this.carRepository.findByPriceRange(minPrice, maxPrice);
      if (cars.length === 0) {
        throw new NotFoundException(`No cars found in price range: $${minPrice} - $${maxPrice}`);
      }
      return cars;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to fetch cars by price range: ' + error.message);
    }
  }

  async findByPowerRange(minPower: number, maxPower: number): Promise<Car[]> {
    try {
      if (minPower > maxPower) {
        throw new BadRequestException('Minimum power cannot be greater than maximum power');
      }
      const cars = await this.carRepository.findByPowerRange(minPower, maxPower);
      if (cars.length === 0) {
        throw new NotFoundException(`No cars found in power range: ${minPower} - ${maxPower} hp`);
      }
      return cars;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to fetch cars by power range: ' + error.message);
    }
  }

  async getBrands(): Promise<string[]> {
    try {
      return await this.carRepository.getBrands();
    } catch (error) {
      throw new BadRequestException('Failed to fetch brands: ' + error.message);
    }
  }

  async getColors(): Promise<string[]> {
    try {
      return await this.carRepository.getColors();
    } catch (error) {
      throw new BadRequestException('Failed to fetch colors: ' + error.message);
    }
  }

  async getStatistics(): Promise<{
    totalCars: number;
    averagePrice: number;
    totalPower: number;
    brandsCount: number;
  }> {
    try {
      return await this.carRepository.getStatistics();
    } catch (error) {
      throw new BadRequestException('Failed to fetch statistics: ' + error.message);
    }
  }

  async searchCars(searchTerm: string): Promise<Car[]> {
    try {
      const filters = { search: searchTerm };
      const result = await this.carRepository.findAll({ page: 1, limit: 100 }, filters);
      if (result.cars.length === 0) {
        throw new NotFoundException(`No cars found matching: ${searchTerm}`);
      }
      return result.cars;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to search cars: ' + error.message);
    }
  }
}
