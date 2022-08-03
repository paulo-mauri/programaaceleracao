import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

    photos: Photo[] = [];
    filter: string = '';

    hasMore: boolean = true;
    currentPage: number = 1;
    userName: string = '';

    constructor(private photoService: PhotoService,
                private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        // const userName = this.activatedRoute.snapshot.params['userName']; // fotografia do momento da rota , com o variavel declarada no app.Routing.module.ts -- { path: 'user/:userName', component: PhotoListComponent },
        // this.photoService
        //     .listFromUser(userName)
        //     .subscribe(photos => {
        //         this.photos = photos
        //     });

        this.activatedRoute.params.subscribe(params => {
            this.userName = params['userName'];
            this.photos = this.activatedRoute.snapshot.data['photos'];
        })

    }

    load() {
        this.photoService
            .listFromUserPaginated(this.userName, ++this.currentPage)
            .subscribe( photos => {
                this.filter = '';
                this.photos = this.photos.concat(photos);
                if(!photos.length) this.hasMore = false;
            })
    }
}
