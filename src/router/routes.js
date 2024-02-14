import Login from '../views/Login.vue';


import UnAuthorized from '../views/UnAuthorized.vue'; 

import DefaultPage from '../views/pages/dashboard/DefaultPage.vue';
 
// --------- customer survey ---------

import CustomerSurvey from '../views/pages/customer_survey/CustomerSurvey.vue';


var routes = [
    {
      path: '/un-authorized',
      name: 'un-authorized',
      component: UnAuthorized,
      meta: {
        title: 'Not Authorized',
        authorize: [],
      }
    },  
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: 'Login',
        authorize: [],
      }
    },  
    {
      path: '/',
      name: 'home',
      component: DefaultPage, //HomeView,
      meta: {
        title: 'EmiratesNFM Dashboard',
        requiresAuth: true
      }
    }, 
    {
      path: '/default-page',
      name: 'default-page',
      component: DefaultPage, //HomeView,
      meta: {
        title: 'EmiratesNFM Dashboard',
        requiresAuth: true
      }
    },  
    {
      path: '/customer-survey',
      name: 'customer-survey',
      component: CustomerSurvey,
      meta: {
        title: 'Customer Survey',
        requiresAuth: true,
        authorize: [], 
      }, 
    }, 



    
  ];


 

export default {
    routes 
};
