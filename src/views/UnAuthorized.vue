<template>
  <div class="blank-page login-page" style="background-color: #f8f8f8">
    <div class="">
      <div class="content-overlay"></div>
      <div class="header-navbar-shadow"></div>
      <div class="content-wrapper">
        <div class="content-header row"></div>
        <div class="content-body">
          <!-- Not authorized-->
          <div class="misc-wrapper">
            <a class="brand-logo" href="#">
              <img src="/src/assets/images/ENFM_LOGO_new.png" class="header-brand-logo" style="width: 300px;">
               
          </a>
            <div class="misc-inner p-2 p-sm-3">
              <div class="w-100 text-center">
                <h2 class="mb-1">You are not authorized! 🔐</h2>
                <!-- <p class="mb-2">
                  The Webtrends Marketing Lab website in IIS uses the default
                  IUSR account credentials to access the web pages it serves.
                </p> -->
                <a
                  class="btn btn-primary mb-1 mt-1 btn-sm-block"
                  @click="logout()"
                  >Back to login</a
                >
                <div class="d-flex justify-content-center">
                  <img
                    class="img-fluid"
                    src="/src/assets/app-assets/app-assets/images/pages/not-authorized.svg"
                    alt="Not authorized page"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- / Not authorized-->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeMount, ref, inject } from "vue";
import { useRoute } from "vue-router";
import constents from "../constents";

const route = useRoute();

onBeforeMount(() => {
  loadStylesheet(
    "/src/assets/app-assets/app-assets/css/pages/authentication.css"
  );
  loadJS(
    "/src/assets/app-assets/app-assets/js/scripts/pages/auth-login.js",
    true
  );
});

function logout() {
  localStorage.isLogin = "0";
  localStorage.user = "";

  window.location.href = "/login"

}
 
</script>
