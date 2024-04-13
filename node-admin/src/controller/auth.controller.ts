import {Request, Response} from 'express'
import { RegisterValidation } from '../validation/register.validation'
import { AppDataSource } from '../index'
import { User } from '../entity/user.entity'
import bc from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken'

export const Register = async (req: Request, res: Response) => {
    const body = req.body

    const {error} = RegisterValidation.validate(body)

    if(error){
        return res.status(400).send(error.details)
    }

    if(body.password !== body.password_confirm){
        return res.status(400).send({
           message: "Passwords do not match" 
        })
    }

    const repository = AppDataSource.getRepository(User)

    const {password, ...user} = await repository.save({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        password: await bc.hash(body.password, 10),
    })

    res.send(user) 
}

export const Login = async (req: Request, res: Response) => {

    const body = req.body

    const repository = AppDataSource.getRepository(User)

    const user = await repository.findOneBy({
       email: body.email
    })
    if (!user) {
        return res.status(404).send({
            message: 'Invalid credentials'
        })
    }

    if (!await bc.compare(body.password, user.password)) {
        return res.status(400).send({
            message: 'Invalid credentials'
        })
    }

    const payload = {
        id: user.id
    }

    const token = sign(payload, process.env.SECRET_KEY)

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    })

    const  {password, ...data} = user

    res.send({
        message: 'Successfully logged in'
    })
    
}

export const AuthenticatedUser = async (req: Request, res: Response) => {
    
    const {password, ...user} = req['user']
    res.send(user)
    
}

export const Logout = async (req: Request, res: Response) => {
    res.cookie('jwt', '', {
        maxAge: 0
    })
    res.send({
        message: 'Successfully logged out'
    })
}

export const UpdateInfo = async (req: Request, res: Response) => {

    const user = req['user']

    const repository = AppDataSource.getRepository(User)

    await repository.update(user.id, req.body)

    const {password, ...data} = await repository.findOneBy({
        id: user.id
    })

    res.send(data)
}

export const UpdatePassword = async (req: Request, res: Response) => {

    const body = req.body

    const user = req['user']

    if(body.password !== body.password_confirm){
        return res.status(400).send({
           message: "Passwords do not match" 
        })
    }

    const repository = AppDataSource.getRepository(User)

    await repository.update(user.id, {
        password: await bc.hash(body.password, 10)
    })
    
    const {password, ...data} = user

    res.send({
        ...data,
        message: "Password Updated!"
    })
    
}