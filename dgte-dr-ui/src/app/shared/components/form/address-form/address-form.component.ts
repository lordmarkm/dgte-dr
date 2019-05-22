import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Province, City, ZipCode } from '@los/shared/models';
import { AdminService } from '@los/core/services';
import { sortByProp } from '@los/shared/utils';

@Component({
  selector: 'los-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {
  @Input() public readonly = false;
  @Input() public formGroup: FormGroup;
  @Input() public type = '';

  public provinces: Province[];
  public cities: City[];
  public zipCodes: ZipCode[];
  public isProvinceLoading = false;
  public isCityLoading = false;
  public isZipCodeLoading = false;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.isProvinceLoading = true;
    this.adminService.getProvinces().subscribe(datatable => {
      this.provinces = datatable.results.sort(sortByProp('stateName'));
      this.isProvinceLoading = false;
    }, err => {
      this.isProvinceLoading = false;
    });
  }

  submit(): void {
    // do something
  }

  provincesChange(stateName): void {
    this.cities = [];
    this.zipCodes = [];
    this.cityName.setValue('');
    this.zipCode.setValue('');

    if (stateName) {
      this.isCityLoading = true;
      const province = this.provinces.find(province => province.stateName === stateName);
      this.adminService.getCities(province.stateCode).subscribe(datatable => {
        this.cities = datatable.results.sort(sortByProp('cityName'));
        this.isCityLoading = false;
      }, err => {
        this.isCityLoading = false;
      });
    }
  }

  citiesChange(cityName): void {
    if (cityName) {
      this.isZipCodeLoading = true;
      const city = this.cities.find(city => city.cityName === cityName);
      this.adminService.getZipCodes(city.cityCode).subscribe(datatable => {
        this.zipCodes = datatable.results.sort(sortByProp('postalCode'));
        this.isZipCodeLoading = false;
      }, err => {
        this.isZipCodeLoading = false;
      });
    }
  }

  public getCities() {
    return this.cities;
  }

  public getZipCodes() {
    return this.zipCodes;
  }

  public setCities(cities) {
    this.cities = cities;
  }

  public setZipCodes(zipCodes) {
    this.zipCodes = zipCodes;
  }

  get homeNumber() { return this.formGroup.get('homeNumber'); }
  get streetNumber() { return this.formGroup.get('streetNumber'); }
  get streetName() { return this.formGroup.get('streetName'); }
  get cityName() { return this.formGroup.get('cityName'); }
  get province() { return this.formGroup.get('province'); }
  get zipCode() { return this.formGroup.get('zipCode'); }
  get houseOwnership() { return this.type === 'present' ? this.formGroup.get('houseOwnership') : null; }
  get years() { return this.formGroup.parent.get('periodOfStay').get('years'); }
  get months() { return this.formGroup.parent.get('periodOfStay').get('months'); }
}
