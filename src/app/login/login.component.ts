import { Component, OnInit } from '@angular/core';
import {LoginService} from "../service/login.service";
import {Router} from "@angular/router";
import {SharedService} from "../service/shared.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {username: '', password: ''};

  constructor(private loginService: LoginService, private router: Router,
              private _sharedService: SharedService) { }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.user).subscribe(data => {
      console.log(data);
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token', btoa(this.user.username + ':' + this.user.password));
      this._sharedService.emitChange('logged=true');
      this.router.navigate(['homepage'], { replaceUrl: true });
    }, err => {
      console.log(err);
    })
  }

}
