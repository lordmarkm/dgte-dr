import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SidebarService } from '@los/shared/components/layout/app-sidebar/sidebar.service';

@Component({
  selector: 'dgte-erp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

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
