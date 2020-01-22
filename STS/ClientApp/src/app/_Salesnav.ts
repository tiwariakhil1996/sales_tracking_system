import { INavData } from '@coreui/angular';

export const SalesnavItems: INavData[] = [

  {
    name: 'Dashboard',
    url: '/sales/dashboard',
    icon: 'icon-speedometer',

  },
 
  {
    name: 'Product',
    url:'/sales/product',
    icon: 'icon-note',
    children: [
      {
        name: 'Add Product',
        url: '/sales/product/addproduct',
        icon: 'icon-note',
      },
      {
        name: 'View Product',
        url: '/sales/product/viewproduct',
        icon: 'icon-calendar',
      }
    ]
  },
  {
    name: 'Client',
    url:'/sales/client',
    icon: 'icon-note',
    children: [
      {
        name: 'Add Client',
        url: '/sales/client/addclient',
        icon: 'icon-note',
      },
      {
        name: 'View Client',
        url: '/sales/client/viewclient',
        icon: 'icon-calendar',
      }
    ]
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
