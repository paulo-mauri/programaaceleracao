import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Photo } from '../../photo/photo';

@Component({
  selector: 'ap-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnChanges {

    @Input()
    photos: Photo[] = [];
    rows: any[] = [];

    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes['photos'])
            this.rows = this.groupColumns(this.photos);
    }

    groupColumns(photos: Photo[]) {
        const newRows: any = [];

        for(let index = 0; index < photos.length; index+=3) {

            /**
             * Returns a copy of a section of an array.
             * For both start and end, a negative index can be used to indicate an offset from the end of the array.
             * For example, -2 refers to the second to last element of the array.
             * @param start The beginning index of the specified portion of the array.
             * If start is undefined, then the slice begins at index 0.
             * @param end The end index of the specified portion of the array. This is exclusive of the element at the index 'end'.
             * If end is undefined, then the slice extends to the end of the array.
             */
            /*
            O primeiro parâmetro de slice é a posição inclusive na qual os elementos serão considerados. O segundo é a posição final (não inclusiva).
            */
            newRows.push(photos.slice(index, index + 3));
        }

        return newRows;
    }

}

