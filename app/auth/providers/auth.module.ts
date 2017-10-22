import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  console.log("IN Auth Factory");
  const authConfig = new AuthConfig({
    tokenGetter: (() => localStorage.getItem('currentUser')),
  });
  return new AuthHttp(authConfig, http, options);
}

@NgModule({
  providers: [
  
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    }
  ]
})
export class AuthModule {}