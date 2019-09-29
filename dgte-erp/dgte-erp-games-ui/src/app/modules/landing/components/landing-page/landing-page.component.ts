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
  public buyGames: Game[];

  constructor(private router: Router,
              private gameService: GameService) { }

  ngOnInit() {
      this.gameService.frontPageBuy({ 'platformRefCode': 'NS' }).subscribe(buyGames => {
          this.buyGames = buyGames;
          setTimeout(() => {
              this.doCarousel();
              }, 2000);
      });
  }

  ngAfterViewChecked() {
      console.log('After view checked');
  }

  private doCarousel() {
      if ($("#product-section").length) {
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
      }
  }
}
