import { Application } from 'express';
import { UsersService } from './services/user.service';
export class Controller {
  private usersService: UsersService;

  constructor(private app: Application) {
    this.usersService = new UsersService();
    this.routes();
  }

  public routes() {
    this.app.route('/').get(this.usersService.initMessage);

    this.app.route("/users").get(this.usersService.getAllUsers);

    this.app.route("/users").post(this.usersService.addNewUsers);

    this.app.route("/users/:id").delete(this.usersService.deleteUsers);

    this.app.route("/users/:id").put(this.usersService.updateUsers);

  }
}