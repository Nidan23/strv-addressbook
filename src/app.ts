import * as express from 'express'
import * as bodyParser from 'body-parser'
import {VariableService} from "./service/variable.service";

export default class App {
    public app: express.Application
    public port: number

    constructor(controllers: any[], port: any) {
        this.app = express()
        this.port = parseInt(port || VariableService.appPort)

        this.initMiddlewares()
        this.initControllers(controllers)
    }

    private initMiddlewares(){
        this.app.use(bodyParser.json())
    }

    private initControllers(controllers: any[]){
        controllers.forEach((controller: any) => {
            this.app.use('/', controller.router)
        })
    }

    public listen(){
        this.app.listen(this.port, () => {
            console.log(`${VariableService.appStart} ${this.port}`)
        })
    }
}