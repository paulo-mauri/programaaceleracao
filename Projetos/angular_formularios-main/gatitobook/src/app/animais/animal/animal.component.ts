import { environment } from './../../../environments/environment.prod';
import { Component, Input, OnInit } from '@angular/core';

const API = environment.API;

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {

  urlOriginal: string = '';

  @Input()
  descricao: string = '';

  @Input()
  set url(url: string) {
    if(url.startsWith('data')) {
      this.urlOriginal = url;
    } else {
      this.urlOriginal = `${API}/imgs/${url}`;
    }
  }

  get url(): string{
    return this.urlOriginal;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
