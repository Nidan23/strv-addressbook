import {User} from "./user.type";

export interface UserValidation {
    isValid: boolean,
    data?: User
}