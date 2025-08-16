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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const car_service_1 = require("./car.service");
const create_car_dto_1 = require("../../common/dto/create-car.dto");
const update_car_dto_1 = require("../../common/dto/update-car.dto");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const car_entity_1 = require("../../core/entity/car.entity");
let CarController = class CarController {
    constructor(carService) {
        this.carService = carService;
    }
    create(createCarDto) {
        return this.carService.create(createCarDto);
    }
    findAll(paginationDto, brand, color, minPrice, maxPrice, minPower, maxPower, search) {
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
    search(searchTerm) {
        return this.carService.searchCars(searchTerm);
    }
    getBrands() {
        return this.carService.getBrands();
    }
    getColors() {
        return this.carService.getColors();
    }
    getStatistics() {
        return this.carService.getStatistics();
    }
    findByBrand(brand) {
        return this.carService.findByBrand(brand);
    }
    findByPriceRange(minPrice, maxPrice) {
        return this.carService.findByPriceRange(minPrice, maxPrice);
    }
    findByPowerRange(minPower, maxPower) {
        return this.carService.findByPowerRange(minPower, maxPower);
    }
    findOne(id) {
        return this.carService.findOne(id);
    }
    update(id, updateCarDto) {
        return this.carService.update(id, updateCarDto);
    }
    remove(id) {
        return this.carService.remove(id);
    }
};
exports.CarController = CarController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new car' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Car has been successfully created',
        type: car_entity_1.Car,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiBody)({ type: create_car_dto_1.CreateCarDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_car_dto_1.CreateCarDto]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all cars with pagination and filters' }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'brand', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'color', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'minPrice', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'maxPrice', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'minPower', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'maxPower', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)('brand')),
    __param(2, (0, common_1.Query)('color')),
    __param(3, (0, common_1.Query)('minPrice')),
    __param(4, (0, common_1.Query)('maxPrice')),
    __param(5, (0, common_1.Query)('minPower')),
    __param(6, (0, common_1.Query)('maxPower')),
    __param(7, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, String, String, Number, Number, Number, Number, String]),
    __metadata("design:returntype", void 0)
], CarController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Search cars by name or brand' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Search results retrieved successfully',
        type: [car_entity_1.Car],
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'No cars found' }),
    (0, swagger_1.ApiQuery)({ name: 'q', required: true, description: 'Search term' }),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('brands'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all available car brands' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of brands retrieved successfully',
        type: [String],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CarController.prototype, "getBrands", null);
__decorate([
    (0, common_1.Get)('colors'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all available car colors' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of colors retrieved successfully',
        type: [String],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CarController.prototype, "getColors", null);
__decorate([
    (0, common_1.Get)('statistics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get car statistics' }),
    (0, swagger_1.ApiResponse)({
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
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CarController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)('brand/:brand'),
    (0, swagger_1.ApiOperation)({ summary: 'Get cars by brand' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cars by brand retrieved successfully',
        type: [car_entity_1.Car],
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'No cars found for this brand' }),
    (0, swagger_1.ApiParam)({ name: 'brand', description: 'Car brand name' }),
    __param(0, (0, common_1.Param)('brand')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "findByBrand", null);
__decorate([
    (0, common_1.Get)('price-range'),
    (0, swagger_1.ApiOperation)({ summary: 'Get cars by price range' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cars in price range retrieved successfully',
        type: [car_entity_1.Car],
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'No cars found in this price range' }),
    (0, swagger_1.ApiQuery)({ name: 'minPrice', required: true, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'maxPrice', required: true, type: Number }),
    __param(0, (0, common_1.Query)('minPrice', common_1.ParseFloatPipe)),
    __param(1, (0, common_1.Query)('maxPrice', common_1.ParseFloatPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "findByPriceRange", null);
__decorate([
    (0, common_1.Get)('power-range'),
    (0, swagger_1.ApiOperation)({ summary: 'Get cars by power range' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cars in power range retrieved successfully',
        type: [car_entity_1.Car],
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'No cars found in this power range' }),
    (0, swagger_1.ApiQuery)({ name: 'minPower', required: true, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'maxPower', required: true, type: Number }),
    __param(0, (0, common_1.Query)('minPower', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('maxPower', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "findByPowerRange", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a car by ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Car retrieved successfully',
        type: car_entity_1.Car,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Car not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Car ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a car' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Car updated successfully',
        type: car_entity_1.Car,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Car not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Car ID' }),
    (0, swagger_1.ApiBody)({ type: update_car_dto_1.UpdateCarDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_car_dto_1.UpdateCarDto]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a car' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Car deleted successfully',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Car not found' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Car ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CarController.prototype, "remove", null);
exports.CarController = CarController = __decorate([
    (0, swagger_1.ApiTags)('cars'),
    (0, common_1.Controller)('cars'),
    __metadata("design:paramtypes", [car_service_1.CarService])
], CarController);
//# sourceMappingURL=car.controller.js.map