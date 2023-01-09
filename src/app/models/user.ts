import { Player } from "./player";

export interface User {
    name: string;
    leftCredits: number;
    wins: number;
    losses: number;
    pointDiffs: number;
    players: Player[];
}
