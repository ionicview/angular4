import { Component, OnInit } from '@angular/core';
import{UserService} from '../auth/services/user.service';
import{User} from '../auth/models/user';

@Component({
  selector: 'app-publicsample',
  templateUrl: './publicsample.component.html',
  styleUrls: ['./publicsample.component.css']
})
export class PublicsampleComponent implements OnInit {

  constructor(private userService:UserService) { }

  user:User;

  ngOnInit() {
            // get users from secure api end point
            this.userService.getUsers()
            .subscribe(users => {
                this.user = users;
            });
  }

}
