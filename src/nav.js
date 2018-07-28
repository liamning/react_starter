export default {
    items: [
        {
            name: 'Home',
            url: '/',
            icon: 'icon-home',
        },
        {
            name: 'Client Master',
            url: '/home/masterClient',
            icon: 'icon-puzzle'
        },
        {
            name: 'Header Body',
            url: '/HeaderBody',
            icon: 'icon-puzzle'
        },
        {
            name: 'System',
            icon: 'fa fa-cog',
            children: [
                {
                    name: 'User Profile',
                    url: '/UserProfile',    
                },
                {
                    name: 'Change Password',
                    url: '/ChangePassword',
                },
                {
                    name: 'General Master',
                    url: '/GeneralMaster',
                    // icon: 'icon-puzzle',
                }, 
            ]
        },
    ]
};
