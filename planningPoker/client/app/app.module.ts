import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { FormsModule }      from '@angular/forms'
import { HttpModule } from '@angular/http';

import { AppComponent }     from './app.component';
import { routing }          from './app.routing'

import { Poker }            from './poker';
import { PokerService }     from './poker.service';

@NgModule({
  imports:      [ BrowserModule, routing, FormsModule, HttpModule ],
  declarations: [ AppComponent, Poker ],
  bootstrap:    [ AppComponent ],
  providers:    [ PokerService ],
})
export class AppModule { }
