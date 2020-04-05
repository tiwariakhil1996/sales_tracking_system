import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [

  {
    name: 'Dashboard',
    url: '/admin/dashboard',
    icon: 'icon-speedometer',
    // badge: {
    //   variant: 'info',
    //   text: 'NEW'
    // }
  },

  {
    name: 'Product',
    url: '/admin/product/viewproduct',
    icon: 'icon-handbag',
  },

  {
    name: 'Sales',
    url: '/admin/salesdata',
    icon: 'icon-user'
  },

  {
    name: 'Client',
    url: '/admin/client/viewclient',
    icon: 'icon-people',
  },

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
    name: 'Chat',
    url: '/admin/chat',
    icon: 'icon-chat'
  },

  {
    name: 'Category',
    url: '/admin/category-subcategory/viewcategory',
    icon: 'icon-note',
  },
  {
    name: 'Subcategory',
    url: '/admin/category-subcategory/viewsubcategory',
    icon: 'icon-note',
  },


  {
    name: 'Logout',
    url: '/admin/login',
    icon: 'icon-logout'

  },









  // {
  //   name: 'Disabled',
  //   url: '/admin/dashboard',
  //   icon: 'icon-ban',
  //   badge: {
  //     variant: 'secondary',
  //     text: 'NEW'
  //   },
  //   attributes: { disabled: true },
  // },
  // {
  //   name: 'Download CoreUI',
  //   url: 'http://coreui.io/angular/',
  //   icon: 'icon-cloud-download',
  //   class: 'mt-auto',
  //   variant: 'success',
  //   attributes: { target: '_blank', rel: 'noopener' }
  // },
  // {
  //   name: 'Try CoreUI PRO',
  //   url: 'http://coreui.io/pro/angular/',
  //   icon: 'icon-layers',
  //   variant: 'danger',
  //   attributes: { target: '_blank', rel: 'noopener' }
  // }


];
