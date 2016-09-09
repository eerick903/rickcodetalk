import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'

import { AppComponent }  from './app.component';
import { routing } from './app.routing'

import { Login } from './login';
import { Register } from './register';
import { Landing } from './landing';

import { HttpModule } from '@angular/http';

@NgModule({
    imports:      [ BrowserModule, FormsModule, routing, HttpModule ],
    declarations: [ AppComponent, Login, Register, Landing ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
