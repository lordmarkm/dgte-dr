import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '@rent/shared/services';

@Component({
  selector: 'app-rent-payment-add',
  templateUrl: './rent-payment-add.component.html',
  styleUrls: ['./rent-payment-add.component.scss']
})
export class RentPaymentAddComponent {

    public projects;

  constructor(private projectService: ProjectService,
            private router: Router) { }

  ngOnInit() {
    this.projectService.getProjects({}).subscribe(projects => {
        this.projects = projects;
    });
  }

}
