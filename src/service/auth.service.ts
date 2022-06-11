import {User} from "../interface/user.type";
import * as jwt from "jsonwebtoken"
import {VariableService} from "./variable.service";
import {UserService} from "./user.service";
import {AuthorizeUserType} from "../interface/authorizeUser.type";

export class AuthService{

    public static getJwtToken(user: User){
        return this.generateJwtToken(user)
    }

    public static resolveDataFromJwtToken(token: string){
        return jwt.verify(token, VariableService.secretKey)
    }

    public static async validateJwtToken(token: string): Promise<boolean>{
        try {
            const {email, password} = this.resolveDataFromJwtToken(token) as AuthorizeUserType
            const user: User = {email, password} as User

            return (await UserService.findUser(user));
        } catch (e){
            console.log(VariableService.verifyTokenError)

            return false
        }

    }

    private static generateJwtToken(user: User){
        const {email, password} = user
        return jwt.sign({email, password}, VariableService.secretKey, {
            expiresIn: VariableService.tokenExpirationTime
        })
    }
}