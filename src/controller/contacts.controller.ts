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
            console.log(VariableService.verifyTokenError)
            return response.json(VariableService.getResponseJson(VariableService.invalidToken))
        }

        if(await FirebaseService.addContact(validationData.data, contacts)) {
            console.log(`${VariableService.contactsAddedToUserAccount} ${validationData.data.email}`)
            return response.json(VariableService.getResponseJson(VariableService.contactsAddedToYourAccount, AuthService.getJwtToken(validationData.data), false))
        }
        return response.json(VariableService.getResponseJson(VariableService.somethingWentWrong))
    }
}