<template>
  <div class="blank-page login-page" style="background-color: #f8f8f8;">
    <div class="">
      <div class="content-overlay"></div>
      <div class="header-navbar-shadow"></div>
      <div class="content-wrapper">
        <div class="content-header row"></div>
        <div class="content-body">
          <div class="auth-wrapper auth-cover">
            <div class="auth-inner row m-0">
              <!-- Brand logo-->
              <!-- <a class="brand-logo" href="/">  
                <img src="/src/assets/images/ENFM_LOGO_new.png" class="header-brand-logo" style="width: 200px;">  
              </a> -->
              <!-- /Brand logo-->
              <!-- Left Text-->
              <div class=" d-lg-flex col-lg-8 align-items-center p-5 pt-0 px-0 login-content-section">
                <div
                  class="w-100 d-lg-flex align-items-center justify-content-center"
                >    
                <video class="img-fluid w-100 mt-2" autoplay controls>
                  <source src="/src/assets/videos/enfm_video_new.mp4"  type="video/mp4">
                   Your browser does not support HTML video.
                </video>
                  
                  <!-- <img
                    class="img-fluid"
                    src="/src/assets/app-assets/app-assets/images/pages/goals-2.png"
                    alt="EmiratesNFM"
                  /> -->
                  <!-- <img  src="/src/assets/images/9.jpg"  class="img-fluid" alt="EmiratesNFM">  -->
                 
                  <!-- <img  src="/src/assets/images/HomeImage.jpeg"  class="img-fluid mt-3" alt="EmiratesNFM">  -->
                    
                  <!-- <div class="row justify-content-center">
                    <div class="col-md-8">
                      <LoginCarousel/>
                    </div>
                  </div> -->

                </div>
                <!-- vision section -->
                <div class="d-flex profile-section mt-1">
                  <div class="profile-box  mission-box">
                      <div class="profile-heading">
                        <h5> MISSION</h5> 
                      </div>
                      <div class="profile-content">
                        We enable all our clients to concentrate on their core business whilst we manage their non-core activities in the background.
                      </div>
                  </div>
                  <div class="profile-box vision-box ">
                      <div class="profile-heading">
                        <h5> VISION</h5> 
                      </div>
                      <div class="profile-content">
                        To be the Smart FM Service provider of choice by understanding the needs of our valuable clients and exceeding their expectations in terms of quality, continual improvement, and sustainability.
                      </div>
                  </div>
                  <div class="profile-box  value-box">
                      <div class="profile-heading">
                        <h5> VALUES</h5> 
                      </div>
                      <div class="profile-content">
                         
                        <div class="d-flex justify-content-between mx-1" >
                          <div class="">
                            <li>Respect</li>
                            <li>Accountability</li>
                            <li>Teamwork</li> 
                          </div>
                          <div>
                            <li>Leadership</li>
                            <li>Courage</li>
                            <li>Transparency</li> 
                          </div>
                        </div> 
                      </div>
                  </div>
                </div>
                <!-- end vision section -->
              </div>
              <!-- <div class="d-none d-lg-flex col-lg-8 align-items-center p-5">
                            <div class="w-100 d-lg-flex align-items-center justify-content-center px-5"><img class="img-fluid" src="../../../app-assets/images/pages/login-v2.svg" alt="Login V2" /></div>
              </div> -->
              <!-- /Left Text-->
              <!-- Login--> 
              <div
                class="d-flex col-lg-4  auth-bg px-2 p-lg-2"
              > 
                <div class=" col-12 col-sm-8 col-md-6 col-lg-12 px-xl-1  mx-auto 
                d-flex flex-column mt-5 "
                style="font-weight: 700 !important; color: #000;"
                >
                  <a class="brand-log align-self-center"  > 
                     <img src="/src/assets/images/ENFM_LOGO_new.png" class="header-brand-logo" style="width: 300px;"> 
                  </a>
                  <h2 class="card-title fw-bold mb-1 mt-5">
                    Welcome to EmiratesNFM! 👋
                  </h2> 
                  <div class="card mt-2">
                    <div class="card-header py-2 pb-0">
                        <ul class="nav nav-pills card-header-pills ms-0" id="pills-tab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="pills-staff-tab" data-bs-toggle="pill" href="#pills-staff" role="tab" aria-controls="pills-staff" aria-selected="true"> 
                                  <i class="fa fa-id-card"></i> Staff
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-client-tab" data-bs-toggle="pill" href="#pills-client" role="tab" aria-controls="pills-client" aria-selected="false">
                                  <i class="fa fa-user"></i>
                                  Client
                                </a>
                            </li> 
                            <li class="nav-item">
                                <a class="nav-link" id="pills-vendor-tab" data-bs-toggle="pill" href="#pills-vendor" role="tab" aria-controls="pills-vendor" aria-selected="false">
                                  
                                  <i class="fa fa-industry"></i>
                                  Vendor
                                </a>
                            </li> 
                        </ul>
                    </div>
                    <div class="card-body mb-1">
                      <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-staff" role="tabpanel" aria-labelledby="pills-staff-tab">
                          <h6 class="card-title">Login as Staff</h6>  
                          <LoginForm current-login="staff"/>   
                        </div>
                        <div class="tab-pane fade" id="pills-client" role="tabpanel" aria-labelledby="pills-client-tab"> 
                          <h6 class="card-title mb-0">Login as Client</h6> 
                          <LoginForm current-login="client"/>  
                        </div>
                        <div class="tab-pane fade" id="pills-vendor" role="tabpanel" aria-labelledby="pills-vendor-tab"> 
                          <h6 class="card-title mb-0">Login as Vendor</h6> 
                          <LoginForm current-login="vendor" />  
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> 
              <!-- /Login-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup> 
import  constents from '../constents'; 
import  LoginForm from '../views/components/Login/LoginForm.vue';
 
</script>
<style>
.auth-wrapper.auth-cover .brand-logo{
  left: unset !important;
  margin-left: 20px;
}
</style>