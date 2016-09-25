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
var poker_service_1 = require('./poker.service');
var Poker = (function () {
    function Poker(pokerService) {
        var _this = this;
        this.pokerService = pokerService;
        this.errorMessage = "";
        this.resultCards = [];
        this.cards = [
            { name: "0", isClicked: false, index: 0 },
            { name: "1/2", isClicked: false, index: 1 },
            { name: "1", isClicked: false, index: 2 },
            { name: "2", isClicked: false, index: 3 },
            { name: "3", isClicked: false, index: 4 },
            { name: "5", isClicked: false, index: 5 },
            { name: "8", isClicked: false, index: 6 },
            { name: "13", isClicked: false, index: 7 },
            { name: "20", isClicked: false, index: 8 },
            { name: "40", isClicked: false, index: 9 },
            { name: "?", isClicked: false, index: 10 },
            { name: "∞", isClicked: false, index: 11 },
        ];
        this.lastClickedCardIndex = 0;
        this.menuSelected = undefined;
        this.formData = {
            channelName: "",
            userName: ""
        };
        pokerService.result$.subscribe(function (result) {
            _this.resultCards = result;
        });
    }
    Poker.prototype.onCardClicked = function (index) {
        var _this = this;
        this.cards[this.lastClickedCardIndex].isClicked = false;
        this.cards[index].isClicked = true;
        this.lastClickedCardIndex = index;
        this.pokerService.play(this.cards[index]).subscribe(function (data) {
            console.log(data);
            if (data.status === 'F') {
                _this.errorMessage = data.reason;
            }
        }, function (error) { return console.log(error); });
    };
    Poker.prototype.onMainMenuButtonClicked = function () {
    };
    Poker.prototype.onCreateChannelClicked = function () {
        var _this = this;
        this.errorMessage = '';
        this.pokerService.createChannel(this.formData.channelName).subscribe(function (data) {
            console.log(data);
            if (data.status === 'F') {
                _this.errorMessage = data.reason;
            }
            else {
                _this.formData.channelName = '';
            }
        }, function (error) { return console.log(error); });
    };
    Poker.prototype.onGetResultClicked = function () {
        var _this = this;
        this.pokerService.getResult().subscribe(function (data) {
            console.log(data);
            if (data.status === 'F') {
                _this.errorMessage = data.reason;
            }
            else {
                _this.resultCards = data.result;
            }
        }, function (error) { return console.log(error); });
    };
    Poker.prototype.onResetClicked = function () {
        var _this = this;
        this.pokerService.reset().subscribe(function (data) {
            console.log(data);
            if (data.status === 'F') {
                _this.errorMessage = data.reason;
            }
            else {
                _this.resultCards = [];
            }
        }, function (error) { return console.log(error); });
    };
    Poker.prototype.onDeleteChannelClicked = function () {
        var _this = this;
        this.pokerService.deleteChannel().subscribe(function (data) {
            console.log(data);
            if (data.status === 'F') {
                _this.errorMessage = data.reason;
            }
            else {
                _this.resultCards = [];
            }
        }, function (error) { return console.log(error); });
    };
    Poker.prototype.onLeaveChannelClicked = function () {
        this.pokerService.leaveChannel();
    };
    Poker.prototype.onJoinChannelClicked = function () {
        var _this = this;
        this.errorMessage = '';
        this.pokerService.joinChannel(this.formData.channelName, this.formData.userName).subscribe(function (data) {
            console.log(data);
            if (data.status === 'F') {
                _this.errorMessage = data.reason;
            }
            else {
            }
        }, function (error) { return console.log(error); });
    };
    Poker = __decorate([
        core_1.Component({
            selector: 'poker',
            template: "\n    <div class=\"main-menu\">\n        <div class=\"btn-group\" role=\"group\">\n            <button type=\"button\" class=\"btn btn-secondary\" (click)=\"menuSelected = 'Host'\" *ngIf=\"!(pokerService.getConnectionType()==='client')\">Host</button>\n            <button type=\"button\" class=\"btn btn-secondary\" (click)=\"menuSelected = 'Client'\" *ngIf=\"!(pokerService.getConnectionType()==='host')\">Client</button>\n        </div>\n    </div>\n\n    <div class=\"error-message\" *ngIf=\"errorMessage!=''\">\n        {{errorMessage}}\n    </div>\n\n    <div class=\"main-menu-form\">\n        <div *ngIf=\"menuSelected=='Host'\">\n            <div *ngIf=\"!pokerService.isConnected()\">\n                <input [(ngModel)]=\"formData.channelName\" placeholder=\"channel name\" >\n                <br>\n                <button class=\"btn btn-primary\" (click)=\"onCreateChannelClicked()\">Create Channel</button>\n            </div>\n            <div *ngIf=\"pokerService.isConnected()\">\n                <button class=\"btn btn-primary\" (click)=\"onDeleteChannelClicked()\">Delete Channel</button>\n            </div>\n        </div>\n        <div *ngIf=\"menuSelected=='Client'\">\n            <div *ngIf=\"!pokerService.isConnected()\">\n                <input [(ngModel)]=\"formData.channelName\" placeholder=\"channel name\">\n                <br>\n                <input [(ngModel)]=\"formData.userName\" placeholder=\"your name\">\n                <br>\n                <button class=\"btn btn-primary\" (click)=\"onJoinChannelClicked()\">Join Channel</button>\n            </div>\n            <div *ngIf=\"pokerService.isConnected()\">\n                <button class=\"btn btn-primary\" (click)=\"onLeaveChannelClicked()\">Leave Channel</button>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"client-panel\" *ngIf=\"pokerService.getConnectionType()==='client'\">\n        <div class=\"card col-lg-2 col-md-2 col-sm-3 col-xs-6\" [style.background-color]=\"card.isClicked ? 'green':'white'\" (click)=\"onCardClicked(card.index)\" *ngFor=\"let card of cards\">\n            <div class=\"card-block\">\n                <p class=\"card-text poker-card-number\">{{card.name}}</p>\n            </div>\n        </div>\n    </div>\n    <div class=\"host-panel\" *ngIf=\"pokerService.getConnectionType()==='host'\">\n        <button class=\"btn btn-primary\" (click)=\"onGetResultClicked()\">Get Result</button>\n        <button class=\"btn btn-primary\" (click)=\"onResetClicked()\">Reset</button>\n\n        <br>\n        <div class=\"card col-lg-2 col-md-2 col-sm-3 col-xs-6 result-card\" *ngFor=\"let card of resultCards\">\n            <div class=\"card-block\">\n                <p class=\"card-text poker-card-number\">{{card.value}}</p>\n                <p class=\"card-text poker-card-user-name\">{{card.name}}</p>\n            </div>\n        </div>\n    </div>\n    "
        }), 
        __metadata('design:paramtypes', [poker_service_1.PokerService])
    ], Poker);
    return Poker;
}());
exports.Poker = Poker;
//# sourceMappingURL=poker.js.map