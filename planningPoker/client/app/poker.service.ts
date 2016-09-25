import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject} from 'rxjs/Subject';
import { $WebSocket } from 'angular2-websocket/angular2-websocket';

const POKER_URL = 'http://localhost:4000/channel';
const DEFAULT_HEADER = new Headers({ 'Content-Type': 'application/json' });
const DEFAULT_OPTION = new RequestOptions({ headers: DEFAULT_HEADER });
//const SOCK_URL = 'ws://localhost:9999/echo'
const SOCK_URL = 'ws://localhost:8080'

@Injectable()
export class PokerService {

    webSocket: $WebSocket;

    private result = new Subject<any[]>();
    result$ = this.result.asObservable();

    constructor(private http: Http) {

        this.webSocketConnect();
       
/*
        this.webSocket.onMessage(function(message) {
            console.log(message);
        });*/
    }

    private connection = {
        channel: undefined,
        isConnected: false,
        userName: undefined,
        type: undefined,    // client or host

    }

    webSocketConnect() {

        this.webSocket = new $WebSocket(SOCK_URL);
        this.webSocket.onMessage(message => this.webSocketReceive(message), {});
    }

    webSocketSend(data) {
        this.webSocket.send(data).subscribe();
    }

    webSocketReceive(message) {

        console.log(message);

        try {
            let data = JSON.parse(message.data);

            if(data && data.type) {

                switch(data.type) {

                    case 'result':
                        console.log('type = result');
                        this.result.next(data.data);
                        break;
                }
            }
        } catch(e) {

            console.error(e);
        }
    }

    isConnected() {

        return this.connection.isConnected;
    }

    getConnectionType() {

        return this.connection.type;
    }

    createChannel(channelName) {

        return this.http.post(`${POKER_URL}/create`, JSON.stringify({name:channelName}), DEFAULT_OPTION)
             .map(r => {
                 
                 let j = r.json();

                 if(j.status === 'S') {

                     this.connection.channel = channelName;
                     this.connection.isConnected = true;
                     this.connection.type = 'host';
                     this.connection.userName = undefined;
                     this.webSocketConnect();
                     this.webSocketSend({type:'createChannel', channelName:channelName});
                 } 

                 return j;
             });
     
    }

    deleteChannel() {

        return this.http.delete(`${POKER_URL}/leave/${this.connection.channel}`, DEFAULT_OPTION)
             .map(r => {
                 
                 let j = r.json();

                 if(j.status === 'S') {

                     this.resetConnection();
                 } 

                 return j;
             });
     
    }

    joinChannel(channelName, userName) {
                 console.log('joinChannel:' + channelName);

        return this.http.get(`${POKER_URL}/is_exist/${channelName}`, DEFAULT_OPTION)
             .map(r => {
                 //console.log('joinChannel:' + channelName);
                 let j = r.json();

                 if(j.status === 'S') {

                     this.connection.channel = channelName;
                     this.connection.isConnected = true;
                     this.connection.type = 'client';
                     this.connection.userName = userName;

                     this.webSocketSend({type:'joinChannel', channelName:channelName, userName:userName});

                 } 

                 return j;
             });
     
    }

    leaveChannel() {

        this.resetConnection();
    }

    getResult() {

        return this.http.get(`${POKER_URL}/getResult/${this.connection.channel}`, DEFAULT_OPTION)
             .map(r => r.json());
     
    }

    reset() {

        return this.http.post(`${POKER_URL}/reset/${this.connection.channel}`, {}, DEFAULT_OPTION)
             .map(r => r.json());
     
    }

    play(card) {

        return this.http.post(`${POKER_URL}/play/${this.connection.channel}/${this.connection.userName}`, JSON.stringify({value:card.name}), DEFAULT_OPTION)
             .map(r => r.json());
     
    }

    resetConnection() {
        this.connection.channel = undefined;
        this.connection.isConnected = false;
        this.connection.type = undefined;
        this.connection.userName = undefined;
    }

}

