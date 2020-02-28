import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [

  {
    name: 'Dashboard',
    url: '/admin/dashboard',
    icon: 'icon-speedometer',

  },


  {
    name: 'Product',
    url: '/admin/product/viewproduct',
    icon: 'icon-calendar',
  },


  {
    name: 'Sales',
    url: '/admin/salesdata',
    icon: 'icon-map'
  },

  {
    name: 'Client',
    url: '/admin/client/viewclient',
    icon: 'icon-calendar',
  },


  // Activity side bar routing
  {
    name: 'Activity',
    url: '/admin/activity/currentactivity',
    icon: 'icon-notebook',
  },

 
  {
    name: 'Map',
    url: '/admin/map',
    icon: 'icon-map'
  },
  {
    name: 'Category',
    url: '/admin/category-subcategory/viewcategory',
    icon: 'icon-note',
  },
  {
    name: 'Subcategory',
    url: '/admin/category-subcategory/viewsubcategory',
    icon: 'icon-calendar',
  },


  {
    name: 'Logout',
    url: '/admin/login',
    icon: 'icon-logout'

  },
   // {
  //   name: 'Activity',
  //   url: '/admin/activity',
  //   icon: 'icon-layers',
  //   children: [
  //     {
  //       name: 'Add Activity',
  //       url: '/admin/activity/addactivity',
  //       icon: 'icon-note',
  //     },
  //     {
  //       name: 'Past Activity',
  //       url: '/admin/activity/pastactivity',
  //       icon: 'icon-calendar',
  //     },
  //     {
  //       name: 'Current Activity',
  //       url: '/admin/activity/currentactivity',
  //       icon: 'icon-notebook',
  //     },
  //   ]
  // },


];
