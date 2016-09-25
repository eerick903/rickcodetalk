import { Component } from '@angular/core';


@Component({
  selector: 'my-app',
  template: `

  <div class="container">
    <div class="page-header">
        <h1>Planning Poker</h1>
    </div>
    <router-outlet></router-outlet>
  </div>

  `
})
export class AppComponent { 

    constructor() {
        
    }
}
