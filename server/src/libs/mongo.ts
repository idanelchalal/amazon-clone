import mongoose from 'mongoose'
import { Config as config } from '../config'

const mongoConnection = async (callback: (mongo: any) => void) => {
    try {
        const mongo = await mongoose.connect(config.ConnectionString || '')
        return callback(mongo)
    } catch (err: any) {
        console.error(err)
        return err
    }
}
export default mongoConnection
