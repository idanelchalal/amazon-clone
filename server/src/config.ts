import dotenv from 'dotenv'

dotenv.configDotenv()

export const Config = {
    Port: process.env.NODE_ENV === 'development' ? 3000 : process.env.NODE_PORT,
    ClientURI:
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:5173'
            : process.env.CLIENT_URI,
    ConnectionString: process.env.DB_STRING,
}
