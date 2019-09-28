import { DataTableReq } from './data-table-req';
import { HttpParams } from '@angular/common/http';

export class CompanySearch extends DataTableReq {
  companyName: string;
  search: string;

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

    if (this.companyName) {
      params = params.append('companyName', this.companyName);
    }

    if (this.search) {
      params = params.append('search', this.search.toString());
    }

    if (this.sort) {
      params = params.append('sort', this.sort);
    }

    return params;
  }
}
