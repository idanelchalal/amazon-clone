import express from 'express'
import cors from 'cors'

import apiRoutes from './routes/apiRoutes'

import { Config as config } from './config'

import mongo from './libs/mongo'

const app = express()

app.use(cors({ origin: config.ClientURI, methods: ['POST', 'GET'] }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(apiRoutes)

mongo(() => {
    console.log('Connected to database.')
    app.listen(config.Port, () => {
        console.log('Server is listening on Port', config.Port)
    })
})
