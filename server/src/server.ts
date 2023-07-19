import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import apiRoutes from './routes/api-routes'

import { Config as config } from './config'

import mongo from './libs/mongo'
import deserializeUser from './middleware/deserialize-user'

const app = express()

app.use(
    cors({
        origin: config.ClientURI,
        credentials: true,
        methods: ['POST', 'GET'],
    })
)

app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(deserializeUser)

app.use(apiRoutes)

mongo(() => {
    console.log('Connected to database.')
    app.listen(config.Port, () => {
        console.log('Server is listening on Port', config.Port)
    })
})
