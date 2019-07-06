import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { HttpCancelService } from '@los/core/services';

@Injectable()
export class HttpCancelInterceptor implements HttpInterceptor {
  constructor(private httpCancelService: HttpCancelService) { }

  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    // use httpParams to pass params from service to interceptor
    const skipCancel = req.params.get('skipCancel');

    if (skipCancel) {
        // TODO delete skipCancel params before making the request
        return next.handle(req);
    } else {
        return next.handle(req).pipe(takeUntil(this.httpCancelService.onCancelPendingRequests()));
    }
  }
}
