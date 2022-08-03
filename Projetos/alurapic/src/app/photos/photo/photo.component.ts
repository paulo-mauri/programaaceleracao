import { Component, Input } from "@angular/core";

const CLOUD = 'http://localhost:3000/imgs/';

@Component({
    selector: 'ap-photo',
    templateUrl: 'photo.component.html',
})
export class PhotoComponent {

    title = 'alurapic';

    private _url = '';

    @Input() description = '';

    @Input() set url(url: string) {
        if(!url.startsWith('data')) {
            this._url = CLOUD + url;
        }
        else {
            this._url = url;
        }
    }

    get url() {
        return this._url;
    }

}
