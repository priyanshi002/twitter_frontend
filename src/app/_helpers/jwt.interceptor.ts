import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '@app/_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    token: string;
    currentUser: any;
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.currentUser = localStorage.getItem('currentUser');
            if(this.currentUser != null){
            request = request.clone({
                setHeaders: {
                    Authorization: `${this.currentUser}`
                }
            });
        }

        return next.handle(request);
    }
}