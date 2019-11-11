export class BaseSearchQuery {
  sort: string;
  size: number = 10;
  totalElements: number = 0;
  page: number = 0;

  public setSize(size) {
    this.size = size;
  }

  public setPageNumber(page) {
    this.page = page;
  }

  public setSort(sort) {
    this.sort = sort;
  }
}
