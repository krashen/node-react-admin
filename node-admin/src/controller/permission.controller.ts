import { Permission } from '../entity/permission.entity';
import { AppDataSource } from '../index'
import { Request, Response } from 'express';

export const Permissions = async (req: Request, res: Response) => {
    const repository = AppDataSource.getRepository(Permission)

    const permissions = await repository.find()

    res.send(permissions)
}