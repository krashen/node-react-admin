import { Request, Response } from 'express';
import { AppDataSource } from '..';
import multer from 'multer';
import { extname } from 'path'

export const Upload = async (req: Request, res: Response, next) => {

    const storage = multer.diskStorage({
        destination: './uploads',
        filename(_, file, cb) {
            const randomName = Math.random().toString(20).substring(2, 14)
            return cb(null, `${randomName}${extname(file.originalname)}`)
        }
    })

    const upload = multer({storage}).single('image')

    upload(req, res, (err)=> {

        if (err) {
            res.status(400).send(err)
        }
        
        res.send({
            url: `http://localhost:8000/api/uploads/${req.file.filename}`
        })
    })
}