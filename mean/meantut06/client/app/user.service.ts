import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

@Injectable()

export class UserService {

    constructor(private http: Http) {
        
    }

    register(user) {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('http://localhost:3000/users/register', 
            JSON.stringify({name:user.name,password:user.password}), options)
            .map( response => response.json())
    }
}