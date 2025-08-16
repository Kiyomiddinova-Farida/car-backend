import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  ParseFloatPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { CarService } from './car.service';
import { CreateCarDto } from '../../common/dto/create-car.dto';
import { UpdateCarDto } from '../../common/dto/update-car.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { Car } from '../../core/entity/car.entity';

@ApiTags('cars')
@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new car' })
  @ApiResponse({
    status: 201,
    description: 'Car has been successfully created',
    type: Car,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: CreateCarDto })
  create(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return this.carService.create(createCarDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cars with pagination and filters' })
  @ApiResponse({
    status: 200,
    description: 'List of cars retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        cars: {
          type: 'array',
          items: { $ref: '#/components/schemas/Car' },
        },
        total: { type: 'number' },
        page: { type: 'number' },
        limit: { type: 'number' },
        totalPages: { type: 'number' },
      },
    },
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'brand', required: false, type: String })
  @ApiQuery({ name: 'color', required: false, type: String })
  @ApiQuery({ name: 'minPrice', required: false, type: Number })
  @ApiQuery({ name: 'maxPrice', required: false, type: Number })
  @ApiQuery({ name: 'minPower', required: false, type: Number })
  @ApiQuery({ name: 'maxPower', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  findAll(
    @Query() paginationDto: PaginationDto,
    @Query('brand') brand?: string,
    @Query('color') color?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('minPower') minPower?: number,
    @Query('maxPower') maxPower?: number,
    @Query('search') search?: string,
  ) {
    const filters = {
      brand,
      color,
      minPrice,
      maxPrice,
      minPower,
      maxPower,
      search,
    };
    return this.carService.findAll(paginationDto, filters);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search cars by name or brand' })
  @ApiResponse({
    status: 200,
    description: 'Search results retrieved successfully',
    type: [Car],
  })
  @ApiResponse({ status: 404, description: 'No cars found' })
  @ApiQuery({ name: 'q', required: true, description: 'Search term' })
  search(@Query('q') searchTerm: string): Promise<Car[]> {
    return this.carService.searchCars(searchTerm);
  }

  @Get('brands')
  @ApiOperation({ summary: 'Get all available car brands' })
  @ApiResponse({
    status: 200,
    description: 'List of brands retrieved successfully',
    type: [String],
  })
  getBrands(): Promise<string[]> {
    return this.carService.getBrands();
  }

  @Get('colors')
  @ApiOperation({ summary: 'Get all available car colors' })
  @ApiResponse({
    status: 200,
    description: 'List of colors retrieved successfully',
    type: [String],
  })
  getColors(): Promise<string[]> {
    return this.carService.getColors();
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get car statistics' })
  @ApiResponse({
    status: 200,
    description: 'Statistics retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        totalCars: { type: 'number' },
        averagePrice: { type: 'number' },
        totalPower: { type: 'number' },
        brandsCount: { type: 'number' },
      },
    },
  })
  getStatistics() {
    return this.carService.getStatistics();
  }

  @Get('brand/:brand')
  @ApiOperation({ summary: 'Get cars by brand' })
  @ApiResponse({
    status: 200,
    description: 'Cars by brand retrieved successfully',
    type: [Car],
  })
  @ApiResponse({ status: 404, description: 'No cars found for this brand' })
  @ApiParam({ name: 'brand', description: 'Car brand name' })
  findByBrand(@Param('brand') brand: string): Promise<Car[]> {
    return this.carService.findByBrand(brand);
  }

  @Get('price-range')
  @ApiOperation({ summary: 'Get cars by price range' })
  @ApiResponse({
    status: 200,
    description: 'Cars in price range retrieved successfully',
    type: [Car],
  })
  @ApiResponse({ status: 404, description: 'No cars found in this price range' })
  @ApiQuery({ name: 'minPrice', required: true, type: Number })
  @ApiQuery({ name: 'maxPrice', required: true, type: Number })
  findByPriceRange(
    @Query('minPrice', ParseFloatPipe) minPrice: number,
    @Query('maxPrice', ParseFloatPipe) maxPrice: number,
  ): Promise<Car[]> {
    return this.carService.findByPriceRange(minPrice, maxPrice);
  }

  @Get('power-range')
  @ApiOperation({ summary: 'Get cars by power range' })
  @ApiResponse({
    status: 200,
    description: 'Cars in power range retrieved successfully',
    type: [Car],
  })
  @ApiResponse({ status: 404, description: 'No cars found in this power range' })
  @ApiQuery({ name: 'minPower', required: true, type: Number })
  @ApiQuery({ name: 'maxPower', required: true, type: Number })
  findByPowerRange(
    @Query('minPower', ParseIntPipe) minPower: number,
    @Query('maxPower', ParseIntPipe) maxPower: number,
  ): Promise<Car[]> {
    return this.carService.findByPowerRange(minPower, maxPower);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a car by ID' })
  @ApiResponse({
    status: 200,
    description: 'Car retrieved successfully',
    type: Car,
  })
  @ApiResponse({ status: 404, description: 'Car not found' })
  @ApiParam({ name: 'id', description: 'Car ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Car> {
    return this.carService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a car' })
  @ApiResponse({
    status: 200,
    description: 'Car updated successfully',
    type: Car,
  })
  @ApiResponse({ status: 404, description: 'Car not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiParam({ name: 'id', description: 'Car ID' })
  @ApiBody({ type: UpdateCarDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCarDto: UpdateCarDto,
  ): Promise<Car> {
    return this.carService.update(id, updateCarDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a car' })
  @ApiResponse({
    status: 200,
    description: 'Car deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Car not found' })
  @ApiParam({ name: 'id', description: 'Car ID' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.carService.remove(id);
  }
}
