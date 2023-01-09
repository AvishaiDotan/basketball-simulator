import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { Filter, Player } from 'src/app/models/index';

import { PlayersService } from 'src/app/service/players.service';
import { UserService } from 'src/app/service/user.service';

@Component({
    selector: 'player-list',
    templateUrl: './player-list.component.html',
    styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent {

    constructor(private PlayersService: PlayersService, private UserService: UserService) { }

    @Output() playerSelected = new EventEmitter<Player>()

    playersSub!: Subscription
    playersFilterSub!: Subscription

    players!: Player[]
    page: number = 0;
    pageSize: number = 80;

    positionsData = [
      {pos: 'C', text: 'Centers'},
      {pos: 'PF', text: 'Power Forwards'},
      {pos: 'F', text: 'Forwards'},
      {pos: 'G', text: 'Guards'},
      {pos: 'PG', text: 'Point Guards'},
    ]

    selectedPos: string = 'PG';

    ngOnInit() {
        this.PlayersService.query()

        this.playersSub = this.PlayersService.playersDB$.subscribe((players: Player[]) => {
            this.players = players;       
        })

        this.playersFilterSub = this.PlayersService.playersFilter$.subscribe((filter: Filter) => {
            this.selectedPos = filter.pos
        })

    }

    selectPos(pos: string) {
        this.selectedPos = pos;
        this.PlayersService.setFilter({pos})
    }


    selectPlayer(player: Player) { 
        const pos = player.pos  
        this.UserService.addPlayer(player)

    }

    id(index: number, item: Player){
        return item.id; 
     }
}
