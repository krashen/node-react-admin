import { Request, Response } from 'express';
import { AppDataSource } from '..';
import { Order } from '../entity/order.entity';
import { Parser } from 'json2csv';
import { OrderItem } from '../entity/order-item.entity';

export const Orders = async (req: Request, res: Response) => {
    const itemsPerPage = 10
    const page = parseInt(req.query.page as string) || 1
    const repository = AppDataSource.getRepository(Order)

    const [data, total] = await repository.findAndCount({
        take: itemsPerPage,
        skip: (page - 1) * itemsPerPage,
        relations: ['order_items']
    })

    const last_page = Math.ceil(total/itemsPerPage)

    if (page > last_page) {
        res.status(404).send("Page Not Found")
    } else {
        res.status(200).send({
            data: data.map((order: Order) => ({
                id: order.id,
                name: order.name,
                email: order.email, 
                total: order.total,
                created_at: order.created_at,
                order_items: order.order_items
            })),
            meta: {
                total,
                page,
                last_page 
            }
        })
    }  
}

export const Export = async (req: Request, res: Response) => {
    const parser = new Parser({
        fields: ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity']
    })

    const respository = AppDataSource.getRepository(Order)

    const orders = await respository.find({
        relations: ['order_items']
    })

    const json = []

    orders.forEach((order) => {
        json.push({
            ID: order.id,
            Name: order.name,
            Email: order.email,
            'Product Title': '',
            Price: '',
            Quantity: ''
        })

        order.order_items.forEach((item: OrderItem) => {
            json.push({
                ID: '',
                Name: '',
                Email: '',
                'Product Title': item.product_title,
                Price: item.price,
                Quantity: item.quantity
            })
        })
    })

    const csv = parser.parse(json)

    res.header('Content-Type','text/csv')
    res.attachment('orders.csv')
    res.send(csv)

}

export const Chart = async (req: Request, res: Response) => {

    const result = await AppDataSource.query(
        'SELECT DATE_FORMAT(o.created_at, "%Y-%m-%d") as Date, SUM(oi.price * oi.quantity) as sum FROM `order` o JOIN order_item oi on o.id = oi.order_id GROUP BY date'
    )
    
    res.send(result)
    
}