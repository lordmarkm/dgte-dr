import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectService, ApartmentService, LeaseService, RentPaymentService } from '@rent/shared/services';

@Component({
  selector: 'app-rent-payment-add',
  templateUrl: './rent-payment-add.component.html',
  styleUrls: ['./rent-payment-add.component.scss']
})
export class RentPaymentAddComponent {

  public projects = [];
  public apartments = [];
  public leases = [];
  public payment = {
      projectId: '',
      apartmentId: '',
      leaseId: '',
      paymentDate: new Date()
  };

  constructor(private projectService: ProjectService,
            private apartmentService: ApartmentService,
            private leaseService: LeaseService,
            private rentPaymentService: RentPaymentService,
            private router: Router,
            private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.projectService.getProjects({}).subscribe(projects => {
        this.projects = projects;
        if (projects.length) {
            this.payment.projectId = projects[0].id;
        }
        this.getApartments();
    });
  }

  public getApartments = function () {
      if (!this.payment.projectId) {
          return;
      }
      delete this.payment.apartmentId;
      delete this.payment.leaseId;
      this.apartmentService.getApartments(this.payment.projectId).subscribe(apts => {
          this.apartments = apts;
          if (apts.length === 1) {
              this.payment.apartmentId = apts[0].id;
          }
          this.getLeases();
      });
  }

  public getLeases = function () {
      if (!this.payment.apartmentId) {
          return;
      }
      delete this.payment.leaseId;
      this.leaseService.getLeases(this.payment.apartmentId).subscribe(leases => {
          this.leases = leases;
          if (leases.length === 1) {
              this.payment.leaseId = leases[0].id;
          }
      });
  }

  public submit = function () {
      this.rentPaymentService.save(this.payment).subscribe(payment => {
          this.snackBar.open('Payment saved');
      });
  }

}
