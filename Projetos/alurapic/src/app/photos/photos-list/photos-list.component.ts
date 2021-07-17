import { Photo } from './../photo/photo';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.scss']
})
export class PhotosListComponent implements OnInit {

  photos: Photo[] = [];
  filter: string = '';

  constructor(private photoService: PhotoService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const userName = this.activatedRoute.snapshot.params.userName;
    this.photoService.listFromUser(userName).subscribe(
      (photos) => (this.photos = photos),
      (error) => console.log(error)
    );
  }

  onKeyUp(target : any) {
    if(target instanceof EventTarget) {
      var elemento = target as HTMLInputElement;
      this.filter = elemento.value;
    }
  }
}
