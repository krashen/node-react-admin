import 'dotenv/config'
import { DataSource } from 'typeorm';
import {faker} from '@faker-js/faker'
import { randomInt } from 'crypto';
import { Order } from '../entity/order.entity'
import { OrderItem } from '../entity/order-item.entity'

const myDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Order, OrderItem],
})

myDataSource.initialize().then(async() => {
    const orderRepo = myDataSource.getRepository(Order);
    const orderItemRepo = myDataSource.getRepository(OrderItem);

    for (let i = 0 ; i < 30; i++) {
        const order = await orderRepo.save(
            {
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                created_at: faker.date.past({
                    years: 1
                }).toDateString()
            }
        )

        for (let j = 0; j < randomInt(1 ,5); j++) {
           await orderItemRepo.save({
                order,
                product_title: faker.lorem.words(2),
                price: randomInt(10, 100),
                quantity: randomInt(1,5)
           }) 
        }
    }
    

    await myDataSource.destroy()
})

console.log('Orders seeding finished')


