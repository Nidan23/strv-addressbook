import {User} from "./user.type";

export interface AuthorizeUserType extends User{
    token: string
}