import { BaseSearchQuery } from './base-search';
import { HttpParams } from '@angular/common/http';

export class TxnSearch extends BaseSearchQuery {
  dateFrom: string;
  dateTo: string;

  constructor(size = 5, pageNumber = 0, sort = 'createdDate,DESC') {
    super();
    super.setPageNumber(pageNumber);
    super.setSize(size);
    super.setSort(sort);
  }

  public toParams(): HttpParams {
    let params = new HttpParams();
    params = params.append('size', this.size.toString());
    params = params.append('page', this.page.toString());

    if (this.sort) {
      params = params.append('sort', this.sort);
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
