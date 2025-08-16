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
exports.Car = void 0;
const typeorm_1 = require("typeorm");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
let Car = class Car {
};
exports.Car = Car;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier for the car',
        example: 1,
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Car.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the car model',
        example: 'Tesla Model S',
        minLength: 2,
    }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    (0, class_validator_1.IsString)({ message: 'Name must be a string' }),
    __metadata("design:type", String)
], Car.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Price of the car in USD',
        example: 75000,
    }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    (0, class_validator_1.IsNumber)({}, { message: 'Price must be a number' }),
    (0, class_validator_1.IsPositive)({ message: 'Price must be positive' }),
    __metadata("design:type", Number)
], Car.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Brand of the car',
        example: 'Tesla',
    }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    (0, class_validator_1.IsString)({ message: 'Brand must be a string' }),
    __metadata("design:type", String)
], Car.prototype, "brand", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Color of the car',
        example: 'Red',
    }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    (0, class_validator_1.IsString)({ message: 'Color must be a string' }),
    __metadata("design:type", String)
], Car.prototype, "color", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Release date of the car model',
        example: '2023-01-15',
    }),
    (0, typeorm_1.Column)({ type: 'date' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], Car.prototype, "releaseDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Power of the car in horsepower',
        example: 670,
    }),
    (0, typeorm_1.Column)({ type: 'int' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Power must be a number' }),
    (0, class_validator_1.IsPositive)({ message: 'Power must be positive' }),
    __metadata("design:type", Number)
], Car.prototype, "power", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when the car record was created',
    }),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Car.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Date when the car record was last updated',
    }),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Car.prototype, "updatedAt", void 0);
exports.Car = Car = __decorate([
    (0, typeorm_1.Entity)('cars')
], Car);
//# sourceMappingURL=car.entity.js.map