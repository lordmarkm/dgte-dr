import { DataTableReq } from './data-table-req';
import { HttpParams } from '@angular/common/http';

export class LoanSearch extends DataTableReq {
  companyId: number;
  jgSummitEnabled: boolean;
  statuses: string[] = [];
  search: string;
  companyName: string;
  referenceNo: string;
  lastName: string;
  firstName: string;
  amountFrom: string;
  amountTo: string;
  termMonths: string;
  dateFrom: string;
  dateTo: string;

  constructor(size = 10, pageNumber = 0, sort?) {
    super();
    super.setPageNumber(pageNumber);
    super.setSize(size);
    super.setSort(sort);
  }

  public toParams(): HttpParams {
    let params = new HttpParams();
    params = params.append('size', this.size.toString());
    params = params.append('page', this.page.toString());

    if (this.companyId) {
      params = params.append('companyId', this.companyId.toString());
    }

    if (this.jgSummitEnabled) {
      params = params.append('jgSummitEnabled', this.jgSummitEnabled.toString());
    }

    if (this.statuses) {
      this.statuses.forEach(status => {
        params = params.append('statuses', status.toString());
      });
    }

    if (this.search) {
      params = params.append('search', this.search.toString());
    }

    if (this.sort) {
      params = params.append('sort', this.sort);
    }

    if (this.amountFrom) {
      params = params.append('amountFrom', this.amountFrom);
    }

    if (this.amountTo) {
      params = params.append('amountTo', this.amountTo);
    }

    if (this.termMonths) {
      params = params.append('termMonths', this.termMonths);
    }

    if (this.dateFrom) {
      params = params.append('dateFrom', this.dateFrom);
    }

    if (this.dateTo) {
      params = params.append('dateTo', this.dateTo);
    }

    return params;
  }
}
