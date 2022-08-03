import { switchMap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title) {

    }

    /*
        this.router.events

        Aqui você está ouvindo os eventos que o roteador pode disparar, inicio de navegação, alteração de rota, fim de navegação, etc...

        .pipe(filter(event => event instanceof NavigationEnd))

        Aqui a gente verifica se o evento foi o fim da navegação, ou seja, se a navegação terminou de ocorrer e a rota foi renderizada.

        .pipe(map(() => this.activatedRoute))

        Aqui estamos pegando a rota ativa que acabou de terminar de ser navegada.

        .pipe(map(route => {
        Aqui pegamos a rota ativa e vamos aplicar alguma alteração nela.

        while(route.firstChild) route = route.firstChild;

        Aqui estamos navegando até a declaração da nossa rota, ou seja, precisamos sair do componente atual e ir até a definição das nossas
            rotas onde informamos o title, path, component, etc...

        return route;

        Aqui pegamos a definição da rota atual e retornamos no map, para que ela possa ser acessível no próximo pipe.

        .pipe(switchMap(route => route.data))

        Aqui pegamos a definição da rota e acessamos a propriedade data dela e com o switchMap retornamos um novo Observable.

        subscribe(event => this.titleService.setTitle(event.title))

        Aqui fazemos o subscribe no novo Observable retornado pelo switchMap anterior, recebemos o atributo data que agora seria o event e pegamos a
            propriedade title dele, que seria o que informamos na definição da rota, exemplo::

        data: {
            title: 'Sign up'
        }
    */

    ngOnInit(): void {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .pipe(map(() => this.activatedRoute ))
            .pipe(map(route => {
                while(route.firstChild) route = route.firstChild;
                return route;
            }))
            .pipe(switchMap(route => route.data))
            .subscribe(event => this.titleService.setTitle(event['title']));
    }
}
