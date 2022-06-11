import * as express from 'express'
import {AuthService} from "../service/auth.service";

export default class ContactsController {
    public path = '/contacts'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes(){
        this.router.post(`${this.path}/addContacts`, this.addContacts)
        this.router.get(`${this.path}/getContacts`, this.getContacts)
    }

    private async addContacts(request: express.Request, response: express.Response){
        if((await AuthService.validateJwtToken(request.body.token)))
            return response.send("Token validated")
        return response.send('Not valid')
    }

    private getContacts(request: express.Request, response: express.Response){
        response.send('Your contacts bro')
    }
}