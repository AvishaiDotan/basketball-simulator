import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './root-app/app.component';
import { PlayersService } from './service/players.service';
import { HttpClientModule } from '@angular/common/http';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { PlayerListComponent } from './cmps/player-list/player-list.component';
import { PlayerPreviewComponent } from './cmps/player-preview/player-preview.component';
import { BasketballCourtComponent } from './cmps/basketball-court/basketball-court.component';
import { PlayersIndexComponent } from './views/players-index/players-index.component';
import { LineUpComponent } from './cmps/line-up/line-up.component';



@NgModule({
    declarations: [
        AppComponent,
        AppHeaderComponent,
        PlayerListComponent,
        PlayerPreviewComponent,
        BasketballCourtComponent,
        PlayersIndexComponent,
        LineUpComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
