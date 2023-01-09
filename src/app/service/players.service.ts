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

    private _playersFilter$ = new BehaviorSubject<Filter>({ pos: 'PG', name: '', isDescending: false });
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
        const filteredPlayers = this.filteredPlayers(storedPlayers)
        
        this._playersDB$.next(filteredPlayers as any)   
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

    private filteredPlayers(players: Player[]) {
        const filter = this._playersFilter$.getValue()

        return players.filter((player: Player) => {
            let isPos, isName

            isPos = (filter.pos) ? (player.pos === filter.pos) : true
            isName = (filter.name) ? ((player.name.first+player.name.last).toLowerCase().includes(filter.name.toLowerCase())) : true 

            return isPos && isName
        }).sort((p1, p2) => {
            return (filter.isDescending) ? p1.skillLevel - p2.skillLevel : p2.skillLevel - p1.skillLevel
        })
    }

    public getPos() {
        if (Math.random() > 0.8) return 'C'
        if (Math.random() > 0.6) return 'PF'
        if (Math.random() > 0.4) return 'F'
        if (Math.random() > 0.2) return 'G'
        return 'PG'
    }

    public setFilter(filter: Filter) {
        const updatedFilter = {...this._playersFilter$.getValue(), ...filter}
        this._playersFilter$.next(updatedFilter)  
        this.query()
    }
}
