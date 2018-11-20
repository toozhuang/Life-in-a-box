import { User } from "src/app/models/user";
import { AuthActionsUnion, AuthenticateTypes, LoginSuccess, StoreUser } from "../actions/auth.actions";


export interface State {
    loggedIn: boolean;
    user: User | null;
}

/**
 * 初始的登录状态
 * 未登录,
 * 无user
 */
export const initialState: State = {
    loggedIn: false,
    user: null
}

export function reducer(state: State = initialState, action: AuthActionsUnion) {
    switch (action.type) {
        case AuthenticateTypes.StoreUser:
            return {
                ...state,
                ...{
                    loggedIn: false,
                    user: {
                        name: null,
                        thirdId: (<StoreUser>action).payload.thirdId
                    }
                }
            };
            break;
        case AuthenticateTypes.LoginSuccess:
            return {
                ...state,
                ...{
                    loggedIn: true,
                    user: (<LoginSuccess>action).payload.user
                }
            }
            break;

        default:
            return state;
            break;
    }
}

// 返回 loggin 的状态
export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => state.user;