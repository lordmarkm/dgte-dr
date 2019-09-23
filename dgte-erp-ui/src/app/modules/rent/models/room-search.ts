import { DataTableReq } from '@los/shared/models/data-table-req';
import { HttpParams } from '@angular/common/http';

export class RoomSearch extends DataTableReq {
  projectCode: string;

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

    if (this.sort) {
      params = params.append('sort', this.sort);
    }

    if (this.projectCode) {
      params = params.append('projectCode', this.projectCode.toString());
    }

    return params;
  }
}
