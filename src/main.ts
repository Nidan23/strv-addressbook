import App from './app'
import AuthController from "./controller/auth.controller";
import * as dotenv from 'dotenv'

dotenv.config({path:`${__dirname}/assets/.env`})

const app = new App(
    [
    new AuthController()
    ],
    process.env.SERVER_PORT
)

app.listen()