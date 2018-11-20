
import * as fromAuth from '../auth/reducers/auth.reducer';

/**
 * 这是一个未来会变得复杂的总reducer根目录
 * 后面所有的service交互 大部分都会经过这里
 * 算是一个总阀吧
 * 妈的, redux真的烦
 */
import { ActionReducerMap } from "@ngrx/store";

export interface State {
    auth: fromAuth.State
}

export const reducer: ActionReducerMap<State> = {
    auth: fromAuth.reducer
}