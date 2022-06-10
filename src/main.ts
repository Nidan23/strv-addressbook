import App from './app'
import AuthController from "./controller/auth.controller";
import ContactsController from "./controller/contacts.controller";
import * as dotenv from 'dotenv'
import {userDataSource} from "./service/database.service";

dotenv.config({path:`${__dirname}/assets/.env`})

userDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")

        const app = new App(
            [
                new AuthController(userDataSource),
                new ContactsController()
            ],
            process.env.SERVER_PORT
        )

        app.listen()
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })