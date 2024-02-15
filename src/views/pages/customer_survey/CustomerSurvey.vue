 <script setup>
import MasterLayout from "../../layouts/MasterLayout.vue";
import SurveyHeader from "../../components/Survey/SurveyHeader.vue";
import SurveyCheckbox from "../../components/Survey/SurveyCheckbox.vue";
import SurveyText from "../../components/Survey/SurveyText.vue";
import SurveySignature from "../../components/Survey/SurveySignature.vue";

import { ref } from "vue";
import { services, projectData, surveyData } from "../../data";

import { RouterLink, useRouter } from "vue-router";

const router = useRouter();
const survey = ref(surveyData);
const project = ref(projectData);

const servicesRadio = ref(services.filter((item) => item.type === "radio"));

const servicesText = ref(services.filter((item) => item.type === "textarea"));

const servicesSignature = ref(services.filter((item) => item.type === "text"));

// onMounted(() => {
//   $(".active").removeClass("active");
//   var currentModule = $('.router-link-active').parent().parent().parent().prop('id');
//   $("#"+currentModule).addClass("active");

// });
</script>

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
                <h3 class="content-header-title float-start mb-0">
                  Customer Survey
                </h3>
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
        <div class="content-body">
          <div
            class="d-flex justify-content-center"
            style="height: calc(-7px + 100vh)"
          >
            <div>

              <!-- body content -->
              <h1 class="text-dark text-center fw-bold mt-1">
                {{ survey.title_en }} - {{ survey.title_ar }}
              </h1>
              <p class="fs-4 p-1">
                <span v-if="survey?.description.split('-').length">
                  <strong>{{ survey.description.split("-")[0] }} - </strong>
                  {{ survey.description.split("-")[1] }}</span
                >
                <span v-else>{{ survey.description }}</span>
              </p>

              <!-- load survey header-->
              <SurveyHeader :dataProject="project" />

              <form class="form">
                <!--Loader survey checkbox type -->
                <SurveyCheckbox
                  v-for="(box, index1) in servicesRadio"
                  :key="box.id"
                  :dataCheckbox="{ data: box, position: index1 }"
                />

                <!--Loader survey text type -->
                <SurveyText
                  v-for="(tex, index2) in servicesText"
                  :key="tex.id"
                  :dataText="{ data: tex, position: index2 }"
                  :class="mt-2"
                />

                <!--Loader survey signature type-->
                <SurveySignature
                  v-for="(signature, index3) in servicesSignature"
                  :key="signature.id"
                  :dataSignature="{ data: signature, position: index3 }"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- END: Content-->
  </MasterLayout>
</template>
  
 
  
<style>
.dtr-bs-modal table tbody tr:first-child {
  display: none !important;
}
.text-left {
  text-align: left;
}
</style>
  