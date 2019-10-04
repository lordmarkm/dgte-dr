import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@games/core/services';
import { AngularFireAuth } from "@angular/fire/auth";
import { ShoppingCartService } from '@games/core/services';

@Component({
  selector: 'dgte-erp-games-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  public displayName: String;
  public displayImage: String;
  public shoppingCart: any;
  private shoppingCartServiceSub;
  private authStateSub;

  constructor(private authService: AuthService,
          public afAuth: AngularFireAuth,
          private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.doJqueryStuff();
    this.authStateSub = this.afAuth.authState.subscribe(auth => {
        console.log(auth);
        if (auth) {
            this.displayName = auth['displayName'];
            this.displayImage = auth['photoURL'];
        } else {
            delete this.displayName;
            delete this.displayImage;
        }
    });
    this.shoppingCartServiceSub = this.shoppingCartService.shoppingCart.subscribe(shoppingCart => {
      this.shoppingCart = shoppingCart;
    });
  }

  ngOnDestroy() {
    this.authStateSub.unsubscribe();
    this.shoppingCartServiceSub.unsubscribe();
  }

  public firebaseLogin() {
      this.authService.FacebookAuth();
  }

  public firebaseLogout() {
      this.authService.logout();
  }

  public removeItem(index, mode) {
    this.shoppingCartService.removeItem(index, mode);
  }

  private doJqueryStuff() {
    console.log('main-menu=' + $('.main-menu').length);
    $('.main-menu').on('click', function() {
      $('.menu-links').slideToggle();
    });
    $('.mmenu').on('click', function() {
      $(this).next().slideToggle();
    });
    $('body').on('click', function() {
      
      $('.item-block').slideUp();
    });
    $('.item-block').on('click',function(e){
      e.stopPropagation();
    });
    $('body').on('click', '.open-cart', function(e) {
      e.stopPropagation();
      $('.item-block').slideToggle();
    });
    $('.menu-section').on('click', function() {
      $(this).find('.fa').toggleClass('fa-bars').toggleClass('fa-times');
      $('.navigation').slideToggle();
    });
    if (jQuery("#countdown").length) {
      //==========countdown=======
      let countdown: any = jQuery("#countdown");
      countdown.countdown({
        //Time set = Year, Month,Date
        until : new Date(2015, 12, 19)
      });
    }
  }
}
