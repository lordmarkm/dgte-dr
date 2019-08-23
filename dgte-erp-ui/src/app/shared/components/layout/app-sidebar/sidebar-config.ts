export const SIDEBAR_CONFIG: any = [
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
      title: 'Reports',
      icon: 'fa fa-fw fa-chart-bar',
      active: 'false',
      type: 'dropdown',
      submenus: [
        {
          title: 'Profit And Loss',
          routerLink: '/reports/profit-and-loss'
        },
      ]
    },
    {
      title: 'Admin',
      type: 'header'
    },
    {
      title: 'Wizard Designer',
      icon: 'fa fa-book',
      active: false,
      type: 'simple',
      routerLink: '/docs/wizard-list',
      badge: {
        text: 'Beta',
        class: 'badge-primary'
      },
    }
  ];