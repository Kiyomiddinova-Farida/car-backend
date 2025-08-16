import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, IsDateString, IsPositive, IsNotEmpty } from 'class-validator';

export class CreateCarDto {
  @ApiProperty({
    description: 'Name of the car model',
    example: 'Tesla Model S',
    minLength: 2,
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  // @Min(2, { message: 'Name must be at least 2 characters long' })
  name: string;

  @ApiProperty({
    description: 'Price of the car in USD',
    example: 75000,
  })
  @IsNotEmpty({ message: 'Price is required' })
  @IsNumber({}, { message: 'Price must be a number' })
  @IsPositive({ message: 'Price must be positive' })
  price: number;

  @ApiProperty({
    description: 'Brand of the car',
    example: 'Tesla',
  })
  @IsNotEmpty({ message: 'Brand is required' })
  @IsString({ message: 'Brand must be a string' })
  brand: string;

  @ApiProperty({
    description: 'Color of the car',
    example: 'Red',
  })
  @IsNotEmpty({ message: 'Color is required' })
  @IsString({ message: 'Color must be a string' })
  color: string;

  @ApiProperty({
    description: 'Release date of the car model',
    example: '2023-01-15',
  })
  @IsNotEmpty({ message: 'Release date is required' })
  @IsDateString({}, { message: 'Release date must be a valid date string' })
  releaseDate: string;

  @ApiProperty({
    description: 'Power of the car in horsepower',
    example: 670,
  })
  @IsNotEmpty({ message: 'Power is required' })
  @IsNumber({}, { message: 'Power must be a number' })
  @IsPositive({ message: 'Power must be positive' })
  power: number;
}
