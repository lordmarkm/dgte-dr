import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = false;
  _hasBackgroundImage = true;
  menus = [
    {
      title: 'general',
      type: 'header'
    },
    {
      title: 'Dashboard',
      icon: 'fa fa-tachometer-alt',
      active: false,
      type: 'simple',
      routerLink: '/dashboard'
    },
    {
      title: 'Bookkeeping',
      icon: 'fa fa-fw fa-balance-scale',
      active: false,
      type: 'dropdown',
//      badge: {
//        text: '3',
//        class: 'badge-danger'
//      },
      submenus: [
        {
          title: 'Chart of Accounts',
          icon: 'fa fa-fw fa-sitemap',
          routerLink: '/bookkeeping/chart-of-accounts'
        },
        {
          title: 'Transactions',
          icon: 'fa fa-fw fa-list-ol',
          routerLink: '/bookkeeping/transactions'
        },
        {
          title: 'Balance Sheet',
          icon: 'fa fa-fw fa-balance-scale',
          routerLink: '/bookkeeping/balance-sheet',
          active: true
        },
        {
          title: 'Comparative Balance Sheet',
          icon: 'fa fa-fw fa-balance-scale-right',
          routerLink: '/bookkeeping/comparative-balance-sheet'
        },
        {
          title: 'Notifications',
          icon: 'fa fa-fw fa-envelope',
          routerLink: '/bookkeeping/notifications'
        },
      ]
    },
    {
      title: 'Components',
      icon: 'far fa-gem',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'General',
        },
        {
          title: 'Panels'
        },
        {
          title: 'Tables'
        },
        {
          title: 'Icons'
        },
        {
          title: 'Forms'
        }
      ]
    },
    {
      title: 'Charts',
      icon: 'fa fa-chart-line',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Pie chart',
        },
        {
          title: 'Line chart'
        },
        {
          title: 'Bar chart'
        },
        {
          title: 'Histogram'
        }
      ]
    },
    {
      title: 'Maps',
      icon: 'fa fa-globe',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Google maps',
        },
        {
          title: 'Open street map'
        }
      ]
    },
    {
      title: 'Extra',
      type: 'header'
    },
    {
      title: 'Documentation',
      icon: 'fa fa-book',
      active: false,
      type: 'simple',
      badge: {
        text: 'Beta',
        class: 'badge-primary'
      },
    },
    {
      title: 'Calendar',
      icon: 'fa fa-calendar',
      active: false,
      type: 'simple'
    },
    {
      title: 'Examples',
      icon: 'fa fa-folder',
      active: false,
      type: 'simple'
    }
  ];
  constructor() { }

  toggle() {
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}