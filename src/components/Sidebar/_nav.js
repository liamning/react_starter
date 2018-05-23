export default {
  items: [
    {
      name: 'Home',
      url: '/',
      icon: 'icon-home',
    },
    // {
    //   name: 'Dashboard',
    //   url: '/dashboard',
    //   icon: 'icon-speedometer',
    //   badge: {
    //     variant: 'info',
    //     text: 'NEW'
    //   }
    // },
    {
      name: 'Client Master',
      url: '/home/masterClient',
      icon: 'icon-puzzle'
    },
    {
      name: 'DataTable',
      url: '/home/DataTable',
      icon: 'fa fa-save'
    },
    {
      name: 'Others',
      url: '/base/forms2/123',
      icon: 'fa fa-cog',
      children: [
        {
          name: 'Breadcrumbs',
          url: '/base/breadcrumbs',
          // icon: 'icon-puzzle',
        },
        {
          name: 'Cards',
          url: '/base/cards',
          // icon: 'icon-puzzle',
        },
        {
          name: 'Cards2',
          url: '/base/cards2',
          // icon: 'icon-puzzle',
        },
        {
          name: 'Cards3',
          url: '/base/cards3',
          // icon: 'icon-puzzle',
        },
      ]
    },
  ]
};
