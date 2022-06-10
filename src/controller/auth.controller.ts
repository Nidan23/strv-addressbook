import * as express from 'express'
import {User} from "../interface/user.type";
import {userDataSource} from "../service/database.service";
import {UserService} from "../service/user.service";

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

            if ((await UserService.findUser(user)))
                return response.status(200).send("Logged Successfully")

            return response.status(500).send("Something went wrong.")
        } catch {
            return response.status(400).send("Bad request")
        }
    }

    private async register(request: express.Request, response: express.Response) {
        try {
            const user: User = request.body

            if (!(await UserService.findUser(user)) && (await UserService.saveUser(user)))
                response.redirect('/auth/login')

            return response.status(500).send("Something went wrong. Probably email is already taken")
        } catch {
            return response.status(400).send("Bad request")
        }
    }


}

