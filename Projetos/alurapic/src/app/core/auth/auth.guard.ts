import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../user/user.service';

@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate {

    /*
    O guarda de rotas serve para darmos consistência para nossa aplicação,
        liberando acesso apenas para as rotas que fazem sentido para nosso usuário.
    */
    constructor(private userService: UserService,
                private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        if(!this.userService.isLogged()) {
            this.router.navigate(
                [''],
                {
                    queryParams: {
                        fromUrl: state.url
                    }
                }
            );
            return false;
        }
        return true;
    }
}
