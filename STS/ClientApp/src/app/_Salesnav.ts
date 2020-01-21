import { INavData } from '@coreui/angular';

export const SalesnavItems: INavData[] = [

  {
    name: 'Dashboard',
    url: '/sales/dashboard',
    icon: 'icon-speedometer',

  },
  
  {
    name: 'Add Product',
    url: '/sales/product',
    icon: 'icon-note'
  },
  {
    name: 'Add Client',
    url: '/sales/client',
    icon: 'icon-user-follow'
  },

  {
    name: 'Activity',
    url: '/sales/activity',
    icon: 'icon-layers',
    children: [
      {
        name: 'Add Activity',
        url: '/sales/activity/addactivity',
        icon: 'icon-note',
      },
      {
        name: 'Past Activity',
        url: '/sales/activity/pastactivity',
        icon: 'icon-calendar',
      },
      {
        name: 'Current Activity',
        url: '/sales/activity/currentactivity',
        icon: 'icon-notebook',
      },
    ]
  },
  {
    name: 'Map',
    url: '/sales/map',
    icon: 'icon-map'
  },
  // {
  //   name: 'Demo',
  //   url: '/sales/demo',
  //   icon: 'icon-demo'
  // },
  {
    name: 'Logout',
    url: '/sales/login',
    icon: 'icon-logout'
  }

];
