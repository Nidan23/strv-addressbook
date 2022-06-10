import * as express from 'express'
import {DataSource, Repository} from "typeorm";
import {UserEntity} from "../entity/user.entity";
import {User} from "../interface/user.type";

export default class AuthController {
    public path = '/auth'
    public router = express.Router()
    private readonly userRepository: any

    constructor(private userDataSource: DataSource) {
        // this.userDataSource.manager.getRepository<UserEntity>(UserEntity)
        this.userRepository = this.userDataSource.manager
        this.initRoutes()
    }

    public initRoutes(){
        this.router.post(`${this.path}/login`, this.login)
        this.router.post(`${this.path}/register`, this.register)
    }

    private login(request: express.Request, response: express.Response){
        const user: User = { email: "loluwa", password: "passs"}
        this.userRepository?.save(user)
            .then(r => {
                console.log(r)
                this.userRepository.find()
                    .then(r => {
                        console.log(r)
                        response.send(r.toString())
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }

    private register(request: express.Request, response: express.Response){
        response.send("registered")
    }
}
