import {User} from "../interface/user.type";
import {UserDataSource} from "./database.service";
import {UserEntity} from "../entity/user.entity";

export class UserService{

    private static userRepository = UserService.getUserRepository()

    public static findUser(user: User): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            this.userRepository.findOne({where: user})
                .then(response => {
                    if (response?.email == null)
                        return resolve(false)
                    return resolve(true)
                })
                .catch(err => {
                    console.log(err)
                    return resolve(false)
                })
        })
    }

    public static saveUser(user: User): Promise<boolean>{
        return new Promise<boolean>(resolve => {
            this.userRepository.save(user)
                .then(r => {
                    return resolve(true)
                })
                .catch(err => {
                    return resolve(false)
                })
        })
    }

    public static getUserRepository(){
        return UserDataSource.userDataSource.getRepository(UserEntity)
    }
}