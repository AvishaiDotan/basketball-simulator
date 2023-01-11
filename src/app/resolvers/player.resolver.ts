import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';

import { Observable, of } from 'rxjs';
import { Player } from '../models';
import { PlayersService } from '../service/players.service';

@Injectable({
    providedIn: 'root'
})
export class PlayerResolver implements Resolve<Player>{
    constructor (private playersService: PlayersService){}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Player>{
        const playerId = route.params['id']
        return this.playersService.getPlayerById(playerId) as Observable<Player>
    }
}
