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
  }

}
