import { DataTableReq } from './data-table-req';
import { HttpParams } from '@angular/common/http';

export class GenericSearch extends DataTableReq {
  search: string;
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

    if (this.search) {
      params = params.append('search', this.search.toString());
    }

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
