import App from './app'
import AuthController from "./controller/auth.controller";
import ContactsController from "./controller/contacts.controller";
import * as dotenv from 'dotenv'

dotenv.config({path:`${__dirname}/assets/env/.env`})

const app = new App(
    [
        new AuthController(),
        new ContactsController()
    ],
    process.env.SERVER_PORT
)

app.listen()