import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { RegisterComponent } from './components/register/register.component';
import { AlertComponent } from './_directives/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    RegisterComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
