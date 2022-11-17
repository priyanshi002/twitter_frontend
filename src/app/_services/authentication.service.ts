import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import decode from 'jwt-decode';

import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    constructor(private http: HttpClient) {}
}

function tokenNotExpired(token: string): boolean {
    throw new Error('Function not implemented.');
}
