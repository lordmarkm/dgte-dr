import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GameService } from '@games/core/services';
import { Game } from '@games/shared/models';

@Component({
  selector: 'games-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  public isLoading = false;
  public buyGames1: Game[];
  public buyGames2: Game[];
  private carouselCalled:boolean = false;
  constructor(private router: Router,
              private gameService: GameService) { }

  ngOnInit() {
      this.gameService.frontPageBuy({ 'platformRefCode': 'NS' }).subscribe(buyGames => {
          this.buyGames1 = buyGames.slice(0, 4);
          this.buyGames2 = buyGames.slice(4, 8);
          setTimeout(() => {
              this.doCarousel();
              }, 2000);
      });
  }

  ngAfterViewChecked() {
    this.doCarousel();
  }

  private doCarousel() {
      if (!this.carouselCalled && $(".product-section-content").length) {
          this.carouselCalled = true;
          let elem: any = $('#product-section');
          elem.owlCarousel({
              navigation : true,
              pagination : false,
              items : 4,
              itemsDesktop : [1199, 4],
              itemsDesktopSmall : [979,4],
              itemsTablet :   [768,4],
              itemsTabletSmall : [767,2],
              itemsMobile : [479,1],
              singleItem : false
          });

          let elem2: any = $('#product-section2');
          elem2.owlCarousel({
              navigation : true,
              pagination : false,
              items : 4,
              itemsDesktop : [1199, 4],
              itemsDesktopSmall : [979,4],
              itemsTablet :   [768,4],
              itemsTabletSmall : [767,2],
              itemsMobile : [479,1],
              singleItem : false
          });

          if ($("#banner-owl-demo").length) {
            let bannerOwlElem: any = $("#banner-owl-demo");
            bannerOwlElem.owlCarousel({
              navigation : true,
              pagination : false,
              items : 4,
              itemsDesktop : [1199, 4],
              itemsDesktopSmall : [979, 3],
              itemsTablet : [768, 2],
              itemsMobile : [479, 1],
              slideSpeed : 300,
              paginationSpeed : 400,
              singleItem : false
            });
          }
      }
  }
}
