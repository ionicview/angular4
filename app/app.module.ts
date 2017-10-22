import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { APP_CONFIG, AppConfig } from './config/app.config';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/modules/shared.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule, Http, RequestOptions, BaseRequestOptions } from '@angular/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from './app.translate.factory';
import { HeroTopComponent } from './heroes/hero-top/hero-top.component';
import { LoginComponent } from './login/login.component';

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import {AuthGuard} from './auth/guards/auth.guard';

import {AuthenticationService} from './auth/services/authentication.service';
import {UserService} from './auth/services/user.service';
import { PublicsampleComponent } from './publicsample/publicsample.component';
import { GroupsComponent } from './groups/groups.component';


export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  console.log("IN Auth Factory!!!");
  const authConfig = new AuthConfig({
    tokenGetter: (() => {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      var token = currentUser && currentUser.token;
      console.log("Token :" + token);
      return token;
    }
    ),
  });
  return new AuthHttp(authConfig, http, options);
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SharedModule.forRoot(),
    CoreModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HeroTopComponent,
    LoginComponent,
    PublicsampleComponent,
    GroupsComponent
  ],
  providers: [
    UserService,
    AuthHttp,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    AuthGuard,
    AuthenticationService,
    { provide: APP_CONFIG, useValue: AppConfig }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
