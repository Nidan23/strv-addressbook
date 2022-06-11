
export class VariableService{

    //  Datasource
    public static dataSourceUpMessage: string = "Data Source has been initialized!"
    public static dataSourceDownMessage: string = "Error during Data Source initialization:"

    // Logging & Response
    public static logSomeoneFromIP: string = "Someone from IP"
    public static triedTo: string = "tried 2"
    public static registered: string = "Account created successfully, you're already logged in"
    public static accountCreated: string = "just created account"
    public static user: string = "User"
    public static loggedIn: string = "just logged in"
    public static successfulLogin: string = "Logged Successfully"

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
    public static endpointLogin: string = "/login"
    public static endpointRegister: string = "/register"

    // Token
    public static secretKey: string = "I Love Typescript!"
    public static tokenExpirationTime: string = "1h"
}