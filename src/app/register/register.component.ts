import { Component } from '@angular/core';
import {LoginService} from "../service/login.service";
import {Router} from "@angular/router";
import {User} from "../models/user";
import swal from 'sweetalert2'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user = new User();

  constructor(private loginService: LoginService, private router: Router) { }

  register() {
    this.user.tipo='NORMALE';
    this.loginService.register(this.user).subscribe(data => {
      console.log(data);
      this.router.navigate(['login']);
    }, err => {
      console.log(err);
      swal(
        'Oops...',
        'Username già in uso',
        'error'
      )
    })
  }

}
