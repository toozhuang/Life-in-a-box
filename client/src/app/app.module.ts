import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { HttpClientModule } from "@angular/common/http";

import { registerLocaleData } from "@angular/common";
import zh from "@angular/common/locales/zh";
import { RouterModule } from "@angular/router";
import { rootRoutes } from "./root-routing";
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';

import { StoreModule } from "@ngrx/store";
import { reducer } from "./reducers";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./auth/effects/auth.effects";

registerLocaleData(zh);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    RouterModule.forRoot(rootRoutes),
    StoreModule.forRoot(reducer),
    EffectsModule.forRoot([AuthEffects]),
    HttpClientModule,
    FormsModule,
    NgZorroAntdModule
  ],

  bootstrap: [AppComponent],

  providers: [{ provide: NZ_I18N, useValue: zh_CN }]
})
export class AppModule { }
