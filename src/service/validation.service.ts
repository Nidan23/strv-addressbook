export class ValidationService{

    private static emailRegExp: RegExp = new RegExp('[a-z\d]+@[a-z]+\.[a-z]{2,3}');

    public static validateEmail(email: string){
        return this.emailRegExp.test(email)
    }
}