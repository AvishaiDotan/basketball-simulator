import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/models';
import { PlayersService } from 'src/app/service/players.service';

@Component({
    selector: 'edit-player',
    templateUrl: './edit-player.component.html',
    styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit, OnDestroy {
    
    form!: FormGroup
    playerSub!: Subscription

    constructor(
        private playersService: PlayersService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder
    ) {}


    

    ngOnInit(): void {
        this.playerSub = this.route.data.subscribe(({ player }) => {
            const PlayerToEdit = (player) ? player : this.playersService.getEmptyPlayer() as Player 
            this.form = this.formBuilder.group({
                gender: PlayerToEdit.gender,
                name: this.formBuilder.group({...PlayerToEdit.name}),
                city: PlayerToEdit.city,
                age: PlayerToEdit.age,
                picture: this.formBuilder.group({...PlayerToEdit.picture}),
                id: PlayerToEdit.id,
                skillLevel: PlayerToEdit.skillLevel,
                pos: PlayerToEdit.pos
            })
        })
    }


    ngOnDestroy(): void {
        this.playerSub.unsubscribe()
    }
}
