import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketballCourtComponent } from './cmps/basketball-court/basketball-court.component';
import { PlayerResolver } from './resolvers/player.resolver';
import { EditPlayerComponent } from './views/edit-player/edit-player.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { PlayersIndexComponent } from './views/players-index/players-index.component';

const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
        // resolve: { pet: PetResolver },
        // canActivate: [AuthGuard],
    },
    {
        path: 'players',
        component: PlayersIndexComponent,
        // resolve: { pet: PetResolver },
        // canActivate: [AuthGuard],
        children: [
            {
                path: 'edit',
                component: EditPlayerComponent,

            },
            {
                path: 'edit/:id',
                component: EditPlayerComponent,
                resolve: {player: PlayerResolver}
            },
        ],
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
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
