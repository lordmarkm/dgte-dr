import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'dgte-erp-bookkeeping',
  templateUrl: './bookkeeping.component.html'
})
export class BookkeepingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
