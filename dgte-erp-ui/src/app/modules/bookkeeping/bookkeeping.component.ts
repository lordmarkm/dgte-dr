import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SidebarService } from '@los/shared/components/layout/app-sidebar/sidebar.service';

@Component({
  selector: 'dgte-erp-bookkeeping',
  templateUrl: './bookkeeping.component.html',
  styleUrls: ['./bookkeeping.component.scss']
})
export class BookkeepingComponent implements OnInit {

  constructor(private router: Router,
              private sidebarService: SidebarService) { }

  ngOnInit() {
  }

  getSideBarState() {
    return this.sidebarService.getSidebarState();
  }
  toggleSidebar() {
    this.sidebarService.setSidebarState(!this.sidebarService.getSidebarState());
  }

}
