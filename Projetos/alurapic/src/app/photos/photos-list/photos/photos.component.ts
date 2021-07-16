import { Photo } from './../../photo/photo';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ap-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnChanges {
  @Input() photos: Photo[] = [];
  rows: any[] = [];
  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.photos) this.rows = this.groupColumns(this.photos);
  }

  groupColumns(photo: Photo[]) {
    const newRows = [];

    for (let index = 0; index < this.photos.length; index += 3) {
      newRows.push(this.photos.slice(index, index + 3));
    }

    // Exemplo de slice(inicio[,fim]);
    // const idades = [22, 18, 17, 25, 38, 42];
    // for(let i = 0; i < idades.length; i++) {
    //   console.log(idades.slice(i, i + 2)); // qual a saída?
    // }

    return newRows;
  }
}
