import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '@rent/shared/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public projects;

  constructor(private projectService: ProjectService,
    private router: Router) { }

  ngOnInit() {
    this.projectService.getProjects({}).subscribe(projects => {
        this.projects = projects;
    });
  }

}
