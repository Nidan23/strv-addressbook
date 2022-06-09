// @ts-ignore
import express from 'express'
import * as bodyParser from 'body-parser'

export default class App {
    public app: express.Application
    public port: number

    constructor(controllers: any[], port: any) {
        this.app = express()
        this.port = parseInt(port)

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
            console.log(`App is running on port ${this.port}`)
        })
    }
}