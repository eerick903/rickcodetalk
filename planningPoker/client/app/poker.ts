import { Component } from '@angular/core';

import { PokerService } from './poker.service';

@Component({
    selector: 'poker',
    template: `
    <div class="main-menu">
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-secondary" (click)="menuSelected = 'Host'" *ngIf="!(pokerService.getConnectionType()==='client')">Host</button>
            <button type="button" class="btn btn-secondary" (click)="menuSelected = 'Client'" *ngIf="!(pokerService.getConnectionType()==='host')">Client</button>
        </div>
    </div>

    <div class="error-message" *ngIf="errorMessage!=''">
        {{errorMessage}}
    </div>

    <div class="main-menu-form">
        <div *ngIf="menuSelected=='Host'">
            <div *ngIf="!pokerService.isConnected()">
                <input [(ngModel)]="formData.channelName" placeholder="channel name" >
                <br>
                <button class="btn btn-primary" (click)="onCreateChannelClicked()">Create Channel</button>
            </div>
            <div *ngIf="pokerService.isConnected()">
                <button class="btn btn-primary" (click)="onDeleteChannelClicked()">Delete Channel</button>
            </div>
        </div>
        <div *ngIf="menuSelected=='Client'">
            <div *ngIf="!pokerService.isConnected()">
                <input [(ngModel)]="formData.channelName" placeholder="channel name">
                <br>
                <input [(ngModel)]="formData.userName" placeholder="your name">
                <br>
                <button class="btn btn-primary" (click)="onJoinChannelClicked()">Join Channel</button>
            </div>
            <div *ngIf="pokerService.isConnected()">
                <button class="btn btn-primary" (click)="onLeaveChannelClicked()">Leave Channel</button>
            </div>
        </div>
    </div>

    <div class="client-panel" *ngIf="pokerService.getConnectionType()==='client'">
        <div class="card col-lg-2 col-md-2 col-sm-3 col-xs-6" [style.background-color]="card.isClicked ? 'green':'white'" (click)="onCardClicked(card.index)" *ngFor="let card of cards">
            <div class="card-block">
                <p class="card-text poker-card-number">{{card.name}}</p>
            </div>
        </div>
    </div>
    <div class="host-panel" *ngIf="pokerService.getConnectionType()==='host'">
        <button class="btn btn-primary" (click)="onGetResultClicked()">Get Result</button>
        <button class="btn btn-primary" (click)="onResetClicked()">Reset</button>

        <br>
        <div class="card col-lg-2 col-md-2 col-sm-3 col-xs-6 result-card" *ngFor="let card of resultCards">
            <div class="card-block">
                <p class="card-text poker-card-number">{{card.value}}</p>
                <p class="card-text poker-card-user-name">{{card.name}}</p>
            </div>
        </div>
    </div>
    `
})

export class Poker {

    errorMessage = "";

    resultCards = [];

    cards = [

        { name:"0", isClicked:false, index:0 },
        { name:"1/2", isClicked:false, index:1 },
        { name:"1", isClicked:false , index:2 },
        { name:"2", isClicked:false, index:3 },
        { name:"3", isClicked:false, index:4 },
        { name:"5", isClicked:false, index:5 },
        { name:"8", isClicked:false, index:6 },
        { name:"13", isClicked:false, index:7 },
        { name:"20", isClicked:false, index:8 },
        { name:"40", isClicked:false, index:9 },
        { name:"?", isClicked:false, index:10 },
        { name:"∞", isClicked:false, index:11 },
    ];

    lastClickedCardIndex = 0;
    menuSelected = undefined;

    formData = {
        channelName:"",
        userName:""
    }

    constructor(private pokerService:PokerService) {
        pokerService.result$.subscribe(

            result => {

                this.resultCards = result;
            }
        );
    }

    onCardClicked(index) {

        this.cards[this.lastClickedCardIndex].isClicked = false;
        this.cards[index].isClicked = true;
        this.lastClickedCardIndex = index;

        this.pokerService.play(this.cards[index]).subscribe(
            data => {

                console.log(data);
                if(data.status === 'F') {

                    this.errorMessage = data.reason;
                } 
            },
            error => console.log(error)
        )
    }

    onMainMenuButtonClicked() {

    }

    onCreateChannelClicked() {

        this.errorMessage =''

        this.pokerService.createChannel(this.formData.channelName).subscribe(
            data => {

                console.log(data);
                if(data.status === 'F') {

                    this.errorMessage = data.reason;
                } else {

                    this.formData.channelName = '';
                }
            },
            error => console.log(error)
        )
    }

    onGetResultClicked() {

        this.pokerService.getResult().subscribe(
            data => {

                console.log(data);
                if(data.status === 'F') {

                    this.errorMessage = data.reason;
                } else {
                    
                    this.resultCards = data.result;
                }
            },
            error => console.log(error)
        )
    }

    onResetClicked() {

        this.pokerService.reset().subscribe(
            data => {

                console.log(data);
                if(data.status === 'F') {

                    this.errorMessage = data.reason;
                }  else {

                    this.resultCards = [];
                }
            },
            error => console.log(error)
        )
    }

    onDeleteChannelClicked() {

        this.pokerService.deleteChannel().subscribe(
            data => {

                console.log(data);
                if(data.status === 'F') {

                    this.errorMessage = data.reason;
                } else {

                    this.resultCards = [];
                }
            },
            error => console.log(error)
        )
    }

    onLeaveChannelClicked() {

        this.pokerService.leaveChannel();
        
    }

    onJoinChannelClicked() {

        this.errorMessage =''

        this.pokerService.joinChannel(this.formData.channelName, this.formData.userName).subscribe(
            data => {
                console.log(data);
                if(data.status === 'F') {

                    this.errorMessage = data.reason;
                } else {


                }
            },
            error => console.log(error)
        )
    }
}