import 'dotenv/config'
import { DataSource } from 'typeorm';
import { Product } from '../entity/product.entity'
import {faker} from '@faker-js/faker'
import { randomInt } from 'crypto';

const myDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Product],
})

myDataSource.initialize().then(async() => {
    const prodRepo = myDataSource.getRepository(Product);

    for (let i = 0 ; i < 30; i++) {
        await prodRepo.save(
            {
                title: faker.commerce.product(),
                description: faker.commerce.productDescription(),
                image: faker.image.avatar(),
                price: randomInt(1,1000)
            }
        )
    }
    

    await myDataSource.destroy()
})

console.log('Products seeding finished')


