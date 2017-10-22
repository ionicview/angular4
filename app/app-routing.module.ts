import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HeroTopComponent} from './heroes/hero-top/hero-top.component';
import {AppConfig} from './config/app.config';
import {Error404Component} from './core/error404/error-404.component';
import {LoginComponent} from './login/login.component'
import {AuthGuard} from './auth/guards/auth.guard';

import{PublicsampleComponent} from './publicsample/publicsample.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},

  {path: '', component: HeroTopComponent, canActivate: [AuthGuard] },
  {path: AppConfig.routes.heroes, loadChildren: './heroes/heroes.module#HeroesModule'},
  {path: AppConfig.routes.login, component:LoginComponent},
  {path: AppConfig.routes.getuser, component: PublicsampleComponent},
  {path: AppConfig.routes.error404, component: Error404Component},

  // otherwise redirect to 404
  {path: '**', redirectTo: '/' + AppConfig.routes.error404}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
