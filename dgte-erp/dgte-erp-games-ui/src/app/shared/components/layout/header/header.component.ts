import { Component, OnInit } from '@angular/core';
import { AuthService } from '@games/core/services';

@Component({
  selector: 'dgte-erp-games-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.doJqueryStuff();
  }

  public firebaseLogin() {
      this.authService.FacebookAuth();
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
