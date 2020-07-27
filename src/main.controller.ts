import 'reflect-metadata';
import { Application } from 'express';
import { UsersService } from './services/user.service';
import { checkJwt } from "./middlewares/checkJwt";
import {controller, httpGet, httpPost, interfaces} from 'inversify-express-utils';
import { ApiOperationGet, ApiOperationPost, ApiPath, SwaggerDefinitionConstant } from "swagger-express-typescript";

@ApiPath({
  name: 'Users',
  path: '/users/',
})
@controller('/users')
export class Controller {
  private usersService: UsersService;

  constructor(private app: Application) {
    this.usersService = new UsersService();
    this.routes();
  }

  public routes() {
    this.app.route('/').get(this.usersService.initMessage);


    this.app.route("/users").get([checkJwt], this.usersService.getAllUsers);

    this.app.route("/users").post([checkJwt], this.usersService.addNewUsers);

    this.app.route("/users/:id").delete([checkJwt], this.usersService.deleteUsers);

    this.app.route("/users/:id").put([checkJwt], this.usersService.updateUsers);

  }
}