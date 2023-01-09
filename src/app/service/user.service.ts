import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Player, User } from '../models/index';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private _userDB$ = new BehaviorSubject<User>(
        {
            name: 'Avishai',
            leftCredits: 75 * 5,
            wins: 0,
            losses: 0,
            pointDiffs: 0,
            players: [],
        }
    );
    public userDB$ = this._userDB$.asObservable()

    addPlayer(player: Player) {
        const user = this._userDB$.getValue()

        if (user.leftCredits >= player.skillLevel && user.players.length < 5 && !this.isPosTaken(player.pos, user.players)) {
            user.players.push(player);
            user.leftCredits -= player.skillLevel
        } else if (this.isPosTaken(player.pos, user.players)) {
            const replacedIdx = user.players.findIndex(({pos}) => pos === player.pos)
            user.players[replacedIdx] = player

            user.leftCredits = user.leftCredits - player.skillLevel + user.players[replacedIdx].skillLevel
        } else {
            console.log('error');  
        }

        this._userDB$.next(user)   
    }

    isPosTaken(pos: String, players: Player[]) {
        return players.some(player => player.pos === pos)
    }
}
