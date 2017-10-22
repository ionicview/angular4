import {Component, ViewChild, OnInit} from '@angular/core';
import {Hero} from '../heroes/shared/hero.model';
import {HeroService} from '../heroes/shared/hero.service';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material';
import {AppConfig} from '../config/app.config';
import {Router} from '@angular/router';
import {LoggerService} from '../core/logger.service';
import {AuthenticationService} from '../auth/services/authentication.service';
import {User} from '../auth/models/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  model: any = {};
  loading = false;
  error = '';
  @ViewChild('form') myNgForm; // just to call resetForm method
  constructor(private heroService: HeroService,
              private dialog: MatDialog,
              private router: Router,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService
            ) {

              this.loginForm = this.formBuilder.group({
                'username': ['', [Validators.required]],
                'password': ['', [Validators.required]]
              });
 
  }

  ngOnInit() {
  }

  login(user:User) {
    console.log("IN login");
    this.loading = true;
    this.authenticationService.login(user)
        .subscribe(result => {
            if (result === true) {
                this.router.navigate(['/']);
            } else {
                this.error = 'Username or password is incorrect';
                this.loading = false;
            }
        });
}

}
