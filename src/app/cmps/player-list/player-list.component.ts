import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { Filter, Player } from 'src/app/models/index';

import { PlayersService } from 'src/app/service/players.service';
import { UserService } from 'src/app/service/user.service';

@Component({
    selector: 'player-list',
    templateUrl: './player-list.component.html',
    styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit, OnDestroy {

    constructor(
        private PlayersService: PlayersService, 
        private UserService: UserService) 
    { }

    @Output() playerSelected = new EventEmitter<Player>()

    playersSub!: Subscription
    playersFilterSub!: Subscription
    leftCreditsSub! : Subscription

    players!: Player[]
    page: number = 0;
    pageSize: number = 80;
    filter!: Filter
    leftCredits!: number

    positionsData = [
      {pos: 'C', text: 'Centers'},
      {pos: 'PF', text: 'Power Forwards'},
      {pos: 'F', text: 'Forwards'},
      {pos: 'G', text: 'Guards'},
      {pos: 'PG', text: 'Point Guards'},
    ]

    
    ngOnInit() {
        this.PlayersService.query()

        this.playersSub = this.PlayersService.playersDB$.subscribe((players: Player[]) => {
            this.players = players;
        })

        this.playersFilterSub = this.PlayersService.playersFilter$.subscribe((filter: Filter) => {
            this.filter = filter
        })

        this.leftCreditsSub = this.UserService.userDB$.subscribe(({leftCredits, players}) => {
            this.leftCredits = leftCredits
        })

    }

    ngOnDestroy() {
        this.playersSub.unsubscribe()
        this.playersFilterSub.unsubscribe()
        this.leftCreditsSub.unsubscribe()
    }

    setFilter(filterType: String, content?: any) {
        if (filterType === 'pos') this.PlayersService.setFilter({pos: content} as Filter)
        if (filterType === 'isDescending') this.PlayersService.setFilter({isDescending: !this.filter.isDescending} as Filter)
        if (filterType === 'name') this.PlayersService.setFilter({name: this.filter.name} as Filter)
    }

    selectPlayer(player: Player) { 
        const pos = player.pos  
        this.UserService.addPlayer(player)
    }

    id(index: number, item: Player){
        return item.id; 
    }
}
