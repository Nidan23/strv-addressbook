import { DataSource } from "typeorm"
import {VariableService} from "./variable.service";

export class UserDataSource {
    static userDataSource: DataSource = new DataSource({
        type: "postgres",
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || VariableService.databasePort),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: ["src/entity/*.ts"],
        logging: true,
        synchronize: true,
    })

    public static initDatabaseConnection(){
        this.userDataSource
            .initialize()
            .then(() => {
                console.log(VariableService.dataSourceUpMessage)
            })
            .catch((err) => {
                console.error(VariableService.dataSourceDownMessage, err)
            })
    }
}