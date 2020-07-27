import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { Controller } from './main.controller';
import { MONGO_URL } from './constants/value.constants';

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
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGO_URL , {
      useNewUrlParser: true
    });
  }
  
}

export default new App().app;