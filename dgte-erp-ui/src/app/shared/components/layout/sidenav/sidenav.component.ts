import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, combineLatest } from 'rxjs';

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

  constructor(private projectService: ProjectService,
          private _router: Router) { }

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
}
