import { Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { AppDataSource } from '..'
import { User } from '../entity/user.entity'

export const AuthMiddleware = async (req: Request, res: Response, next: Function) => {
    try{
        const jwt = req.cookies['jwt']

        const payload: any = verify(jwt, process.env.SECRET_KEY)

        if (!payload) {
            res.status(401).send({
            message: 'Unauthenticated' 
            })
        }

        const repository = AppDataSource.getRepository(User)

        const user = await repository.find(
            {
                where: {
                   id: payload.id 
                },
                relations: ['role', 'role.permissions']
            }
        )

        req['user'] = user[0]

        next()

    } catch(e) {
        res.status(401).send({
            message: 'Unauthenticated' 
        })
    }
}