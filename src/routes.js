import Home from './views/Home';
// import Dashboard from './views/Dashboard';
import ClientMasterCtrl from './containers/Master/ClientMaster';
import HeaderBodyCtrl from './containers/Master/HeaderBody';
import UserProfileCtrl from './containers/Master/UserProfile'; 
import ChangePasswordCtrl from './containers/Master/ChangePassword'; 
import GeneralMasterCtrl from './containers/Master/GeneralMaster'; 
 
export const routes = [ 
  { path: '/Home', name: 'Home', component: Home, exact: true },
  { path: '/HeaderBody', name: 'Header Body', component: HeaderBodyCtrl, exact: true },
  { path: '/UserProfile', name: 'User Profile', component: UserProfileCtrl, exact: true }, 
  { path: '/ChangePassword', name: 'Change Password', component: ChangePasswordCtrl, exact: true }, 
  { path: '/Home/masterClient', name: 'Client Master', component: ClientMasterCtrl }, 
  { path: '/GeneralMaster', name: 'General Master', component: GeneralMasterCtrl },  
];

 