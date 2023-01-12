import { Component, OnDestroy, OnInit } from '@angular/core';
import { Player, User } from 'src/app/models';

import { Subscription } from 'rxjs';

import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayersService } from 'src/app/service/players.service';

@Component({
    selector: 'line-up',
    templateUrl: './line-up.component.html',
    styleUrls: ['./line-up.component.scss']
})
export class LineUpComponent implements OnInit, OnDestroy {


    constructor(
        private userService: UserService,
        private playersService: PlayersService,
        private router: Router,
        private route: ActivatedRoute,
    ) {}

    playersSub!: Subscription
    

    lineUp: Player[] = [];
    isGameReady: boolean = false;
    computerLineup: Player[] = []


    ngOnInit(): void {
        this.playersSub = this.userService.userDB$.subscribe((user) => {
            this.lineUp = this.orderLineUp(user.players)
            if (user.players.length === 5) {
                this.isGameReady = true 
            } 
        })
             
    }

    ngOnDestroy(): void {
        this.playersSub.unsubscribe()
    }

    orderLineUp(lineUp: Player[]) {
        const orderedLineUp: Player[] = []
        lineUp.forEach((player) => {
            
            if (player.pos === 'PG') orderedLineUp[0] = player
            if (player.pos === 'G') orderedLineUp[1] = player
            if (player.pos === 'F') orderedLineUp[2] = player
            if (player.pos === 'PF') orderedLineUp[3] = player
            if (player.pos === 'C') orderedLineUp[4] = player
             
        })
        return orderedLineUp
    }

    editPlayer(id: string) {
        this.router.navigate(['players/edit/', id])
    }

    removePlayerFromLineup(playerId: string) {
        this.userService.removePlayerFromLineup(playerId)
    }

    startGame() {
        this.computerLineup = this.playersService.getRandomLineup() 
    }
}
