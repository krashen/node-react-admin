import { Request, Response } from 'express';
import { AppDataSource } from '..';
import { User } from '../entity/user.entity';
import bc from 'bcryptjs'

export const Users = async (req: Request, res: Response) => {
    const itemsPerPage = 5
    const page = parseInt(req.query.page as string) || 1
    const repository = AppDataSource.getRepository(User)

    const [data, total] = await repository.findAndCount({
        take: itemsPerPage,
        skip: (page - 1) * itemsPerPage,
        relations: ['role']
    })

    const last_page = Math.ceil(total/itemsPerPage)

    if (page > last_page) {
        res.status(404).send("Page Not Found")
    } else {
        res.status(200).send({
            data: data.map (u => {
                const {password, ...data} = u
                return data
            }),
            meta: {
                total,
                page,
                last_page 
            }
        })
    } 
}

export const CreateUser = async (req: Request, res: Response) => {
    const {role_id, ...body} = req.body
    const default_hashed_password = await bc.hash(process.env.DEFAULT_PASSWORD, 10)

    const repository =  AppDataSource.getRepository(User)

    const {password, ...user } = await repository.save({
        ...body,
        password: default_hashed_password,
        role: {
            id: role_id
        }
    })

    res.status(201).send({
        message: "New user created",
        ...user
    })
    
}

export const GetUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const repository =  AppDataSource.getRepository(User)

    const user = await repository.find(
        {
            where: {
               id 
            },
            relations:{
                role: true
            }
        }
    )


    if (user.length === 0) {
        res.status(404).send({
            message: "No user found"
        })
    } else {
        const {password, ...data} = user[0]
        res.status(200).send(data)
    }
}

export const UpdateUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const {role_id, ...body} = req.body
    const repository =  AppDataSource.getRepository(User)
    const user = await repository.find(
        {
            where: {
                id
            },
            relations: {
                role: true
            }
        }
    )

    if (user.length === 0) {
        res.status(404).send({
            message: "No user found"
        })
    } else {
        await repository.update(id, {
            ...body,
            role:{
                id: role_id
            }
        })

        const {password, ...data} = user[0]
        res.status(202).send({
            message: "User updated",
            ...data})
    } 
}

export const DeleteUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const repository =  AppDataSource.getRepository(User)
    const user = await repository.findOneBy({id})

    if (!user) {
        res.status(404).send({
            message: "No user found"
        })
    } else {
        await repository.delete(id)
        
        res.status(204).send({
            message: "User deleted"
        })
    }
}