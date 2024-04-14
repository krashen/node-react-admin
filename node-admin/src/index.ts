import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { routes } from './routes'
import { DataSource } from 'typeorm'
import cookieParser from 'cookie-parser'

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        'src/entity/*.ts'
    ],
    logging: false,
    synchronize: true
})

AppDataSource.initialize()
.then(()=>{

    console.log('\x1b[36m%s\x1b[0m','- Data Source has been initialized')
    const app = express()

    app.use(express.json())
    app.use(cookieParser())
    app.use(cors({
        credentials: true,
        origin: true,
        methods: ['GET','POST','PUT','DELETE']
    }))

    routes(app)

    app.listen( 8000, () => {
        console.log('\x1b[33m%s\x1b[0m','- Listening to port 8000...')
    })
})
.catch((err)=>{
    console.error('\x1b[31m%s\x1b[0m','Error during Data Source initialization', err)
})

