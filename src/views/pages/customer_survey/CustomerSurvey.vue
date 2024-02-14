<template>
    <MasterLayout>
      <!-- BEGIN: Content-->
      <div class="app-content content">
        <div class="content-overlay"></div>
        <div class="header-navbar-shadow"></div>
        <div class="content-wrapper container-xxl p-0">
          <!-- <div class="content-header row">
              </div> -->
          <div class="content-header row">
            <div class="content-header-left col-md-8 col-12 mb-2">
              <div class="row breadcrumbs-top">
                <div class="col-12">
                  <h3 class="content-header-title float-start mb-0">Customer Survey</h3>
                  <div class="breadcrumb-wrapper">
                    <ol class="breadcrumb">
                      <li class="breadcrumb-item">
                        <a href="/">Home</a>
                      </li>
                      <li class="breadcrumb-item active">Customer Survey</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
 

          </div>
          <div class="content-body" >
            <!-- users list start -->
            <div class="d-flex  justify-content-center" style="height: calc(-7px + 100vh);">
              <div>
                
                <h1>Customer Survey</h1>

              </div>
            </div>
             
          </div>
        </div>
      </div>
  
      <!-- END: Content-->
    </MasterLayout>
  </template>
  
  <script setup>
 
  import { onBeforeMount, onMounted,inject,ref } from "vue";
  import MasterLayout from "../../layouts/MasterLayout.vue";
 
  import { RouterLink,useRouter } from "vue-router";
  
    
  
  const router = useRouter(); 
 
   
  // onMounted(() => {   
  //   $(".active").removeClass("active");
  //   var currentModule = $('.router-link-active').parent().parent().parent().prop('id'); 
  //   $("#"+currentModule).addClass("active");  

  // });
  
  
   
  
  </script>
  
<style>
  .dtr-bs-modal table tbody tr:first-child {
    display: none !important;
  }
  .text-left{
    text-align: left;
  }
  </style>
  