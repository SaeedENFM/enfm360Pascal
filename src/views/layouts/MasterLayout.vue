<template>
            <HeaderLayout/>

        <SidebarLayout/>
        <div class="outer-section"> 
            <input type="hidden" name="j-w-t" class="j-w-t" :value="token">
            <input type="hidden" name="baseUrl" class="baseUrl" :value="baseUrl">

            <!-- <span  class="j-w-t d-none" >{{ token }} </span>
            <span  class="baseUrl d-none" > {{ baseUrl }} </span>  -->

            <slot> </slot>
        

        </div>

        <div class="sidenav-overlay"></div>
        <div class="drag-target"></div>


        <FooterLayout/> 
    

</template>

<script setup>
import {onMounted,onActivated,inject, onBeforeMount, } from "vue";

import  * as external_link from '../extarnal_links.js';

import  menu from '../../assets/menu';
import  appJs from '../../assets/appJs';
import  constents from '../../constents';



import FooterLayout from './FooterLayout.vue';
import HeaderLayout from './HeaderLayout.vue';
import SidebarLayout from './SidebarLayout.vue';
const token = inject('token');
const baseUrl = inject('baseUrl');


$(document).ready(function () {
    if (feather) {
        feather.replace({
            width: 14,
            height: 14
        });
    }
}) 

onBeforeMount(()=>{
    constents.methods.clearCache();
})

// onActivated(()=>{
//     // console.log('activated');
    
// })
onMounted(() => {  
    if (feather) {
        feather.replace({
            width: 14,
            height: 14
        });
    }

    // console.log('mounted');
     // commanJsFiles();

    menu.methods.loadMenuJs();
    appJs.methods.loadAppJs();

    // external_link.body_script( "/src/assets/app-assets/app-assets/js/core/app-menu.js");
    // external_link.body_script( "/src/assets/app-assets/app-assets/js/core/app.js");


    if(localStorage.theme == 'new'){
        $('.app-content').addClass("color-theme");
        $('head').append(`<link rel="stylesheet" type="text/css" href="/src/assets/app-assets/app-assets/css/change-color-style.css">`)
        // loadStylesheet('/src/assets/app-assets/app-assets/css/change-color-style.css?version=1.0.1');
    }else{
        $('.app-content').removeClass("color-theme");
    }

    // checkActivePage();

    $('.dataTables_info').parent().parent().removeClass('mb-1');
    $('.dataTables_info').parent().parent().addClass('mb-3');
})  


// onBeforeMount(() => {  
//     console.log('before mounted'); 
// });



function commanJsFiles() {
    // external_link.body_script("/src/assets/app-assets/app-assets/vendors/js/vendors.min.js");

    external_link.body_script("/src/assets/app-assets/app-assets/vendors/js/extensions/toastr.min.js");
    external_link.body_script("/src/assets/app-assets/app-assets/vendors/js/tables/datatable/jquery.dataTables.min.js");
    external_link.body_script("/src/assets/app-assets/app-assets/vendors/js/tables/datatable/dataTables.bootstrap5.min.js");
    external_link.body_script("/src/assets/app-assets/app-assets/vendors/js/tables/datatable/dataTables.responsive.min.js");
    external_link.body_script("/src/assets/app-assets/app-assets/vendors/js/tables/datatable/responsive.bootstrap5.js");
    external_link.body_script("/src/assets/app-assets/app-assets/vendors/js/tables/datatable/datatables.buttons.min.js");

    external_link.body_script("/src/assets/app-assets/app-assets/vendors/js/tables/datatable/buttons.bootstrap5.min.js");
    external_link.body_script("/src/assets/app-assets/app-assets/vendors/js/tables/datatable/datatables.checkboxes.min.js");
    external_link.body_script("/src/assets/app-assets/app-assets/vendors/js/forms/validation/jquery.validate.min.js");
    external_link.body_script("/src/assets/app-assets/app-assets/vendors/js/forms/select/select2.full.min.js");
    external_link.body_script("/src/assets/app-assets/app-assets/vendors/js/tables/datatable/jszip.min.js");
    external_link.body_script("/src/assets/app-assets/app-assets/vendors/js/tables/datatable/vfs_fonts.js");
    external_link.body_script("/src/assets/app-assets/app-assets/vendors/js/tables/datatable/pdfmake.min.js");
    external_link.body_script("/src/assets/app-assets/app-assets/vendors/js/tables/datatable/buttons.html5.min.js");
    external_link.body_script("/src/assets/app-assets/app-assets/vendors/js/tables/datatable/buttons.print.min.js");
    external_link.body_script("/src/assets/app-assets/app-assets/vendors/js/tables/datatable/dataTables.rowGroup.min.js");
    external_link.body_script("/src/assets/app-assets/app-assets/vendors/js/forms/cleave/cleave.min.js");
    external_link.body_script("/src/assets/app-assets/app-assets/vendors/js/forms/cleave/addons/cleave-phone.us.js");

    external_link.body_script("/src/assets/app-assets/app-assets/vendors/js/pickers/pickadate/picker.js");
    external_link.body_script("/src/assets/app-assets/app-assets/vendors/js/pickers/pickadate/picker.date.js");
    external_link.body_script("/src/assets/app-assets/app-assets/vendors/js/pickers/pickadate/picker.time.js");
    external_link.body_script("/src/assets/app-assets/app-assets/vendors/js/pickers/pickadate/legacy.js");
    external_link.body_script("/src/assets/app-assets/app-assets/vendors/js/extensions/sweetalert2.all.min.js");

    external_link.body_script("/src/assets/app-assets/app-assets/vendors/js/extensions/polyfill.min.js");
    external_link.body_script("/src/assets/app-assets/app-assets/vendors/js/extensions/moment.min.js");
    external_link.body_script("/src/assets/app-assets/app-assets/vendors/js/forms/wizard/bs-stepper.min.js");
    external_link.body_script("/src/assets/app-assets/app-assets/vendors/js/file-uploaders/dropzone.min.js");

    external_link.body_script("/src/assets/app-assets/app-assets/vendors/js/extensions/jstree.min.js");
    external_link.body_script("/src/assets/app-assets/app-assets/vendors/js/pickers/flatpickr/flatpickr.min.js");

    
}

onMounted(()=>{ 
    $(".active").removeClass("active"); 
    var currentModule = $('.router-link-active').parent().parent().parent().prop('id');  
    if(currentModule){
        $("#"+currentModule).addClass("active");  
    }
})
 

function checkActivePage() {
    $('.router-link-active').parent().closest('li').addClass('active');
}

</script>

<style > 


</style>