 <script setup>
import { ref } from "vue";
import MasterLayout from "../../layouts/MasterLayout.vue";
import SurveyHeader from "../../components/Survey/SurveyHeader.vue";
import SurveyChecboxBody from "../../components/Survey/SurveyCheckboxBody.vue";
import SurveyText from "../../components/Survey/SurveyText.vue";
import SurveySignature from "../../components/Survey/SurveySignature.vue";
import services from "../../data";

import { RouterLink, useRouter } from "vue-router";

const router = useRouter();

const survey = {
  title_en: "Customer Survey",
  title_ar: "استبيان رضى العملاء",
  description: `Your Opinion Counts - Our goal is your satisfaction. 
                    We strive to provide the best services for you.
                   So please take a moment to let us know how we are doing!`,
};

const project = ref({
  name: "ENFM",
  location: "Dubai",
  date: "2024-02-16",
});

const servicesRadio = ref(services.filter((item) => item.type === "radio"));
const servicesText = ref(services.filter((item) => item.type === "text"));
const servicesSignature = ref(
  services.filter((item) => item.type === "signature")
);

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

              <!--@survey-input-text=""-->
      
              <SurveyHeader :projet="project" />

              <SurveyChecboxBody
                v-for="box in servicesRadio"
                :key="box.id"
                :dataCheckbox="box"
              />

              <SurveyText
                v-for="tex in servicesText"
                :key="tex.id"
                :dataText="tex"
              />
              <SurveySignature
                v-for="signature in servicesSignature"
                :key="signature.id"
                :dataSignature="signature"
              />
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
  