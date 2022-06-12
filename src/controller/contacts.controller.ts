import * as express from 'express'
import {AuthService} from "../service/auth.service";
import {UserValidation} from "../interface/validation.type";
import {Contact} from "../interface/contact.type";
import {FirebaseService} from "../service/firebase.service";
import {VariableService} from "../service/variable.service";

export default class ContactsController {
    public path = VariableService.contactsPath
    public router = express.Router()

    constructor() {
        this.initRoutes()
        this.initFirebase()
    }

    public initRoutes(){
        this.router.post(`${this.path}${VariableService.addContacts}`, this.addContacts)
    }
    public initFirebase(){
        FirebaseService.firebaseInit()
    }

    private async addContacts(request: express.Request, response: express.Response){
        const contacts: Contact[] = request.body.data
        const validationData: UserValidation = await AuthService.validateJwtToken(request.body.token)

        if(!validationData.isValid) {
            return response.json(VariableService.getResponseJson(VariableService.invalidToken))
        }

        if(await FirebaseService.addContact(validationData.data, contacts))
            return response.json(VariableService.getResponseJson(VariableService.contactsAddedToYourAccount, AuthService.getJwtToken(validationData.data)))

        return response.json(VariableService.getResponseJson(VariableService.somethingWentWrong))
    }
}