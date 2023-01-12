import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    playerToEdit!: Player

    constructor(
        private playersService: PlayersService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private router: Router,
    ) {}


    

    ngOnInit(): void {
        this.playerSub = this.route.data.subscribe(({ player }) => {
            this.playerToEdit = (player) ? player : this.playersService.getEmptyPlayer() as Player 

            this.form = this.formBuilder.group({
                gender: this.playerToEdit.gender,
                name: this.formBuilder.group({...this.playerToEdit.name}),
                city: this.playerToEdit.city,
                age: this.playerToEdit.age,
                picture: this.formBuilder.group({...this.playerToEdit.picture}),
                id: this.playerToEdit.id,
                skillLevel: this.playerToEdit.skillLevel,
                pos: this.playerToEdit.pos
            })


        })
    }

    savePlayer(player: any) {
        this.playerToEdit = {...this.playerToEdit, ...player}
        console.log(this.playerToEdit);
        
        this.playersService.savePlayer(this.playerToEdit)
        this.router.navigateByUrl('players')
    }

    ngOnDestroy(): void {
        this.playerSub.unsubscribe()
    }


}
