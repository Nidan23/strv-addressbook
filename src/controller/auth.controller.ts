import * as express from 'express'

export default class AuthController {
    public path = '/auth'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes(){
        this.router.post(`${this.path}/login`, this.login)
        this.router.post(`${this.path}/register`, this.register)
    }

    private login(request: express.Request, response: express.Response){
        response.send("test")
    }

    private register(request: express.Request, response: express.Response){
        response.send("registered")
    }
}
