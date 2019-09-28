import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dgtedr-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  public isLoading = false;

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

      console.log('product-section.length=' + $('#product-section').length);
      if ($("#product-section").length) {
          $("#product-section").owlCarousel({
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
