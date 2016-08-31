import { Routes, RouterModule} from '@angular/router';

import { Login } from './login';
import { Register } from './register';
import { Landing } from './landing';

const appRoutes: Routes = [

    {
        path: 'login',
        component: Login
    },
    {
        path: 'register',
        component: Register
    },
    {
        path: 'landing',
        component: Landing
    },

];

export const routing= RouterModule.forRoot(appRoutes);