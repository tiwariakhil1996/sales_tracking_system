import { INavData } from '@coreui/angular';
export const SalesnavItems: INavData[] = [

  {
    name: 'Home',
    url: '/sales/dashboard',
    icon: 'icon-home',

  },


  {
    name: 'Product',
    url: '/sales/product/viewproduct',
    icon: 'icon-calendar',
  },

  {
    name: 'Client',
    url: '/sales/client/viewclient',
    icon: 'icon-calendar',
  },

  

  
  {
    name: 'Activity',
    url: '/sales/activity/currentactivity',
    icon: 'icon-notebook',
  },

  
  {
    name: 'Map',
    url: '/sales/map',
    icon: 'icon-map'
  },

  {
    name: 'Logout',
    url: '/sales/login',
    icon: 'icon-logout'
  }

];
