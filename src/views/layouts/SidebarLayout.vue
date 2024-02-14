<template>
    <!-- BEGIN: Main Menu-->
    <div class="main-menu menu-fixed menu-light menu-accordion menu-shadow" data-scroll-to-active="true">
        <div class="navbar-header">
            <ul class="nav navbar-nav flex-row">
                <li class="nav-item me-auto">
                    <a class="navbar-brand" href="/">
                    <span class="brand-logo">
                        <!-- ic_launcher_1024.png -->
                    <img src="/src/assets/images/logo.png" class="">

                            <!-- <svg viewbox="0 0 139 95" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="24">
                                <defs>
                                    <lineargradient id="linearGradient-1" x1="100%" y1="10.5120544%" x2="50%" y2="89.4879456%">
                                        <stop stop-color="#000000" offset="0%"></stop>
                                        <stop stop-color="#FFFFFF" offset="100%"></stop>
                                    </lineargradient>
                                    <lineargradient id="linearGradient-2" x1="64.0437835%" y1="46.3276743%" x2="37.373316%" y2="100%">
                                        <stop stop-color="#EEEEEE" stop-opacity="0" offset="0%"></stop>
                                        <stop stop-color="#FFFFFF" offset="100%"></stop>
                                    </lineargradient>
                                </defs>
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="Artboard" transform="translate(-400.000000, -178.000000)">
                                        <g id="Group" transform="translate(400.000000, 178.000000)">
                                            <path class="text-primary" id="Path" d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z" style="fill:currentColor"></path>
                                            <path id="Path1" d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z" fill="url(#linearGradient-1)" opacity="0.2"></path>
                                            <polygon id="Path-2" fill="#000000" opacity="0.049999997" points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"></polygon>
                                            <polygon id="Path-21" fill="#000000" opacity="0.099999994" points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"></polygon>
                                            <polygon id="Path-3" fill="url(#linearGradient-2)" opacity="0.099999994" points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"></polygon>
                                        </g>
                                    </g>
                                </g>
                            </svg> -->
                    </span>
                        <h3 class="brand-text">EmiratesNFM</h3>
                    </a></li>
                <li class="nav-item nav-toggle"><a class="nav-link modern-nav-toggle pe-0" data-bs-toggle="collapse"><i class="d-block d-xl-none text-primary toggle-icon font-medium-4" data-feather="x"></i><i class="d-none d-xl-block collapse-toggle-icon font-medium-4  text-primary" data-feather="disc" data-ticon="disc"></i></a></li>
            </ul>
        </div>
        <div class="shadow-bottom"></div>
        <div class="main-menu-content">
            <div class="nav-item nav-toggle mb-2">
                <a class="nav-link modern-nav-toggle pe-0" data-bs-toggle="collapse"><i class="d-block d-xl-none text-primary toggle-icon font-medium-4" data-feather="x"></i><i class="d-none d-xl-block collapse-toggle-icon font-medium-4  text-primary" data-feather="disc" data-ticon="disc"></i></a>
            </div>

            <ul class="navigation navigation-main " id="main-menu-navigation" data-menu="menu-navigation">
                <li v-for="(module, key) in user?.modules" :key="key"   
                class="nav-item has-sub" :id="`${module?.ModulePageId}-li`"  >
                    <a class="d-flex align-items-center" href="#"> 
                        <i :data-feather="module?.ModuleIcon" :class="module?.IconColor"></i> 
                        <span class="menu-title text-truncate" data-i18n="Invoice">
                            {{module.ModuleName}}
                        </span>
                    </a>
                    <ul class="menu-content"> 
                        <li v-for="(menu, key2) in module?.menues" :key="key2"  class="">
                            <RouterLink 
                            :to="menu?.Url" class="d-flex align-items-center" > 
                                <i :data-feather="menu.menuIcon" ></i>
                                <span class="menu-item text-truncate" data-i18n="Preview">
                                    {{menu.Menuname}} 
                                </span>
                            </RouterLink> 
                        </li>   
                    </ul>
                </li>
            </ul>

            <!-- <ul class="navigation navigation-main d-none" id="main-menu-navigation" data-menu="menu-navigation">
                
                <li class=" nav-item "> 
                    <RouterLink v-if="isLogin == '0'" :to="'/'" class="d-flex align-items-center" ><i data-feather="home"></i><span class="menu-title text-truncate" data-i18n="Dashboards">Dashboards</span>
                    </RouterLink> 
                     
                </li>
                <li class=" navigation-header"><span data-i18n="Apps &amp; Pages">Menu</span><i data-feather="more-horizontal"></i>
                </li> 
                <li v-if="parseInt(user.Id) == 1 " id="administration-li" class="nav-item has-sub"   ><a class="d-flex align-items-center" href="#">
                    <i data-feather="file-text"></i><span class="menu-title text-truncate" data-i18n="Invoice">Administration</span></a>
                    <ul class="menu-content"> 
                        <li class=""  >
                            <RouterLink :to="'/administration/users-list'" class="d-flex align-items-center" ><i data-feather="circle"></i><span class="menu-item text-truncate" data-i18n="Preview">User List</span>
                            </RouterLink> 
                        </li> 
                        <li class=""  >
                            <RouterLink :to="'/administration/roles'" class="d-flex align-items-center" ><i data-feather="circle"></i><span class="menu-item text-truncate" data-i18n="Preview">
                                Roles</span>
                            </RouterLink> 
                        </li>  
 
                    </ul>
                </li>
 

                <li  id="sales-management-li" class="nav-item has-sub"   ><a class="d-flex align-items-center" href="#">
                    <i data-feather="bar-chart-2"></i><span class="menu-title text-truncate" data-i18n="Invoice">Sales Mangements</span></a>
                    <ul class="menu-content">
                         
                        <li class="" id="sales-enquiries-li">
                             
                            <RouterLink :to="'/sales-mangements/enquiries'" class="d-flex align-items-center" >
                                <i data-feather="bar-chart-2"></i><span class="menu-title text-truncate" data-i18n="Chat">
                            Sales Enquiries</span>
                            </RouterLink>
                        </li>  
                        <li class="" id="sales-wo-li"> 
                             
                            <RouterLink :to="'/sales-mangements/additional-wo'" class="d-flex align-items-center" ><i data-feather="plus-square"></i><span class="menu-title text-truncate" data-i18n="Chat">
                                Additional Work Order</span>
                            </RouterLink>
                            <RouterLink :to="'/administration/master-clients'" class="d-flex align-items-center" ><i data-feather="circle"></i><span class="menu-item text-truncate" data-i18n="Preview">Master Clients</span>
                            </RouterLink>  
                        </li>    
                    </ul>
                </li>
                
                <li id="contract-management-li" class=" nav-item" :class="currentRoute == 'contract-details' ? 'active' : ''"> 
                    <RouterLink :to="'/contracts-list'" class="d-flex align-items-center" >
                        <i data-feather="check-square"></i><span class="menu-title text-truncate" data-i18n="Todo">Contract Management</span>
                    </RouterLink> 
                </li>
                <li class=" nav-item" id="enquiries-li" :class="currentRoute == 'edit-enquire' ? 'active' : ''">
                     
                    <RouterLink :to="'/enquiries-list'" class="d-flex align-items-center" ><i data-feather="phone-call"></i><span class="menu-title text-truncate" data-i18n="Todo">
                        BD Pipeline Enquiries</span>
                    </RouterLink> 
                </li>
                
                <li class=" nav-item" id="rm-task-console-li" >
                    
                    <RouterLink :to="'/rm-task-console'" class="d-flex align-items-center" ><i data-feather="grid"></i><span class="menu-title text-truncate" data-i18n="Todo">RM Task Console</span>
                    </RouterLink>
                </li> 

                <li  id="ppm-task-console-li"  class="nav-item has-sub"   ><a class="d-flex align-items-center" href="#">
                    <i data-feather="pie-chart"></i><span class="menu-title text-truncate" data-i18n="Invoice">
                        PPM Management</span></a>
                    <ul class="menu-content"> 
                        <li class="" id=" "> 
                            <RouterLink :to="'/ppm-task-console'" class="d-flex align-items-center" ><i data-feather="pie-chart"></i><span class="menu-title text-truncate" data-i18n="Todo">
                                PPM Task Console</span>
                            </RouterLink>
                        </li>  
                        <li class="" id="task-sheet-li">  
                            <RouterLink :to="'/ppm-task-sheets'" class="d-flex align-items-center" ><i data-feather="plus-square"></i><span class="menu-title text-truncate" data-i18n="Chat">
                                Task Sheet</span>
                            </RouterLink>
                        </li>     
                    </ul>
                </li>

                <li class=" nav-item" id="invoice-management-li">
                     
                    <RouterLink :to="'/invoice/list'" class="d-flex align-items-center" ><i data-feather="file-text"></i><span class="menu-title text-truncate" data-i18n="Todo">
                        Invoice Mangements</span>
                    </RouterLink>
                </li> 
                <li class=" nav-item" id="asset-management-li">
                    <RouterLink :to="'/assets/list'" class="d-flex align-items-center" ><i data-feather="shield"></i><span class="menu-title text-truncate" data-i18n="Todo">
                        Assets Mangements</span>
                    </RouterLink>
                </li>   
                <li  id="approvals-li"  class="nav-item has-sub"   >
                    <a class="d-flex align-items-center" href="#">
                    <i data-feather="check-circle"></i><span class="menu-title text-truncate" data-i18n="Invoice">
                        Approvals</span>
                    </a>
                    <ul class="menu-content"> 
                        <li class="" id="pending-requests-li"> 
                            <RouterLink :to="'/approval-requests/pending'" class="d-flex align-items-center" >
                                <i data-feather="voicemail"></i><span class="menu-title text-truncate" data-i18n="Todo">
                                Pending Requests</span>
                            </RouterLink>  
                        </li>   
                        <li class="" id="approved-requests-li">  
                            <RouterLink :to="'/approval-requests/approved'" class="d-flex align-items-center" >
                                <i data-feather="check"></i><span class="menu-title text-truncate" data-i18n="Chat">
                                Approved Requests</span>
                            </RouterLink>
                        </li> 
                        <li class="" id="rejected-requests-li">  
                            <RouterLink :to="'/approval-requests/rejected'" class="d-flex align-items-center" >
                                <i data-feather="x"></i><span class="menu-title text-truncate" data-i18n="Chat">
                                Rejected Requests</span>
                            </RouterLink>
                        </li>     
                    </ul>
                </li>
                <li  id="fit-out-li" class="nav-item has-sub"   >
                    <a class="d-flex align-items-center" href="#">
                    <i data-feather="slack"></i><span class="menu-title text-truncate" data-i18n="Invoice">
                        Fit Out</span>
                    </a> 
                    <ul class="menu-content"> 
                        <li class="" id="fit-out-enquiries-li"> 
                            <RouterLink :to="'/fitouts/enquiries?type=fitouts'" class="d-flex align-items-center" ><i data-feather="bar-chart-2"></i><span class="menu-title text-truncate" data-i18n="Chat">
                            Fit out Enquiries </span>
                            </RouterLink>
                        </li>  
                        <li class="" id="project-creation-li"> 
                             
                            <RouterLink :to="'/fitouts-projects'" class="d-flex align-items-center" ><i data-feather="plus-square"></i><span class="menu-title text-truncate" data-i18n="Chat">
                                Project Creation</span>
                            </RouterLink>  
                        </li>    
                    </ul>
                </li>
                
            </ul> -->

            <!-- end of sidebar menus  -->

        </div>
    </div>
    <!-- END: Main Menu-->
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { onMounted, ref } from "vue";


var currentRoute = ref("");
const isLogin = ref(null);

const user = localStorage.user?JSON.parse(localStorage.user) : null;


onMounted(()=>{
    var currentUrl = window.location.pathname; 
    // console.log(currentUrl.split("/")[1]);
    currentRoute.value = currentUrl.split("/")[1];
      isLogin.value = localStorage.isLogin??"0"; 

});

// onMounted(() => {   
//     setTimeout(() => {
//         $(".active").removeClass("active");
//         var currentModule = $('.router-link-active').parent().parent().parent().prop('id'); 
//         console.log(currentModule);
//         $("#"+currentModule).addClass("active");   
//     }, 100);
// });
// this.$route.query.page;


</script>

<style lang="scss" scoped>

</style>