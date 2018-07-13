import Home from './views/Home';
// import Dashboard from './views/Dashboard';
import ClientMasterCtrl from './containers/Master/ClientMaster';
import HeaderBodyCtrl from './containers/Master/HeaderBody';
import DataTable from './views/Master/TableTest'
 
export const routes = [ 
  { path: '/home', name: 'Home', component: Home, exact: true },
  { path: '/HeaderBody', name: 'Header Body', component: HeaderBodyCtrl, exact: true },
  { path: '/home/DataTable', name: 'DataTable', component: DataTable },
  { path: '/home/masterClient', name: 'Master Client', component: ClientMasterCtrl },
  // { path: '/dashboard', name: 'Dashboard', component: Dashboard },
];

 