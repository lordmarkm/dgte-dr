import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GamerService } from '@games/shared/services';
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'games-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit {
  public isLoading = false;
  public userProfile;
  public displayName: String;
  public displayImage: String;

  constructor(private router: Router, private gamerService: GamerService,
    public afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(auth => {
        console.log(auth);
        if (auth) {
            this.displayName = auth['displayName'];
            this.displayImage = auth['photoURL'];
        } else {
            delete this.displayName;
            delete this.displayImage;
        }
    });
  }

}
