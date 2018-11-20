import { Action } from "@ngrx/store";
import { Authenticate, User } from "src/app/models/user";

export enum AuthenticateTypes {
    login = '[Auth] Login',
    Logout = '[Auth] Logout',
    LoginSuccess = '[Auth] Login Success',
    LoginFailure = '[Auth] login Failure',
    StoreUser = '[Auth] StoreUser'
}

export class StoreUser implements Action{
    readonly type: string = AuthenticateTypes.StoreUser;
    constructor(public payload: Authenticate) { }
}

export class Login implements Action {
    readonly type: string = AuthenticateTypes.login;
    constructor(public payload: Authenticate) { }
}

export class LoginSuccess implements Action {
    readonly type: string = AuthenticateTypes.LoginSuccess;
    constructor(public payload: { user: User }) { }
}

export class LoginFailure implements Action {
    readonly type: string = AuthenticateTypes.LoginFailure;
    constructor(public payload: any) { }
}


export class Logout implements Action {
    readonly type = AuthenticateTypes.Logout;
}



/**
 * 登录的几个状态,
 * 后面还可以接着添加
 */
export type AuthActionsUnion =
    | Login
    | LoginSuccess
    | LoginFailure
    | Logout;
