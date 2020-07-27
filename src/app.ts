import express, { Application } from 'express';
import bodyParser from 'body-parser';
import "reflect-metadata";
import cors from 'cors';
import mongoose from 'mongoose';
import { Controller } from './main.controller';
import { MONGO_URL } from './constants/value.constants';
import * as swagger from "swagger-express-ts";
import { SwaggerDefinitionConstant } from "swagger-express-ts";

class App {
  public app: Application;
  public dbController: Controller;

  constructor() {
    this.app = express();
    this.setConfig();

    this.dbController = new Controller(this.app);
  }

  private setConfig() {
    //Allows us to receive requests with data in json format
    this.app.use(bodyParser.json({ limit: '2mb' }));

    //Allows us to receive requests with data in x-www-form-urlencoded format
    this.app.use(bodyParser.urlencoded({ limit: '2mb', extended:true}));

    //Enables cors   
    this.app.use(cors());

    this.app.use( '/api-docs/swagger' , express.static( 'swagger' ) );
    this.app.use( '/api-docs/swagger/assets' , express.static( 'node_modules/swagger-ui-dist' ) );
    this.app.use( bodyParser.json() );
    this.app.use( swagger.express(
        {
            definition : {
                info : {
                    title : "API - CRUD Users" ,
                    version : "1.0"
                } ,
                securityDefinitions : {
                  basicAuth : {
                      type : SwaggerDefinitionConstant.Security.Type.BASIC_AUTHENTICATION
                  },
                  apiKeyHeader : {
                      type: SwaggerDefinitionConstant.Security.Type.API_KEY,
                      in: SwaggerDefinitionConstant.Security.In.HEADER,
                      name: "apiHeader"
                  }
                }
                // Models can be defined here
            }
        }
    ) );
    
    this.app.use( ( err : Error , request : express.Request , response : express.Response , next : express.NextFunction ) => {
      console.error( err.stack );
      response.status( 500 ).send( "Something broke!" );
    } );

  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGO_URL , {
      useNewUrlParser: true
    });
  }
  
}

export default new App().app;