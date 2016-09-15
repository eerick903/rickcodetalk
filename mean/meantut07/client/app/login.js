"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var user_service_1 = require('./user.service');
var Login = (function () {
    function Login(userService) {
        this.userService = userService;
        this.user = { name: "", password: "" };
        this.alertMessage = '';
    }
    Login.prototype.onLoginClicked = function () {
        var _this = this;
        this.userService.login(this.user).subscribe(function (x) { return console.log(x); }, function (err) {
            console.log(err);
            _this.alertMessage = err.json().reason;
        });
    };
    Login = __decorate([
        core_1.Component({
            selector: 'login',
            template: "\nLogin Page\n<br>\n\n<input [(ngModel)]=\"user.name\" placeholder=\"name\">\n<br>\n<input [(ngModel)]=\"user.password\" placeholder=\"password\" type=\"password\">\n<br>\n<button (click)=\"onLoginClicked()\">Login</button>\n<div class='alert'>{{alertMessage}}</div>\n"
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService])
    ], Login);
    return Login;
}());
exports.Login = Login;
//# sourceMappingURL=login.js.map