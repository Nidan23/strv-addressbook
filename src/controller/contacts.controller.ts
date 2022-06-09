import * as express from 'express'

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

    private addContacts(request: express.Request, response: express.Response){
        response.send('Added contacts')
    }

    private getContacts(request: express.Request, response: express.Response){
        response.send('Your contacts bro')
    }
}