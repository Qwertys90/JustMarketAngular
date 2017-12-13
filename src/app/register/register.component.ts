import { Component } from '@angular/core';
import {LoginService} from "../service/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user = {username: '', password: '', profileType: 'ROLE_USER'};

  constructor(private loginService: LoginService, private router: Router) { }

  register() {
    this.loginService.register(this.user).subscribe(data => {
      console.log(data);
        this.router.navigate(['login']);
    }, err => {
      console.log(err);
    })
  }

}
