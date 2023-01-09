import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from 'src/app/models/player';

@Component({
    selector: 'player-preview',
    templateUrl: './player-preview.component.html',
    styleUrls: ['./player-preview.component.scss']
})
export class PlayerPreviewComponent {
    @Input() player!: Player;
    @Output() playerSelected = new EventEmitter<Player>();

    selectPlayer() {
        this.playerSelected.emit(this.player);
    }
}
