<template>
  <div>
    <router-view> </router-view>
    <!-- <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view> -->
     
  </div>
</template>

<script setup>
import {RouterView} from "vue-router";
import {onMounted } from "vue";
 
onMounted(() => {  
    // console.log('mounted');
    // commanJsFiles();
    // external_link.body_script( "/src/assets/app-assets/app-assets/js/core/app-menu.js");
    // external_link.body_script( "/src/assets/app-assets/app-assets/js/core/app.js");

    if(localStorage.theme == 'new'){
        loadStylesheet('/src/assets/app-assets/app-assets/css/change-color-style.css');
    }
    // checkActivePage();
})   


 

</script>

<style lang="scss" scoped>

</style>