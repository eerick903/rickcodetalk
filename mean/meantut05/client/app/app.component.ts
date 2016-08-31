import { Component } from '@angular/core';
@Component({
    selector: 'my-app',
    template: `
<h1>{{title}}</h1>

<a routerLink="/login">Login</a>| 
<a routerLink="/register">Register</a>| 
<a routerLink="/landing">Landing</a>
<br>
<router-outlet></router-outlet>

<!--
<input [(ngModel)]="login.name" placeholder="name">
<br>
<input [(ngModel)]="login.password" placeholder="password" type="password">
<br>
<button (click)="onLoginClicked()">Login</button>
-->
`
})
export class AppComponent {

    title = "rickcodetalk Angular 2 Introduction";
    login = { name: "", password: "" };

    onLoginClicked() {

        alert("name : " + this.login.name + " - password : " + this.login.password);
    }
}