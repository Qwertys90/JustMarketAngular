  import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ProductComponent} from "./product/product.component";
//import {AuthGuard} from "./service/auth-guard.service";
import {HomepageComponent} from './homepage/homepage.component';
  import {UserProfileComponent} from './user-profile/user-profile.component';


const routes: Routes =[
  {path: '', redirectTo: '/homepage', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'product', component: ProductComponent},
  {path: 'product/:categoria', component: ProductComponent},
  {path: 'homepage', component: HomepageComponent},
  {path: 'profile', component: UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
