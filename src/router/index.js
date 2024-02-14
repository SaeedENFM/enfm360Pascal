import { createRouter, createWebHistory, RouterLink } from 'vue-router'; 


import routes from './routes'; 



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes.routes
});

var user = localStorage.user?JSON.parse(localStorage.user) : null; 
if(user){
  console.log('user');
  console.log(user); 
}  
  
router.beforeEach((toRoute, fromRoute, next) => {
  window.document.title = toRoute.meta && toRoute.meta.title ? toRoute.meta.title : 'EmiratesNFM Dashboard';
  var user = localStorage.user?JSON.parse(localStorage.user) : null; 
  // console.log(toRoute);
  const { authorize } = toRoute.meta;
  if (toRoute.matched.some(record => record.meta.requiresAuth)) {
      
    if (!localStorage.isLogin || localStorage.isLogin == "0") {
      // console.log('inside not login');
      next({ name: 'login', query: { returnUrl: toRoute.path } }) 
    } else {
      // console.log('login');
      // console.log('authorize');
      // console.log(authorize); 
      // const intersection = authorize.filter(element => user?.roles.includes(element));
      // console.log(intersection);
      // var found = authorize.find((val, index) => {
      //   console.log('index', index) // Stops at 0
      //   console.log('val', val) // Stops at 0

      //   return user?.roles.includes(val)
      // })
      // console.log(found); 
      // if (authorize.length && !authorize.includes(user?.roles[0].ApplicationRole)) {
      //   // role not authorised so redirect to home page
      //   return next({ path: '/' });
      // }else{
      //   next() // go to wherever I'm going
      // }

      if(user?.sideMenues){
        if(toRoute.path == '/' && user.roles[0].DefaultPage != '/' ){  
          const filtered = user?.sideMenues.filter(menu => {
              return menu.Url===  user.roles[0].DefaultPage 
          }) 
          if(filtered.length > 0){
            next({ path: user.roles[0].DefaultPage }); 
          }else{
            next({ path: user.sideMenues[0].Url }); 
          }

        }else{
          next() // go to wherever I'm going
        }
      }
      
    }
  } else {
    // console.log('not require auth');

    next() // does not require auth, make sure to always call next()!
  }

  // next();
})

export default router
