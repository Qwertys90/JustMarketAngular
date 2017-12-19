import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
import {AuthGuard} from "./service/auth-guard.service";
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatCardModule, MatCheckboxModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatRadioModule, MatSelectModule,
  MatSidenavModule, MatSliderModule,
  MatSlideToggleModule
} from '@angular/material';
import { HomepageComponent } from './homepage/homepage.component';
import {Ng2CarouselamosModule} from 'ng2-carouselamos';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './/app-routing.module';
import {SharedService} from "./service/shared.service";
import {InterceptorService} from "./service/interceptor.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginService} from "./service/login.service";
import { ProductComponent } from './product/product.component';
import {ProductService} from './service/product.service';
import {NouisliderModule} from 'ng2-nouislider';
import { CarrelloComponent } from './carrello/carrello.component';
import {CreditCardService} from './service/credit-card.service';
import {TransazioneService} from './service/transazione.service';
import {StarRatingModule} from 'angular-star-rating';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    CarrelloComponent,
    UserProfileComponent
  ],
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatIconModule,
    MatExpansionModule,
    Ng2CarouselamosModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule,
    NouisliderModule,
    Ng2PageScrollModule,
    MatSliderModule
  ],
  providers: [
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    CreditCardService,
    AuthGuard,
    SharedService,
    ProductService,
    TransazioneService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
