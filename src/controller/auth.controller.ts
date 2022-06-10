import * as express from 'express'
import {DataSource, Repository} from "typeorm";
import {UserEntity} from "../entity/user.entity";
import {User} from "../interface/user.type";
import {userDataSource} from "../service/database.service";

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

    private login(request: express.Request, response: express.Response){
        const user: User = request.body

        userDataSource.getRepository(UserEntity).findOne({ where: user})
            .then(r => {
                response.send("Logged Successfully")
            })
            .catch(err => {
                console.log(err)

                response.status(500).send("Something went wrong. Your login data isn't correct")
            })
    }

    private register(request: express.Request, response: express.Response){
        const user: User = request.body

        userDataSource.getRepository(UserEntity).save(user)
            .then(r => {
                response.redirect('/auth/login')
            })
            .catch(err => {
                console.log(err)

                response.status(500).send("Something went wrong. Probably email is already taken")
            })
    }
}
