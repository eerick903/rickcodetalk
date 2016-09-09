import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
    selector: 'register',
    providers: [UserService],
    template: `
Register Page
<br>

<input [(ngModel)]="user.name" placeholder="name">
<br>
<input [(ngModel)]="user.password" placeholder="password" type="password">
<br>
<button (click)="onRegisterClicked()">Register</button>

`
})
export class Register {

    constructor(private userService: UserService) {

    }

    user = { name: "", password: ""};

    onRegisterClicked() {

        this.userService.register(this.user).subscribe(
            x => console.log(x),
            err => console.log(err)

        );
    }
}