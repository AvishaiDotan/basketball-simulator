import { Component, OnDestroy, OnInit } from '@angular/core';
import { Player } from 'src/app/models';

import { Subscription } from 'rxjs';

import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'line-up',
    templateUrl: './line-up.component.html',
    styleUrls: ['./line-up.component.scss']
})
export class LineUpComponent implements OnInit, OnDestroy {


    constructor(
        private userService: UserService,
        private router: Router
        
    ) {}

    playersSub!: Subscription

    lineUp: Player[] = [];


    ngOnInit(): void {
        this.playersSub = this.userService.userDB$.subscribe((user) => {
            this.lineUp = this.orderLineUp(user.players)

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


}
