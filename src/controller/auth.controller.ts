import * as express from 'express'
import {User} from "../interface/user.type";
import {userDataSource} from "../service/database.service";
import {UserService} from "../service/user.service";
import {ValidationService} from "../service/validation.service";

export default class AuthController {
    public path = '/auth'
    public router = express.Router()

    constructor() {
        this.initDatabaseConnection()
        this.initRoutes()
    }

    public initRoutes(){
        this.router.post(`${this.path}/login`, this.login)
        this.router.post(`${this.path}/register`, this.register)
    }

    public initDatabaseConnection(){
        userDataSource
            .initialize()
            .then(() => {
                console.log("Data Source has been initialized!")
            })
            .catch((err) => {
                console.error("Error during Data Source initialization:", err)
            })
    }

    private async login(request: express.Request, response: express.Response) {
        try {
            const user: User = request.body

            if(!ValidationService.validateEmail(user.email)) {
                console.log(`Someone from IP ${request.ip} tried to login with invalid email: ${user.email}`)
                return response.status(400).send("Your email is not valid")
            }

            if ((await UserService.findUser(user))) {
                console.log(`User ${user.email} just logged in`)
                return response.status(200).send("Logged Successfully")
            }

            console.log(`Someone from ${request.ip} tried 2 login using this email: ${user.email}`)
            return response.status(500).send("Something went wrong.")
        } catch(e) {
            console.log(`Error ${e}`)
            return response.status(400).send("Bad request")
        }
    }

    private async register(request: express.Request, response: express.Response) {
        try {
            const user: User = request.body

            if(!ValidationService.validateEmail(user.email)) {
                console.log(`Someone from IP ${request.ip} tried to register with invalid email: ${user.email}`)
                return response.status(400).send("Your email is not valid")
            }

            if (!(await UserService.findUser(user)) && (await UserService.saveUser(user))) {
                console.log(`User ${user.email} just created account`)
                return response.status(200).send("Account created successfully, you're already logged in")
            }

            console.log(`Someone from ${request.ip} tried 2 register using this email: ${user.email}`)
            return response.status(500).send("Something went wrong. Probably email is already taken")
        } catch(e) {
            console.log(`Error ${e}`)
            return response.status(400).send("Bad request")
        }
    }


}

