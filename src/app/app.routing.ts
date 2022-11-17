import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers';

const routes: Routes = [
    // { path: 'home', component: HomeComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);