
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { RouterLink } from "vue-router";  
 
 
// import "./assets/tailwind.css";
 

const app = createApp(App)

// end import files
  
 

app.use(router)
app.mount('#app') 
