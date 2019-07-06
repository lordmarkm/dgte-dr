import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from '@env/environment';
import {
  CompanyLoanSettings,
  TextTemplate,
  Company,
  DataTableResp,
  Reference,
  NewDataTableResp
} from '@los/shared/models';
import {CompanySearch} from "@los/shared/models/company-search";

@Injectable()
export class AdminService {
  private serviceUrl = 'admin';
  private urls = {
    GET_ALL_COMPANY: `${environment.apiUrl}/${this.serviceUrl}/company/all`,
    GET_COMPANY: `${environment.apiUrl}/${this.serviceUrl}/company`,
    GET_COMPANY_LOAN_SETTINGS: `${environment.apiUrl}/${this.serviceUrl}/company-loan-settings`,
    GET_TERMS_AND_CONDITIONS: `${environment.apiUrl}/${this.serviceUrl}/text-template/terms-and-conditions`,
    GET_DATA_PRIVACY: `${environment.apiUrl}/${this.serviceUrl}/text-template/data-privacy`,
    GET_PROVINCES: `${environment.apiUrl}/${this.serviceUrl}/address/provinces`,
    GET_CITIES: `${environment.apiUrl}/${this.serviceUrl}/address/cities`,
    GET_ZIP_CODES: `${environment.apiUrl}/${this.serviceUrl}/address/zipcodes`,
    GET_GOV_IDS: `${environment.apiUrl}/${this.serviceUrl}/government-id/find-all`,
    GET_LOAN_PURPOSE: `${environment.apiUrl}/${this.serviceUrl}/loan-purposes/find-all`,
    GET_PLACES_OF_BIRTH: `${environment.apiUrl}/${this.serviceUrl}/place-of-birth/find-all`,
    GET_GENDERS: `${environment.apiUrl}/${this.serviceUrl}/references/gender`,
    GET_CIVIL_STATUSES: `${environment.apiUrl}/${this.serviceUrl}/references/civil-status`,
    GET_HOME_OWNERSHIPS: `${environment.apiUrl}/${this.serviceUrl}/references/home-ownership`,
    GET_BRANCHES: `${environment.apiUrl}/${this.serviceUrl}/branches/find-all`,
  };

  constructor(private httpClient: HttpClient) { }

  public getCompany(params): Observable<Company> {
    return this.httpClient.get<Company>(this.urls.GET_COMPANY, { params });
  }

  public getAllCompany(companySearch: CompanySearch): Observable<NewDataTableResp> {
    return this.httpClient.get<NewDataTableResp>(this.urls.GET_ALL_COMPANY, { params: companySearch.toParams()});
  }

  public getCompanyLoanSettings(params): Observable<CompanyLoanSettings> {
    return this.httpClient.get<CompanyLoanSettings>(this.urls.GET_COMPANY_LOAN_SETTINGS, { params });
  }

  public getTermsAndConditions(): Observable<TextTemplate> {
    return this.httpClient.get<TextTemplate>(this.urls.GET_TERMS_AND_CONDITIONS);
  }

  public getDataPrivacy(): Observable<TextTemplate> {
    return this.httpClient.get<TextTemplate>(this.urls.GET_DATA_PRIVACY);
  }

  public getProvinces(): Observable<DataTableResp> {
    return this.httpClient.get<DataTableResp>(this.urls.GET_PROVINCES, { params: { size: '999999' }});
  }

  public getCities(stateCode: string): Observable<DataTableResp> {
    return this.httpClient.get<DataTableResp>(this.urls.GET_CITIES, { params: { stateCode, size: '999999' }});
  }

  public getZipCodes(cityCode: string): Observable<DataTableResp> {
    return this.httpClient.get<DataTableResp>(this.urls.GET_ZIP_CODES, { params: { cityCode, size: '999999' }});
  }

  public getGovIds(): Observable<DataTableResp> {
    return this.httpClient.get<DataTableResp>(this.urls.GET_GOV_IDS, { params: { size: '999999' }});
  }

  public getLoanPurpose(): Observable<DataTableResp> {
    return this.httpClient.get<DataTableResp>(this.urls.GET_LOAN_PURPOSE, { params: { size: '999999' }});
  }

  public getPlacesOfBirth(): Observable<DataTableResp> {
    return this.httpClient.get<DataTableResp>(this.urls.GET_PLACES_OF_BIRTH, { params: { size: '999999' }});
  }

  public getGenders(): Observable<Reference[]> {
    return this.httpClient.get<Reference[]>(this.urls.GET_GENDERS);
  }

  public getCivilStatuses(): Observable<Reference[]> {
    return this.httpClient.get<Reference[]>(this.urls.GET_CIVIL_STATUSES);
  }

  public getHomeOwnerships(): Observable<Reference[]> {
    return this.httpClient.get<Reference[]>(this.urls.GET_HOME_OWNERSHIPS);
  }

  public getBranches(): Observable<DataTableResp> {
    return this.httpClient.get<DataTableResp>(this.urls.GET_BRANCHES, { params: { size: '999999' }});
  }
}
