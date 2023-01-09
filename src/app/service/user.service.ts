import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player } from '../models/player';
import { User } from '../models/user';

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

    public usersDB$ = this._userDB$.asObservable()

    public getUser() {
        return this.usersDB$
    }

    addPlayer(player: Player) {
        const user = this._userDB$.getValue()

        if (user.leftCredits >= player.skillLevel && user.players.length < 5) {
            user.players.push(player);
            user.leftCredits -= player.skillLevel
        } else {
            console.log('error');  
        }

        this._userDB$.next(user)   
    }

}
