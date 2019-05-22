import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanComponentDeactivate } from '@los/core/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate,
                route: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState: RouterStateSnapshot) {

    const currentUrl = currentState.url.split('/').slice(-1).pop();
    const nextUrl = nextState.url.split('/').slice(-1).pop();

    // enable jump from confirmation to application-form and application-form to completion
    if (currentUrl === 'confirmation' && nextUrl === 'application-form') {
      return true;
    }
    if (currentUrl === 'application-form' && nextUrl === 'completion') {
      return true;
    }

    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
