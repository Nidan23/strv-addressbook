import * as express from 'express'
import {AuthService} from "../service/auth.service";
import {UserValidation} from "../interface/validation.type";
import {Contact} from "../interface/contact.type";
import {FirebaseService} from "../service/firebase.service";

export default class ContactsController {
    public path = '/contacts'
    public router = express.Router()
    private app: any
    private analytics: any

    constructor() {
        this.initRoutes()
        this.initFirebase()
    }

    public initRoutes(){
        this.router.post(`${this.path}/addContacts`, this.addContacts)
    }
    public initFirebase(){
        FirebaseService.firebaseInit()
    }

    private async addContacts(request: express.Request, response: express.Response){
        const contacts: Contact[] = request.body.data
        const validationData: UserValidation = await AuthService.validateJwtToken(request.body.token)

        if(!validationData.isValid)
            return response.send('Not valid')


        if(await FirebaseService.addContact(validationData.data, contacts))
            return response.send("Contact added 2 your account")

        return response.send("Something went wrong")
    }
}