import Home from './views/Home';
// import Dashboard from './views/Dashboard';
import ClientMasterCtrl from './containers/Master/ClientMaster';
import HeaderBodyCtrl from './containers/Master/HeaderBody';
import UserProfileCtrl from './containers/Master/UserProfile'; 
import ChangePasswordCtrl from './containers/Master/ChangePassword'; 
import GeneralMasterCtrl from './containers/Master/GeneralMaster'; 
import TestSVG from './views/SVG/TestSVG';   
 
export const routes = [ 
  { path: '/Home', name: 'Home', component: Home, exact: true }, 
  { path: '/masterClient', name: 'News Maintenance', component: ClientMasterCtrl }, 
  { path: '/HeaderBody', name: 'Header Body', component: HeaderBodyCtrl, exact: true },
  { path: '/System', name: 'System', exact: true }, 
  { path: '/System/UserProfile', name: 'User Profile', component: UserProfileCtrl, }, 
  { path: '/System/ChangePassword', name: 'Change Password', component: ChangePasswordCtrl, exact: true }, 
  { path: '/System/GeneralMaster', name: 'General Master', component: GeneralMasterCtrl },  
  { path: '/TestSVG', name: 'TestSVG', component: TestSVG },  
];

 