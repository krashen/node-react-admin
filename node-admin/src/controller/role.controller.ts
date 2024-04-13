import { Role } from '../entity/role.entity';
import { AppDataSource } from '../index'
import { Request, Response, response } from 'express';

export const Roles = async (req: Request, res: Response) => {
    const repository = AppDataSource.getRepository(Role)

    const roles = await repository.find()

    res.send(roles)
}

export const CreateRole = async (req: Request, res: Response) => {
    const  {name, permissions}: {name: string, permissions: number[]} = req.body

    const repository = AppDataSource.getRepository(Role)

    const role = await repository.save({
        name,
        permissions: permissions.map(id => ({id}))
    })

    res.send({
        message: "Role created",
        ...role
    })

}

export const GetRole = async (req: Request, res: Response) => {
    const repository =  AppDataSource.getRepository(Role)

    const role = await repository.find(
        {
            where: {
                id: parseInt(req.params.id)
            },
            relations: {
                permissions: true
            }
        }
    )


    if (role.length === 0) {
        res.status(404).send({
            message: "No role found"
        })
    } else {
        res.status(200).send(role[0])
    }
}

export const UpdateRole = async (req: Request, res: Response) => {
    const {name, permissions} = req.body;
    const repository =  AppDataSource.getRepository(Role)
  
    const role = await repository.save({
        id: parseInt(req.params.id),
        name,
        permissions: permissions.map(id => ({id}))
    })

    res.send({
        message: "Role updated",
        ...role
    })
}

export const DeleteRole = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const repository =  AppDataSource.getRepository(Role)
    const role = await repository.findOneBy({id})

    if (!role) {
        res.status(404).send({
            message: "No role found"
        })
    } else {
        const response = await repository.delete(id)
        
        res.status(204).send({
            message: "Role deleted"
        })
    }
}