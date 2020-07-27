import { Request, Response } from "express";
import { Users } from "../models/user.model";
import { MongooseDocument } from 'mongoose';

export class UsersService {
  public initMessage(req: Request, res: Response) {
    return res.status(200).send("Welcome to Users API REST");
  }

  //Getting data from the db
  public getAllUsers(req: Request, res: Response) {
    Users.find({}, (error: Error, users: MongooseDocument) => {
      if (error) {
        res.send(error);
      }
      res.json(users);
    });
  }

  public addNewUsers(req: Request, res: Response) {
    console.log('Add');
    const newUsers = new Users(req.body);
    newUsers.save((error: Error, users: MongooseDocument) => {
      if (error) {
        res.send(error);
      }
      res.json(users);
    });
  }

  public deleteUsers(req: Request, res: Response) {
    const usersID = req.params.id;
    Users.findByIdAndDelete(usersID, (error: Error, deleted: any) => {
      if (error) {
        res.send(error);
      }
      const message = deleted ? 'Deleted successfully' : 'User - not found :(';
      res.send(message);
    });
  }

  public updateUsers(req: Request, res: Response) {
    const usersId = req.params.id;
    Users.findByIdAndUpdate(
      usersId,
      req.body,
      (error: Error, users: any) => {
        if (error) {
          res.send(error);
        }
        const message = users
          ? 'Updated successfully'
          : 'Users not found :(';
        res.send(message);
      }
    );
  }

}