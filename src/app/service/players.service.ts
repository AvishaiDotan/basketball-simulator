import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom, map, Observable, Subscription } from 'rxjs';

import { Filter, Player } from '../models';

import { UtilService } from './util.service';

@Injectable({
    providedIn: 'root'
})
export class PlayersService {
    constructor(private http: HttpClient) { }

    playersKey: string = 'players';

    private _playersDB$ = new BehaviorSubject([]);
    public playersDB$ = this._playersDB$.asObservable()

    private _playersFilter$ = new BehaviorSubject<Filter>({ pos: 'PG' });
    public playersFilter$ = this._playersFilter$.asObservable()

    public async query() {

        const storedPlayers = UtilService.loadFromStorage(this.playersKey)

        if (!storedPlayers) {
            const playersFullData = await lastValueFrom(this.loadPlayers())
            const formattedData = this.formatData(playersFullData)
            UtilService.saveToStorage(this.playersKey, formattedData)

            this._playersDB$.next(formattedData)
            return
        }

        const filteredData = storedPlayers.filter(({ pos }: any) => pos === this._playersFilter$.getValue().pos)
        this._playersDB$.next(filteredData)   
    }

    public loadPlayers() {
        return this.http.get<any>('https://randomuser.me/api/?results=100')
    }

    private formatData({ results }: any) {
        return results.map((result: any) => {
            return {
                gender: result.gender,
                name: result.name,
                city: result.location.country + ', ' + result.location.city,
                age: (result.dob.age >= 40) ? result.dob.age / 2 : result.dob.age,
                picture: result.picture,
                id: result.id.name + '-' + result.id.value,
                skillLevel: UtilService.getRandomNumber(),
                pos: this.getPos()
            }
        }).filter(({ gender }: any) => gender === 'male')
    }

    public getPos() {
        if (Math.random() > 0.8) return 'C'
        if (Math.random() > 0.6) return 'PF'
        if (Math.random() > 0.4) return 'F'
        if (Math.random() > 0.2) return 'G'
        return 'PG'
    }

    public setFilter(filter: Filter) {
        this._playersFilter$.next(filter)
        this.query()
    }
}
