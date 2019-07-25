import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, combineLatest, pipe, fromEvent, Observable } from 'rxjs';
import { debounceTime, map, startWith,  } from 'rxjs/operators';

import {AdminUserInfo} from "@los/shared/models";
import {StoreService} from "@los/core/services";
import { ProjectService } from '@los/core/services';

@Component({
  selector: 'erp-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class ErpSidenavComponent implements OnInit {

  public projects = [];
  public selectedProject;
  public smallScreen: boolean;
  private isScreenSmall$: Observable<boolean>;

  constructor(private projectService: ProjectService,
          private _router: Router) { }

  ngOnInit() {
      //Watch the project
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

    // Checks if screen size is less than 1024 pixels
    const checkScreenSize = () => document.body.offsetWidth < 1024;
  
    // Create observable from window resize event throttled so only fires every 500ms
    const screenSizeChanged$ = fromEvent(window, 'resize').pipe(debounceTime(500)).pipe(map(checkScreenSize));
  
    // Start off with the initial value use the isScreenSmall$ | async in the
    // view to get both the original value and the new value after resize.
    this.isScreenSmall$ = screenSizeChanged$.pipe(startWith(checkScreenSize()));
    this.isScreenSmall$.subscribe(s => {
      this.smallScreen = s;
    });
  }

  selectProject(project) {
      this.projectService.selectProject(project);
  }
}
