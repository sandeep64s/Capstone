import { Request, RequestHandler, Response } from "express";

export interface IUser {
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    dob: string,
    password: string,
    isActive: Boolean
}

export interface IGetUserReq extends Request<{ username: IUser['username'] }> { }
export interface IValidateUserReq extends Request<{ username: IUser['username'], password: IUser['password'], isActive: IUser['isActive'] }> { }
export interface IAddUserReq extends Request { }
export interface IUpdateUserReq extends Request<{ username: IUser['username']}, any, IUser> { }
export interface IUpdateUserPasswordReq extends Request<{ password: IUser['password']}, any, IUser> { }
export interface ISoftDeleteUserReq extends Request<{ username: IUser['username'][] }> { }
export interface IDeleteUserReq extends Request<{ username: IUser['username'] }> { }

export interface GetUserRequestHandler {
    (req: IGetUserReq, res: Response) : Promise<void>
}

export interface ValidateUserRequestHandler {
    (req: IValidateUserReq, res: Response) : void
}

export interface UpdateUserRequestHandler {
    (req: IUpdateUserReq, res: Response) : void
}

export interface UpdateUserRequestHandler {
    (req: IUpdateUserReq, res: Response) : void
}

export interface SoftDeleteUsersRequestHandler {
    (req: ISoftDeleteUserReq, res: Response): void
}

export interface DeleteUsersRequestHandler {
    (req: IDeleteUserReq, res: Response): void
}