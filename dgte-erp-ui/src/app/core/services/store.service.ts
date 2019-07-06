import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AdminService } from './admin.service';

import {
  AppState, CompanyLoanSettings, LoanDetails, EmploymentDetails, PersonalDetails, CompleteAddress,
  UploadDocumentAttachmentsDetails, AdminDetails, AdminUserInfo, Company, CompleteLoanDetails } from '@los/shared/models';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private appState = new AppState();
  private states = [
    { name: 'companyLoanSettings', class: CompanyLoanSettings },
    { name: 'loanDetails', class: LoanDetails },
    { name: 'completeLoanDetails', class: CompleteLoanDetails },
    { name: 'borrowerEmploymentDetails', class: EmploymentDetails },
    { name: 'coMakerEmploymentDetails', class: EmploymentDetails },
    { name: 'borrowerPersonalDetails', class: PersonalDetails },
    { name: 'coMakerPersonalDetails', class: PersonalDetails },
    { name: 'borrowerCompleteAddress', class: CompleteAddress },
    { name: 'coMakerCompleteAddress', class: CompleteAddress },
    { name: 'uploadDocumentAttachmentsDetails', class: UploadDocumentAttachmentsDetails },
    { name: 'adminDetails', class: AdminDetails },
    { name: 'adminUserInfo', class: AdminUserInfo },
    { name: 'selectedCompany', class: Company },
  ];

  private $appState: BehaviorSubject<AppState> = new BehaviorSubject<AppState>(null);

  constructor(private adminService: AdminService) {
    this.states.forEach(state => {
      this[state.name] = new state.class();
      this.appState[state.name] = this[state.name];
      this[`$${state.name}`] = new BehaviorSubject(null);
    });

    /* tslint:disable:no-string-literal */
    // TODO add checker for dev env
    // const appState = JSON.parse(localStorage.getItem('APP_STATE'));
    // if (appState) {
    //   this.appState = appState;
    //   this.states.forEach(state => {
    //     this.set(state.name, appState[state.name]);
    //   });
    // }
    // // for debugging purpose - expose app state
    // this.getAppState().subscribe(appState => {
    //   localStorage.setItem('APP_STATE', JSON.stringify(appState));
    //   window['APP_STATE'] = appState;
    // });
    /* tslint:enable:no-string-literal */
  }

  /**
   * Retrieve and set all default state values
   * @return Observable
   */
  public initState() {
    return forkJoin(
      this.adminService.getTermsAndConditions(),
      this.adminService.getDataPrivacy(),
      this.adminService.getProvinces(),
      this.adminService.getGovIds(),
      this.adminService.getLoanPurpose(),
      this.adminService.getPlacesOfBirth(),
      this.adminService.getGenders(),
      this.adminService.getCivilStatuses(),
      this.adminService.getHomeOwnerships()
    ).pipe(
      tap(([termsAndConditions, dataPrivacy, provinces, govIds, loanPurposes, placesOfBirth, genders, civilStatuses, homeOwnerships]) => {
        const adminDetails = new AdminDetails();
        adminDetails.termsAndConditions = termsAndConditions.template;
        adminDetails.dataPrivacy = dataPrivacy.template;
        adminDetails.provinces = provinces.results;
        adminDetails.govIds = govIds.results;
        adminDetails.loanPurposes = loanPurposes.results;
        adminDetails.placesOfBirth = placesOfBirth.results;
        adminDetails.genders = genders;
        adminDetails.civilStatuses = civilStatuses;
        adminDetails.homeOwnerships = homeOwnerships;

        this.set('adminDetails', adminDetails);
      })
    );
  }

  public getAppState(): Observable<AppState> {
    return this.$appState.asObservable();
  }

  public get(stateName: string) {
    return this[`$${stateName}`].asObservable();
  }

  public set(stateName: string, state) {
    this[stateName] = state;
    this.appState[stateName] = state;

    this[`$${stateName}`].next(this[stateName]);
    this.$appState.next(this.appState);
  }
}
