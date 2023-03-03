import { Request, RequestHandler, Response } from "express";
import { Error } from "mongoose";
import { CustomError } from "../../../../../db/models/custom-error.model"
import { User } from "../../../../../db/models/users.model"

import { IDeleteUserReq, IGetUserReq, IUser, IUpdateUserPasswordReq, IUpdateUserReq, GetUserRequestHandler, UpdateUserRequestHandler, ISoftDeleteUserReq, SoftDeleteUsersRequestHandler, DeleteUsersRequestHandler, IValidateUserReq, ValidateUserRequestHandler } from "../../../../../types/loginPage";

import { LoginResult } from "../../../../../db/models/loginResult.model"

const findActiveUsers = (res: Response) => {
    User.find({isActive: true}, {password: 0}, (err: Error, data: IUser[]) => {
        if (!err) {
            if (data.length === 0) {
                res.send(new CustomError('No active users', 400, 'length of user array is zero'))
            } else {
                res.send(data)
            }
        }
    })
}

const findActiveUsersNew = (username: IUser['username'], res: Response) => {
    User.find({isActive: true}, (err: Error, data: IUser[]) => {
        if (!err) {
            if (data.length === 0) {
                res.send(new CustomError('No active users', 400, 'length of user array is zero'))
            } else {
                const currUser = data.filter((e)=>e.username===username);
                console.log(currUser);  
                res.send({currentUser:currUser, data:data});
            }
        }
    })
}

export const getUsers = async (req: Request, res: Response) => {
    findActiveUsers(res)
};

export const getAllUsers: RequestHandler = async (req: Request, res: Response) => {
    User.find({}, (err: Error, data: IUser[]) => {
        if (!err) {
            if (data.length === 0) {
                res.send(new CustomError('No users', 400, 'length of user array is zero'))
            } else {
                res.send(data)
            }
        }
    })
};


export const getUserByUserName: GetUserRequestHandler = async (req: IGetUserReq, res: Response) => {
    User.find({isActive:true, username: req.params.username}, (err: Error, data: IUser[]) => {
        if (!err) {
            if (data.length === 0) {
                res.send(new CustomError('User Not Found', 404, 'No users with given username found'))
            } else {
                res.send(data)
            }
        }
    })
};

export const validateUser: ValidateUserRequestHandler = (req: IValidateUserReq, res: Response) => {
    const currentUser = {
        ...req.body
    }

    User.find({username: currentUser.username}, (err: Error, data: IUser[]) => {    
        if (!err) {
            if (data.length === 0) {
                res.send({currentUser : {},loginResponse: new LoginResult(false, false, false)})
            } else {
                if (currentUser.password === data[0].password) {
                    if (data[0].isActive) {
                        console.log(data[0]);
                        res.send({currentUser : data[0], loginResponse : new LoginResult(true, true, false)})
                    } else {
                        res.send({currentUser : {}, loginResponse :  new LoginResult(true, true, true)})
                    }
                } else {
                    res.send({currentUser:{},loginResponse:  new LoginResult(true, false, false)})
                }
            }
        } else {
            res.send(new CustomError('Error during user validation', 408, err))
        }
    })
}

export const updateUserByUserName: UpdateUserRequestHandler = (req: IUpdateUserReq, res: Response) => {
    User.updateOne({username: req.body.username}, req.body, (err: Error, data: any) => {
        if (!err) {
            if (data["modifiedCount"] < 1) {
                res.send(new CustomError('Data Absent', 403, 'The username does not exist in the database'))
            } else {
                //res.send(data)
                findActiveUsersNew(req.body.username, res)
            }
        } else {
            res.send(new CustomError('User Not Updated', 402, err))
        }
    })
}

//multiple users
export const softDeleteUsersByUserNames: SoftDeleteUsersRequestHandler = (req: ISoftDeleteUserReq, res: Response) => {
    const username_list = req.body.username;
    User.updateMany({username: {$in: username_list}},{"isActive": false}, (err: Error, data: any) => {
        if(!err) {
            // res.send(data)
            User.find({isActive:true}, (err: Error, data: IUser[])=>{
                if (data.length === 0) {
                    res.send(new CustomError('No active users', 400, 'length of user array is zero'))
                } else {
                    res.send(data)
                }
            })
        } else {
            res.send(new CustomError('User Not Deleted', 402, err))
        }
    })
}

export const deleteUserByUserName: DeleteUsersRequestHandler = (req: IDeleteUserReq, res: Response) => {
    User.deleteOne({username: req.params.username}, (err: Error, data: any) => {
        if (!err) {
            if (data["deletedCount"] < 1) {
                res.send(new CustomError('Data Absent', 405, 'The username does not exist in the database'))
            } else {
                //res.send(data);
                findActiveUsers(res)
            }
        } else {
            res.send(new CustomError('User Not Deleted', 402, err))
        }
    })
}