import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
    }
}