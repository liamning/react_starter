export default {
    items: [
        {
            name: 'Home',
            url: '/Home',
            icon: 'icon-home',
        },
        // {
        //     name: 'News Maintenance',
        //     url: '/masterClient',
        //     icon: 'icon-puzzle'
        // },
        {
            name: 'DynamicForm',
            url: '/DynamicForm',
            icon: 'icon-puzzle'
        },
        {
            name: 'Header Body',
            url: '/HeaderBody',
            icon: 'icon-puzzle'
        }, 
        {
            name: 'System',
            url: '/System', 
            icon: 'fa fa-cog',
            children: [
                {
                    name: 'User Profile',
                    url: '/System/UserProfile',    
                },
                {
                    name: 'Change Password',
                    url: '/System/ChangePassword',
                },
                {
                    name: 'General Master',
                    url: '/System/GeneralMaster', 
                }, 
            ]
        },
    ]
};
