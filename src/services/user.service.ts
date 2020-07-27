import { Request, Response } from "express";
import { Users } from "../models/user.model";
import { MongooseDocument } from 'mongoose';
import {controller, httpGet, httpPost, httpDelete, httpPut, interfaces, requestParam} from 'inversify-express-utils';
import { ApiOperationGet, ApiOperationPost, ApiOperationDelete, ApiOperationPut, ApiPath, SwaggerDefinitionConstant } from "swagger-express-ts";

@ApiPath({
  path: "/users",
  name: "Users",
  security: { basicAuth: [] }
})
export class UsersService {
  public static TARGET_NAME: string = "VersionController";
  public initMessage(req: Request, res: Response) {
    return res.status(200).send("Welcome to Users API REST");
  }

  @ApiOperationGet({
    description: 'Get users list object',
    summary : "Get user list",
    responses: {
        200: {
            model: 'User',
            type: SwaggerDefinitionConstant.Response.Type.ARRAY,
        },
    },
    security: {
        apiKeyHeader: [],
    }
  })
  @httpGet( "/" )
  public getAllUsers(req: Request, res: Response) {
    Users.find({}, (error: Error, users: MongooseDocument) => {
      if (error) {
        res.send(error);
      }
      res.json(users);
    });
  }

  @ApiOperationPost({
    description: 'Post user object',
    parameters: {
        body: {
            description: 'Pot new user',
            model: 'User',
            required: true,
        },
    },
    responses : {
      200 : { description : "Success" },
      400 : { description : "Parameters fail" }
    },
    summary: 'Post new user',
  })
  @httpPost( "/" )
  public addNewUsers(req: Request, res: Response) {
    const newUsers = new Users(req.body);
    newUsers.save((error: Error, users: MongooseDocument) => {
      if (error) {
        res.send(error);
      }
      res.json(users);
    });
  }

  @ApiOperationDelete( {
    path : "/{id}",
    parameters : {
        path : {
            id : {
                description : "Id of version",
                type : SwaggerDefinitionConstant.Parameter.Type.STRING,
                required : true
            }
        }
    },
    responses : {
        200 : { description: "Success" }
    }
  } )
  @httpDelete( "/:id" )
  public deleteUsers(@requestParam( "id" ) id: string, req: Request, res: Response) {
    const usersID = req.params.id;
    Users.findByIdAndDelete(usersID, (error: Error, deleted: any) => {
      if (error) {
        res.send(error);
      }
      const message = deleted ? 'Deleted successfully' : 'User - not found :(';
      res.send(message);
    });
  }

  @ApiOperationPut( {
    path : "/{id}",
    parameters : {
        path : {
            id : {
                description : "Id of version",
                type : SwaggerDefinitionConstant.Parameter.Type.STRING,
                required : true
            }
        },
        body : {
            description : "Updated user",
            model : "User",
            required : true
        }
    },
    responses : {
        200 : { model : "User" }
    }
  } )
  @httpPut( "/:id" )
  public updateUsers(@requestParam( "id" ) id: string, req: Request, res: Response) {
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