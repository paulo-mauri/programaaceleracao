import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { UserService } from './../user/user.service';
import { User } from '../user/user';

@Component({
    selector: 'ap-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    user$: Observable<User>;

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.user$  = this.userService.getUser();
    }

}
