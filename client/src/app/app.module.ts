import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { HttpClientModule } from "@angular/common/http";

import { registerLocaleData } from "@angular/common";
import zh from "@angular/common/locales/zh";
import { RouterModule } from "@angular/router";
import { rootRoutes } from "./root-routing";

registerLocaleData(zh);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    RouterModule.forRoot(rootRoutes),
    HttpClientModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
