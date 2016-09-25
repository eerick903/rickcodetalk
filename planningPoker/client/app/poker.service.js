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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var Subject_1 = require('rxjs/Subject');
var angular2_websocket_1 = require('angular2-websocket/angular2-websocket');
var POKER_URL = 'http://localhost:4000/channel';
var DEFAULT_HEADER = new http_1.Headers({ 'Content-Type': 'application/json' });
var DEFAULT_OPTION = new http_1.RequestOptions({ headers: DEFAULT_HEADER });
//const SOCK_URL = 'ws://localhost:9999/echo'
var SOCK_URL = 'ws://localhost:8080';
var PokerService = (function () {
    function PokerService(http) {
        this.http = http;
        this.result = new Subject_1.Subject();
        this.result$ = this.result.asObservable();
        this.connection = {
            channel: undefined,
            isConnected: false,
            userName: undefined,
            type: undefined,
        };
        this.webSocketConnect();
        /*
                this.webSocket.onMessage(function(message) {
                    console.log(message);
                });*/
    }
    PokerService.prototype.webSocketConnect = function () {
        var _this = this;
        this.webSocket = new angular2_websocket_1.$WebSocket(SOCK_URL);
        this.webSocket.onMessage(function (message) { return _this.webSocketReceive(message); }, {});
    };
    PokerService.prototype.webSocketSend = function (data) {
        this.webSocket.send(data).subscribe();
    };
    PokerService.prototype.webSocketReceive = function (message) {
        console.log(message);
        try {
            var data = JSON.parse(message.data);
            if (data && data.type) {
                switch (data.type) {
                    case 'result':
                        console.log('type = result');
                        this.result.next(data.data);
                        break;
                }
            }
        }
        catch (e) {
            console.error(e);
        }
    };
    PokerService.prototype.isConnected = function () {
        return this.connection.isConnected;
    };
    PokerService.prototype.getConnectionType = function () {
        return this.connection.type;
    };
    PokerService.prototype.createChannel = function (channelName) {
        var _this = this;
        return this.http.post(POKER_URL + "/create", JSON.stringify({ name: channelName }), DEFAULT_OPTION)
            .map(function (r) {
            var j = r.json();
            if (j.status === 'S') {
                _this.connection.channel = channelName;
                _this.connection.isConnected = true;
                _this.connection.type = 'host';
                _this.connection.userName = undefined;
                _this.webSocketConnect();
                _this.webSocketSend({ type: 'createChannel', channelName: channelName });
            }
            return j;
        });
    };
    PokerService.prototype.deleteChannel = function () {
        var _this = this;
        return this.http.delete(POKER_URL + "/leave/" + this.connection.channel, DEFAULT_OPTION)
            .map(function (r) {
            var j = r.json();
            if (j.status === 'S') {
                _this.resetConnection();
            }
            return j;
        });
    };
    PokerService.prototype.joinChannel = function (channelName, userName) {
        var _this = this;
        console.log('joinChannel:' + channelName);
        return this.http.get(POKER_URL + "/is_exist/" + channelName, DEFAULT_OPTION)
            .map(function (r) {
            //console.log('joinChannel:' + channelName);
            var j = r.json();
            if (j.status === 'S') {
                _this.connection.channel = channelName;
                _this.connection.isConnected = true;
                _this.connection.type = 'client';
                _this.connection.userName = userName;
                _this.webSocketSend({ type: 'joinChannel', channelName: channelName, userName: userName });
            }
            return j;
        });
    };
    PokerService.prototype.leaveChannel = function () {
        this.resetConnection();
    };
    PokerService.prototype.getResult = function () {
        return this.http.get(POKER_URL + "/getResult/" + this.connection.channel, DEFAULT_OPTION)
            .map(function (r) { return r.json(); });
    };
    PokerService.prototype.reset = function () {
        return this.http.post(POKER_URL + "/reset/" + this.connection.channel, {}, DEFAULT_OPTION)
            .map(function (r) { return r.json(); });
    };
    PokerService.prototype.play = function (card) {
        return this.http.post(POKER_URL + "/play/" + this.connection.channel + "/" + this.connection.userName, JSON.stringify({ value: card.name }), DEFAULT_OPTION)
            .map(function (r) { return r.json(); });
    };
    PokerService.prototype.resetConnection = function () {
        this.connection.channel = undefined;
        this.connection.isConnected = false;
        this.connection.type = undefined;
        this.connection.userName = undefined;
    };
    PokerService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PokerService);
    return PokerService;
}());
exports.PokerService = PokerService;
//# sourceMappingURL=poker.service.js.map