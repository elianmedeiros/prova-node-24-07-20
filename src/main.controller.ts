import 'reflect-metadata';
import { Application } from 'express';
import { UsersService } from './services/user.service';
import { checkJwt } from "./middlewares/checkJwt";
import {controller, httpGet, httpPost, interfaces} from 'inversify-express-utils';
import { ApiOperationGet, ApiOperationPost, ApiPath, SwaggerDefinitionConstant } from "swagger-express-ts";

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

    // this.app.route("/login").post(this.authService.login);
    // this.app.route("/change-password").post([checkJwt], this.authService.changePassword);

    this.app.route("/users").get(this.usersService.getAllUsers);

    this.app.route("/users").post(this.usersService.addNewUsers);

    this.app.route("/users/:id").delete(this.usersService.deleteUsers);

    this.app.route("/users/:id").put(this.usersService.updateUsers);

  }
}