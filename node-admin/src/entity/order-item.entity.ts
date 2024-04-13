import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderItem{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    product_title: string
    
    @Column()
    price: number

    @Column()
    quantity: number

    @ManyToOne(() => Order)
    @JoinColumn({name: 'order_id'})
    order: Order
}