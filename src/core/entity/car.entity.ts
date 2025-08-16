import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, IsDateString, IsPositive } from 'class-validator';

@Entity('cars')
export class Car {
  @ApiProperty({
    description: 'Unique identifier for the car',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Name of the car model',
    example: 'Tesla Model S',
    minLength: 2,
  })
  @Column({ type: 'varchar'})
  @IsString({ message: 'Name must be a string' })
  // @Min(2, { message: 'Name must be at least 2 characters long' })
  name: string;

  @ApiProperty({
    description: 'Price of the car in USD',
    example: 75000,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @IsNumber({}, { message: 'Price must be a number' })
  @IsPositive({ message: 'Price must be positive' })
  price: number;

  @ApiProperty({
    description: 'Brand of the car',
    example: 'Tesla',
  })
  @Column({ type: 'varchar', length: 100 })
  @IsString({ message: 'Brand must be a string' })
  brand: string;

  @ApiProperty({
    description: 'Color of the car',
    example: 'Red',
  })
  @Column({ type: 'varchar', length: 50 })
  @IsString({ message: 'Color must be a string' })
  color: string;

  @ApiProperty({
    description: 'Release date of the car model',
    example: '2023-01-15',
  })
  @Column({ type: 'date' })
  @IsDateString()
  releaseDate: string;

  @ApiProperty({
    description: 'Power of the car in horsepower',
    example: 670,
  })
  @Column({ type: 'int' })
  @IsNumber({}, { message: 'Power must be a number' })
  @IsPositive({ message: 'Power must be positive' })
  power: number;

  @ApiProperty({
    description: 'Date when the car record was created',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the car record was last updated',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
