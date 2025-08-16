import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { CarRepository } from '../../core/repository/car.repository';
import { Car } from '../../core/entity/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car])],
  controllers: [CarController],
  providers: [CarService, CarRepository],
  exports: [CarService, CarRepository],
})
export class CarModule {}
