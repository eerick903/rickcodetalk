import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'login',
    template: `
Login Page
<br>

<button (click)="goToLanding()">Goto Landing</button>
`
})
export class Login {

    constructor(private router: Router) {

    }

    goToLanding() {

        this.router.navigate(['/landing']);
    }
}