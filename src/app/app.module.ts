import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AuthGuard} from "./service/auth-guard.service";
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material';
import { HomepageComponent } from './homepage/homepage.component';
import {Ng2CarouselamosModule} from 'ng2-carouselamos';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './/app-routing.module';
import {SharedService} from "./service/shared.service";
import {InterceptorService} from "./service/interceptor.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {LoginService} from "./service/login.service";
import { ProductComponent } from './product/product.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    ProductComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatIconModule,
    Ng2CarouselamosModule,
    AppRoutingModule
  ],
  providers: [
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    AuthGuard,
    SharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
