import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routing';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';

import { BarRatingModule } from "ngx-bar-rating";

import {
  NgxAwesomePopupModule,
  DialogConfigModule,
  ConfirmBoxConfigModule,
  ToastNotificationConfigModule
} from '@costlydeveloper/ngx-awesome-popup';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,//peticiones http
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    NgxAwesomePopupModule.forRoot(), // Essential, mandatory main module.
    DialogConfigModule.forRoot(), // Needed for instantiating dynamic components.
    ConfirmBoxConfigModule.forRoot(), // Needed for instantiating confirm boxes.
    ToastNotificationConfigModule.forRoot(), provideStorage(() => getStorage()), // Needed for instantiating toast notifications.
    BarRatingModule
  ],
  exports: [
    AppRoutingModule,
    RouterModule,
    BarRatingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
