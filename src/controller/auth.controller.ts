import * as express from 'express'
import {User} from "../interface/user.type";
import {userDataSource} from "../service/database.service";
import {UserService} from "../service/user.service";
import {ValidationService} from "../service/validation.service";
import {VariableService} from "../service/variable.service";

export default class AuthController {
    public path = VariableService.authPath
    public router = express.Router()

    constructor() {
        this.initDatabaseConnection()
        this.initRoutes()
    }

    public initRoutes(){
        this.router.post(`${this.path}${VariableService.endpointLogin}`, this.login)
        this.router.post(`${this.path}${VariableService.endpointRegister}`, this.register)
    }

    public initDatabaseConnection(){
        userDataSource
            .initialize()
            .then(() => {
                console.log(VariableService.dataSourceUpMessage)
            })
            .catch((err) => {
                console.error(VariableService.dataSourceDownMessage, err)
            })
    }

    private async login(request: express.Request, response: express.Response) {
        try {
            const user: User = request.body

            if(!ValidationService.validateEmail(user.email)) {
                console.log(`${VariableService.logSomeoneFromIP} ${request.ip} ${VariableService.triedTo} ${VariableService.login} ${VariableService.withInvalidEmail} ${user.email}`)
                return response.status(400).send(VariableService.invalidEmail)
            }

            if ((await UserService.findUser(user))) {
                console.log(`${VariableService.user} ${user.email} ${VariableService.loggedIn}`)
                return response.status(200).send(VariableService.successfulLogin)
            }

            console.log(`${VariableService.logSomeoneFromIP} ${request.ip} ${VariableService.triedTo} ${VariableService.login} ${VariableService.usingThisEmail} ${user.email}`)
            return response.status(500).send(VariableService.somethingWentWrong)
        } catch(e) {
            console.log(`${VariableService.justError} ${e}`)
            return response.status(400).send(VariableService.badRequest)
        }
    }

    private async register(request: express.Request, response: express.Response) {
        try {
            const user: User = request.body

            if(!ValidationService.validateEmail(user.email)) {
                console.log(`${VariableService.logSomeoneFromIP} ${request.ip} ${VariableService.triedTo} ${VariableService.register} ${VariableService.withInvalidEmail} ${user.email}`)
                return response.status(400).send(VariableService.invalidEmail)
            }

            if (!(await UserService.findUser(user)) && (await UserService.saveUser(user))) {
                // TODO add token generation here -> no redirection, just authService & generate token here & in login endpoint
                console.log(`${VariableService.user} ${user.email} ${VariableService.accountCreated}`)
                return response.status(200).send(VariableService.registered)
            }

            console.log(`${VariableService.logSomeoneFromIP} ${request.ip} ${VariableService.triedTo} ${VariableService.register} ${VariableService.usingThisEmail} ${user.email}`)
            return response.status(500).send(`${VariableService.somethingWentWrong} ${VariableService.emailIsAlreadyTaken}`)
        } catch(e) {
            console.log(`${VariableService.justError} ${e}`)
            return response.status(400).send(VariableService.badRequest)
        }
    }


}

