import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom, map, Observable, of, Subscription } from 'rxjs';

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

    public getPlayerById(playerId: string): Observable<Player> | Observable<null> {
        const player = this._playersDB$.getValue().find(({ id }) => id === playerId)
        return (player) ? of({ ...player as Player }) : of()
    }

    public getEmptyPlayer(): Player {
        return {
            gender: '',
            id: '',
            name: {
                title: '',
                first: '',
                last: '',
            },
            city: '',
            age: 0,
            picture: {
                large: '',
                medium: '',
                thumbnail: '',
            },
            skillLevel: 0,
            pos: '',
        }
    }

    savePlayer(player: Player) {
        if (player.id) this.put(player)
        else this.post(player)
    }

    put(player: Player) {
        const players = UtilService.loadFromStorage(this.playersKey)

        const playerIdx = players.findIndex(({id}: any) => id === player.id)
        if (playerIdx < 0) return

        players[playerIdx] = player

        UtilService.saveToStorage(this.playersKey, players)
        this._playersDB$.next(players)
    }

    post(player: Player) {
        player.id = UtilService.makeId()


        const pic = `https://randomuser.me/api/portraits/men/1.jpg`
        player.picture = {large: pic, medium: pic, thumbnail: pic}
        player.city = 'Jerusalem'

        const players = UtilService.loadFromStorage(this.playersKey)
        players.push(player)

        UtilService.saveToStorage(this.playersKey, players)
        this._playersDB$.next(players)
    }

    public loadPlayers() {
        return this.http.get<any>('https://randomuser.me/api/?results=1000')
    }

    private formatData({ results }: any) {
        return results.map((result: any) => {
            return {
                gender: result.gender,
                name: result.name,
                city: result.location.country + ', ' + result.location.city,
                age: (result.dob.age >= 40) ? result.dob.age / 2 : result.dob.age,
                picture: result.picture,
                id: UtilService.makeId(),
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
            isName = (filter.name) ? ((player.name.first + player.name.last).toLowerCase().includes(filter.name.toLowerCase())) : true

            return isPos && isName
        }).sort((p1, p2) => {
            return (filter.isDescending) ? p1.skillLevel - p2.skillLevel : p2.skillLevel - p1.skillLevel
        })
    }

    private getPos() {
        const positions = ['C', 'PF', 'F', 'G', 'PG'];
        return positions[Math.floor(Math.random() * positions.length)];
    }

    public setFilter(filter: Filter) {
        const updatedFilter = { ...this._playersFilter$.getValue(), ...filter }
        this._playersFilter$.next(updatedFilter)
        this.query()
    }
}
