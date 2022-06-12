import {ServerResponse} from "../interface/serverResponse.type";

export class VariableService{

    //  Datasource
    public static dataSourceUpMessage: string = "Data Source has been initialized!"
    public static dataSourceDownMessage: string = "Error during Data Source initialization:"
    public static databasePort: string = "5432"

    // Logging & Response
    public static logSomeoneFromIP: string = "Someone from IP"
    public static triedTo: string = "tried 2"
    public static registered: string = "Account created successfully, you're already logged in"
    public static accountCreated: string = "just created account"
    public static user: string = "User"
    public static loggedIn: string = "just logged in"
    public static successfulLogin: string = "Logged Successfully"
    public static contactsAddedToYourAccount = "Contacts were successfully added to your account"
    public static appStart: string = "App is running on port"

    // Actions
    public static login: string = "login"
    public static register: string = "register"

    // Errors
    public static justError: string = "Error"
    public static somethingWentWrong: string = "Something went wrong."
    public static badRequest: string = "Bad request"
    public static invalidEmail: string = "Your email is not valid"
    public static withInvalidEmail: string = "with invalid email:"
    public static usingThisEmail: string = "using this email:"
    public static emailIsAlreadyTaken: string = "Probably email is already taken"
    public static verifyTokenError: string = "Someone try to use API with invalid token"

    // Endpoints
    public static authPath: string = "/auth"
    public static contactsPath: string = "/contacts"
    public static endpointLogin: string = "/login"
    public static endpointRegister: string = "/register"
    public static addContacts: string = "/addContacts"
    public static appPort: string = "3000"

    // Token
    public static secretKey: string = "I Love Typescript!"
    public static tokenExpirationTime: string = "1h"
    public static invalidToken: string = "Your token is invalid"

    // Firebase
    public static userCollectionPath: string = "/users"
    public static contactsCollectionPath: string = "/contacts"
    public static certPath: string = "./src/assets/keys/firebase_key.json"

    public static getResponseJson(message: string, token?: string, error?: boolean): ServerResponse{
        return {error: error != null ? error : true, message: message, token: token ? token : ''}
    }
}