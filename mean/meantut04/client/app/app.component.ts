import { Component } from '@angular/core';
@Component({
    selector: 'my-app',
    template: `
<h1>{{title}}</h1>

<input [(ngModel)]="login.name" placeholder="name">
<br>
<input [(ngModel)]="login.password" placeholder="password" type="password">
<br>
<button (click)="onLoginClicked()">Login</button>

`
})
export class AppComponent {

    title = "rickcodetalk Angular 2 Introduction";
    login = { name: "", password: "" };

    onLoginClicked() {

        alert("name : " + this.login.name + " - password : " + this.login.password);
    }
}