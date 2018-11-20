import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from "@angular/router";
import { AuthService } from "src/app/service/core/auth.service";
import { Observable } from "rxjs";
import { Action } from "@ngrx/store";
import { Login, AuthenticateTypes, LoginSuccess } from "../actions/auth.actions";
import { map, exhaustMap } from "rxjs/operators";
import { Authenticate } from "src/app/models/user";

@Injectable()
export class AuthEffects {
    @Effect()
    login$: Observable<Action> = this.actions$.pipe(
        ofType<Login>(AuthenticateTypes.login),
        map(action => action.payload),
        exhaustMap((authObj: Authenticate) => {
            return this.authService.login(authObj).pipe(map((user: any) => new LoginSuccess({ user })))
        })
    );




    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ) { }
}