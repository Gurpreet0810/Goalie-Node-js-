import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout';
import HomeSection, { HomeSection1, HomeSection2 } from '../home';
import Login from '../login/login';
import Profile from '../login/profile';
import SignUp from '../login/signUp';
import ForgotPassword from '../login/forgot-password';
import Addgoalie from '../login/add_goalie';
import ListGoalie from  '../login/list_goalie';
import ProtectedRoute from './protectedRoute';
import ComplianceBox from '../complianceBox';
import ComplaintReason from '../complianceBox/reason';
import CheckScreen from '../screen';
// import {useState} from 'react'; 

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />, // Ensure Layout wraps all child routes
        children: [
          {
            index: true, // This will render HomeSection at the root path
            element: <HomeSection />,
          },
          {
            path: 'add_goalie',
            element: <Addgoalie />, 
          },
          {
            path: 'dashboard',
            element: <HomeSection1 />, // Displayed within Layout
          },
          {
            path: 'profile',
            element: <Profile />, // Displayed within Layout
          },
          {
            path: 'users-extension',
            element: <HomeSection2 />, // Displayed within Layout
          },
          {
            path: '/list_goalie',
            element: <ListGoalie />,
          },
          {
            path: 'compliance-box',
            element: <ComplianceBox />, // Displayed within Layout
          },
          {
            path: 'add-new-reason',
            element: <ComplaintReason />, // Displayed within Layout
          },
          {
            path: 'customer-reports',
            element: <ComplaintReason />, // Displayed within Layout
          },
          
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <Login />, // No header here
  },
 
  {
    path: '/profile',
    element: <Profile />, // No header here
  },
  {
    path: '/sign-up',
    element: <SignUp />, // No header here
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  

  
  {
    path: 'check-screen',
    element: <CheckScreen />, // Displayed within Layout
  },
  {
    path: '*',
    element: <Layout />, // Optional: You can customize this route
  },
]);

export default router;
