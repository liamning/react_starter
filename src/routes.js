import Home from './views/Home';
// import Dashboard from './views/Dashboard';
import ClientMasterCtrl from './containers/Master/ClientMaster';
import HeaderBodyCtrl from './containers/Master/HeaderBody';
import UserProfileCtrl from './containers/Master/UserProfile'; 
import ChangePasswordCtrl from './containers/Master/ChangePassword'; 
import GeneralMasterCtrl from './containers/Master/GeneralMaster'; 
 
export const routes = [ 
  { path: '/Home', name: 'Home', component: Home, exact: true }, 
  { path: '/Home/masterClient', name: 'Client Master', component: ClientMasterCtrl }, 
  { path: '/HeaderBody', name: 'Header Body', component: HeaderBodyCtrl, exact: true },
  { path: '/System', name: 'System', exact: true }, 
  { path: '/System/UserProfile', name: 'User Profile', component: UserProfileCtrl, }, 
  { path: '/System/ChangePassword', name: 'Change Password', component: ChangePasswordCtrl, exact: true }, 
  { path: '/System/GeneralMaster', name: 'General Master', component: GeneralMasterCtrl },  
];

 