import { Component, OnInit } from '@angular/core';
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

  constructor(private storeService: StoreService,
          private projectService: ProjectService) { }

  ngOnInit() {
      this.projectService.projects.subscribe((projects: any[]) => {
          this.projects = projects;
          if (projects.length) {
              this.selectedProject = projects[0];
          }
      });
  }

  selectProject(project) {
      this.projectService.selectProject(project);
  }
}
