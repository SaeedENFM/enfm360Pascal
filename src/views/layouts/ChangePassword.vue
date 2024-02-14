<template>
    <div
      class="modal fade"
      id="changePasswordPopup"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-sm modal-dialog-centered modal-edit-user">
        <div class="modal-content">
          <div class="modal-header bg-transparent">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body pb-5 px-sm-1 pt-0">
            <!-- <div class="text-center mb-2">
              <h5 class="mb-1">Assign Module & Menus</h5>
              <p>Assign Module & Menus to user.</p>
            </div>  -->
            <div class="card mb-0">
                <div class="card-body">
                   
                    <h4 class="card-title mb-1">Change Password 🔒</h4>
                    <p class="card-text mb-2">Your new password must be different from previously used passwords</p>

                    <form class="auth-reset-password-form mt-2" >
                        <div class="mb-1">
                            <div class="d-flex justify-content-between">
                                <label class="form-label" for="reset-password-new">New Password</label>
                            </div>
                            <div class="input-group input-group-merge form-password-toggle">
                                <input type="password" class="form-control form-control-merge" id="reset-password-new" name="reset-password-new" placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;" aria-describedby="reset-password-new" tabindex="1" autofocus />
                                <span class="input-group-text cursor-pointer"><i data-feather="eye"></i></span>
                            </div>
                        </div>
                        <div class="mb-1">
                            <div class="d-flex justify-content-between">
                                <label class="form-label" for="reset-password-confirm">Confirm Password</label>
                            </div>
                            <div class="input-group input-group-merge form-password-toggle">
                                <input type="password" class="form-control form-control-merge" id="reset-password-confirm" name="reset-password-confirm" placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;" aria-describedby="reset-password-confirm" tabindex="2" />
                                <span class="input-group-text cursor-pointer"><i data-feather="eye"></i></span>
                            </div>
                        </div>
                        <button type="button" class="btn btn-primary w-100" tabindex="3" 
                        @click="changePassword()"
                        >Set New Password</button>
                    </form>

                     
                </div>
            </div>
   
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
import { onMounted, ref, inject } from "vue";

import { RouterLink, useRoute } from "vue-router";

import administration_remote from "../../remote/administration_remote";
import constents from "../../constents";


onMounted(() => { 
loadJS(
    "/src/assets/app-assets/app-assets/js/scripts/pages/auth-reset-password.js",
    true
);
});

 
async function changePassword() {
    var newPassword = $("#reset-password-new").val();
    var confirmPassword = $("#reset-password-confirm").val();

    if(newPassword == confirmPassword){
        var parameters = {
            user_id : administration_remote.state.user.Id,
            password: confirmPassword
        } 
        await administration_remote.methods.changePassword(parameters).then((response)=>{
            setTimeout(() => {
                logout(); 
            }, 500);
        });
    }else{
        constents.methods.errorToastr('New Password should be matched the confirm password')
    }
}

function logout() {
  localStorage.isLogin = "0";
  localStorage.user = "";

  window.location.href = "/login" 
}


   
</script>
  
<style  >


</style>
  