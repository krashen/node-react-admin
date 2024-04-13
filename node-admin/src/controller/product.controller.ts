import { Request, Response } from 'express';
import { AppDataSource } from '..';
import { Product } from '../entity/product.entity';
import bc from 'bcryptjs'

export const Products = async (req: Request, res: Response) => {
    const itemsPerPage = 10
    const page = parseInt(req.query.page as string) || 1
    const repository = AppDataSource.getRepository(Product)

    const [data, total] = await repository.findAndCount({
        take: itemsPerPage,
        skip: (page - 1) * itemsPerPage
    })

    const last_page = Math.ceil(total/itemsPerPage)

    if (page > last_page) {
        res.status(404).send("Page Not Found")
    } else {
        res.status(200).send({
            data,
            meta: {
                total,
                page,
                last_page 
            }
        })
    }    
}

export const CreateProduct = async (req: Request, res: Response) => {
    const repository = AppDataSource.getRepository(Product)

    const product = repository.save(req.body)

    res.status(201).send({
        message: "New prodcut created",
        ...product
    })
    
}

export const GetProduct = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const repository =  AppDataSource.getRepository(Product)

    const product = await repository.find({where: {id}})

    if (product.length === 0) {
        res.status(404).send({
            message: "No product found"
        })
    } else {
        res.status(200).send(product[0])
    }
}

export const UpdateProduct = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const body = req.body
    const repository =  AppDataSource.getRepository(Product)
    const product = await repository.find(
        {where: {id}}
    )

    if (product.length === 0) {
        res.status(404).send({
            message: "No user found"
        })
    } else {
        await repository.update(id, body)
        res.status(202).send("Product updated")
    } 
}

export const DeleteProduct = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const repository =  AppDataSource.getRepository(Product)
    const product = await repository.findOneBy({id})

    if (!product) {
        res.status(404).send({
            message: "No product found"
        })
    } else {
        await repository.delete(id)
        
        res.status(204).send({
            message: "Product deleted"
        })
    }
}