import { Component } from '@angular/core';
import {LoginService} from "./service/login.service";
import {Router} from "@angular/router";
import {SharedService} from "./service/shared.service";
import swal from 'sweetalert2';
import {User} from "./models/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  usere = new User();
  logged = false;

  constructor(private loginService: LoginService, private router: Router, private _sharedService: SharedService) {
    let userLogged = JSON.parse(localStorage.getItem('user'));
    if (userLogged != null) {
      let token: string [] = atob(localStorage.getItem('token')).split(':');
      let user = {username: token[0], password: token[1]};
      this.loginService.login(user).subscribe(data => {
        console.log('logged ' + data)
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('token', btoa(user.username + ':' + user.password));
        this.logged = true;
        this.router.navigate(['homepage']);
      }, err => {
        console.error(err);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.logged = false;
        this.router.navigate(['login']);
      })
    }
    _sharedService.changeEmitted$.subscribe(text => {
      console.log(text);
      this.logged = true;
    });
  }

  logout() {
    this.loginService.logout().subscribe(() => {
      console.log('logged out.')
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.loginService.dettagli().subscribe(d=> {
          this.usere = <User> d,
            swal({
              title: 'Torna a trovarci presto ' + this.usere.nome,
              text: 'Log-out eseguito',
              type: 'success'
            });
        }
      );
      this.logged = false;
    }, err => {
      console.log(err)
    })
  }
}
