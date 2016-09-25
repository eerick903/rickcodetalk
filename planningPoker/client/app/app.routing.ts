import { Routes, RouterModule} from '@angular/router';

import { Poker } from './poker';


const appRoutes: Routes = [

    {
        path: '',
        component: Poker
    },


];

export const routing= RouterModule.forRoot(appRoutes);