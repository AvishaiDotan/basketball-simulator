import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../models';
import { UserService } from '../service/user.service';

@Injectable({
    providedIn: 'root'
})
export class UserResolver implements Resolve<User> {
    constructor(private userService: UserService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
        return this.userService.userDB$;
    }
}
