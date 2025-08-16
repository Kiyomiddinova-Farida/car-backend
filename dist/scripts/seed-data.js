"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const car_service_1 = require("../api/car/car.service");
const sampleCars = [
    {
        name: 'Tesla Model S',
        price: 75000,
        brand: 'Tesla',
        color: 'Red',
        releaseDate: '2023-01-15',
        power: 670,
    },
    {
        name: 'BMW M3',
        price: 72000,
        brand: 'BMW',
        color: 'Blue',
        releaseDate: '2023-03-20',
        power: 473,
    },
    {
        name: 'Mercedes-Benz C-Class',
        price: 45000,
        brand: 'Mercedes-Benz',
        color: 'White',
        releaseDate: '2023-02-10',
        power: 255,
    },
    {
        name: 'Audi A4',
        price: 42000,
        brand: 'Audi',
        color: 'Black',
        releaseDate: '2023-04-05',
        power: 201,
    },
    {
        name: 'Porsche 911',
        price: 106100,
        brand: 'Porsche',
        color: 'Yellow',
        releaseDate: '2023-01-01',
        power: 379,
    },
    {
        name: 'Ford Mustang',
        price: 35000,
        brand: 'Ford',
        color: 'Orange',
        releaseDate: '2023-05-15',
        power: 450,
    },
    {
        name: 'Chevrolet Corvette',
        price: 65000,
        brand: 'Chevrolet',
        color: 'Silver',
        releaseDate: '2023-06-01',
        power: 495,
    },
    {
        name: 'Honda Civic',
        price: 25000,
        brand: 'Honda',
        color: 'Green',
        releaseDate: '2023-07-10',
        power: 158,
    },
    {
        name: 'Toyota Camry',
        price: 26000,
        brand: 'Toyota',
        color: 'Gray',
        releaseDate: '2023-08-20',
        power: 203,
    },
    {
        name: 'Volkswagen Golf',
        price: 28000,
        brand: 'Volkswagen',
        color: 'Purple',
        releaseDate: '2023-09-05',
        power: 147,
    },
];
async function seedData() {
    try {
        console.log('🌱 Starting data seeding...');
        const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
        const carService = app.get(car_service_1.CarService);
        console.log(`📝 Seeding ${sampleCars.length} cars...`);
        for (const carData of sampleCars) {
            try {
                await carService.create(carData);
                console.log(`✅ Created: ${carData.brand} ${carData.name}`);
            }
            catch (error) {
                console.error(`❌ Failed to create ${carData.brand} ${carData.name}:`, error.message);
            }
        }
        console.log('🎉 Data seeding completed!');
        const stats = await carService.getStatistics();
        console.log('📊 Database Statistics:');
        console.log(`   Total Cars: ${stats.totalCars}`);
        console.log(`   Average Price: $${stats.averagePrice.toFixed(2)}`);
        console.log(`   Total Power: ${stats.totalPower} hp`);
        console.log(`   Brands Count: ${stats.brandsCount}`);
        await app.close();
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
}
seedData();
//# sourceMappingURL=seed-data.js.map