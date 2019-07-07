import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';

import { environment } from '@env/environment';

import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ProjectService {
  private serviceUrl = 'project';
  private urls = {
    SEARCH: `${environment.apiUrl}/${this.serviceUrl}`,
    FIND_BY_CODE: `${environment.apiUrl}/${this.serviceUrl}/find-by-code`,
    SAVE: `${environment.apiUrl}/${this.serviceUrl}`,
  };
  private selectedProjectSubject = new BehaviorSubject<any>({});
  public selectedProject = this.selectedProjectSubject.asObservable();
  private projectsSubject = new BehaviorSubject<any[]>([]);
  public projects = this.projectsSubject.asObservable();

  constructor(private httpClient: HttpClient) {
      const params = {
          size: 9999,
          sort: 'createdDate,desc'
      };
      this.search(params).subscribe(page => {
          let projects = page.content;
          if (projects && projects.length > 0) {
              this.projectsSubject.next(projects);
              this.selectedProjectSubject.next(projects[0]);
          }
      });
  }

  public selectProject(project) {
    this.selectedProjectSubject.next(project);
  }
  public search(projectSearch): Observable<any> {
    return this.httpClient.get(this.urls.SEARCH, { params: projectSearch });
  }

  public findByCode(code: string) {
    return this.httpClient.get(this.urls.FIND_BY_CODE, { params: { code }});
  }

  public save(transaction): Observable<any> {
    return this.httpClient.post(this.urls.SAVE, transaction);
  }
}
