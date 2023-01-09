import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketballCourtComponent } from './cmps/basketball-court/basketball-court.component';
import { PlayersIndexComponent } from './views/players-index/players-index.component';

const routes: Routes = [
    {
        path: 'players',
        component: PlayersIndexComponent,
        // resolve: { pet: PetResolver },
        // canActivate: [AuthGuard],
    },
    {
        path: 'court',
        component: BasketballCourtComponent,
        // resolve: { pet: PetResolver },
        // canActivate: [AuthGuard],
    },

    // { path: 'about', component: AboutComponent },
    // {
    //     path: '', component: PetIndexComponent, children: [
    //         { path: 'edit/:id', component: PetEditComponent, resolve: { pet: PetResolver } },
    //         { path: 'edit', component: PetEditComponent }
    //     ]
    // },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
