import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()

export class UserService {

    constructor(private http: Http, private router: Router) {
        
    }

    register(user) {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('http://localhost:3000/users/register', 
            JSON.stringify({name:user.name,password:user.password}), options)
            .map( response => response.json())
    }

    login(user) {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        return this.http.post('http://localhost:3000/users/login', 
            JSON.stringify({name:user.name,password:user.password}), options)
            .map( response => {
                
                var respJson = response.json();

                if(respJson.status && respJson.status === 'S') {
                    this.loginSuccess;
                }
                return respJson;

            });
    }

    private loginSuccess() {

        this.router.navigateByUrl('landing');
    }
}