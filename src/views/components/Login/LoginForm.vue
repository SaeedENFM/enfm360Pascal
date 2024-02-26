<template>
  <form class="auth-login-fo mt-1">
    <div class="mb-1">
      <label class="form-label" for="login-email">Username</label>
      <input
        class="form-control"
        type="text"
        name="user-name"
        placeholder="username"
        autofocus=""
        tabindex="1"
        v-model="username"
      />
    </div>
    <div class="mb-1">
      <div class="d-flex justify-content-between">
        <label class="form-label" for="login-password">Password</label>
        <!-- <a href="#"><small>Forgot Password?</small></a> -->
      </div>
      <div class="input-group input-group-merge form-password-toggle">
        <input
          class="form-control form-control-merge"
          id="login-password"
          type="password"
          name="login-password"
          placeholder="············"
          aria-describedby="login-password"
          tabindex="2"
          v-model="password"
        /><span class="input-group-text cursor-pointer"
          ><i data-feather="eye"></i
        ></span>
      </div>
       
    </div>
    <div class="mb-1">
      <div class="form-check">
        <input
          class="form-check-input"
          id="remember-me"
          type="checkbox"
          tabindex="3"
        />
        <label class="form-check-label" for="remember-me"> Remember Me</label>
      </div>
    </div>
    <div v-show="errorMessage" class="mb-1">
      <span class="text-danger">{{ errorMessage }}</span>
    </div>
    <button
      class="btn btn-primary w-100 login-btn"
      type="button"
      @click="login()"
      tabindex="4"
    >
      <div class="spinner-border text-white d-none login-spinner" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <span class="login-text"> Sign in</span>
    </button>
  </form>
</template>
<script setup>
import { onMounted, onBeforeMount, ref,inject } from "vue";
import { useRoute } from 'vue-router';
import  constents from '../../../constents';
 

const props = defineProps({
  currentLogin: String
});

const route = useRoute()

onBeforeMount(() => {
  loadStylesheet("/src/assets/app-assets/app-assets/css/pages/authentication.css");
  // loadJS(
  //   "/src/assets/app-assets/app-assets/js/scripts/pages/auth-login.js",
  //   true
  // );  
});

onMounted(() => { 
loadJS(
    "/src/assets/app-assets/app-assets/js/scripts/pages/auth-login.js",
    true
);
});

var username = ref('');
var password = ref('');
var loading = ref(false);
const errorMessage = ref(null);

// const token = "eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6IklDTVNDU1IiLCJ1c2VyX25hbWUiOiJJQ01TQ1NSIn0.0ZbKPG-l8ILtIKX2a3QwLXU_kZnCtqcenjw_nR7LlU4";
// // const baseUrl = 'http://localhost:8000/api/';
// const baseUrl = 'https://enfm360-backand.emiratesnfm.ae/api/';

function login() {

    // addOverlay(); 
    if(username.value && password.value){
      $('.login-spinner').removeClass('d-none');
      $('.login-text').addClass('d-none'); 
        loading.value = true;
         var parameters = { 
            user_name: username.value,
            password:password.value 
          }; 
          var currentLoginUrl = props.currentLogin == 'client' ? 'customer-login' : 'login' 
          constents.methods.apiCallFunction(currentLoginUrl,parameters).then((response)=>{
           
          if(response){
            localStorage.isLogin = "1"; 
            localStorage.user = JSON.stringify(response.data[0]); 
            if(route?.query?.returnUrl){
              window.location.href = route?.query?.returnUrl;
            }else{
              window.location.href = "/";
            } 
          }else{
            $('.login-spinner').addClass('d-none');
            $('.login-text').removeClass('d-none'); 
          } 
        });
    }
}

async function apiCallFunction(apiEndPoint, parameters) {
     
     // return "data";
         const requestOptions = {
             method: 'POST',
             headers: { 
                 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}`, 
             },
             body: JSON.stringify(parameters)
         };
         return fetch(baseUrl+apiEndPoint, requestOptions)
         .then(async response => {
             const isJson = response.headers.get('content-type')?.includes('application/json');
             const data = isJson && await response.json();
             loading.value = false;
             $('.login-spinner').addClass('d-none');
            $('.login-text').removeClass('d-none'); 
            //  console.log(data);
             // return data;
             // check for error response
             if (!response.ok) { 
                 var isRtl = $('html').attr('data-textdirection') === 'rtl'
                 const error = (data && data.message) || response.status;
                  
                 toastr['error'](error, 'Error!', {
                     closeButton: true,
                     tapToDismiss: false,
                     rtl: isRtl
                   });
                 return Promise.reject(error);
             }else{
                 return data;
                 // state.enquirySourceList = data.data;
             }
     
         })
         .catch(error => {
             errorMessage.value = error;
             console.error("There was an error!", error);
         });
  
 }//end of apiCallFunction
 

function addOverlay() {

    $('.login-btn').block({
        message: '<div class="spinner-border text-primary" role="status"></div>',
        // timeout: 1000,
        css: {
          backgroundColor: 'transparent',
          border: '0'
        },
        overlayCSS: {
          backgroundColor: '#fff',
          opacity: 0.8
        }
      });
}

</script>

