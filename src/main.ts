import express from 'express'
import dotenv from 'dotenv';

const app = express()

dotenv.config({path:`${__dirname}/assets/.env`})
app.use(express.json())

app.listen(process.env.SERVER_PORT, () => {
    console.log(`App is running on port ${process.env.SERVER_PORT}`)
})