import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
    selector: 'login',
    template: `
Login Page
<br>

<input [(ngModel)]="user.name" placeholder="name">
<br>
<input [(ngModel)]="user.password" placeholder="password" type="password">
<br>
<button (click)="onLoginClicked()">Login</button>
<div class='alert'>{{alertMessage}}</div>
`
})
export class Login {

    constructor(private userService: UserService) {

    }

    user = { name: "", password: ""};
    alertMessage = '';

    onLoginClicked() {

        this.userService.login(this.user).subscribe(
            x => console.log(x),
            err => {

                console.log(err);
                this.alertMessage = err.json().reason;
            }
        );
    }
}