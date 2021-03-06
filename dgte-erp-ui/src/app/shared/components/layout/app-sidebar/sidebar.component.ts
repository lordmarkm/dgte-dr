import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from './sidebar.service';
// import { MenusService } from './menus.service';
import { ProjectService } from '@los/core/services';
import { forkJoin, combineLatest, pipe, fromEvent, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  public projects = [];
  public selectedProject;
  menus = [];
  constructor(public sidebarservice: SidebarService,
                private projectService: ProjectService,
                private _router: Router) {
    this.menus = sidebarservice.getMenuList();

    let currentRoute = this._router.url.split('?')[0];
    for (let menu of this.menus) {
      if (menu.routerLink && menu.routerLink === currentRoute) {
        menu.active = true;
      }
      if (menu.submenus) {
        for (let submenu of menu.submenus) {
          if (submenu.routerLink && submenu.routerLink === currentRoute) {
            menu.active = true;
          }
        }
      }
    }
  }

  ngOnInit() {
    combineLatest(
      this.projectService.projects,
      this.projectService.selectedProject
    ).subscribe(([projects, selectedProject]) => {
      this.projects = projects;

      if (selectedProject && selectedProject.code) {
        //Set the selected project in the dropdown
        this.selectedProject = this.projects.find(proj => proj.code === selectedProject.code);

        //Append the project code to URL
        this._router.navigate([], {
          queryParams: {
            projectCode: selectedProject.code
          },
          queryParamsHandling: 'merge'
        });
      }
    });

  }

  selectProject(project) {
      this.projectService.selectProject(project);
  }

  //Sidebar crap
  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  toggle(currentMenu) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  getState(currentMenu) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }

  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }
}