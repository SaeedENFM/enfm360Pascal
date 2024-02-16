 <script setup>
import MasterLayout from "../../layouts/MasterLayout.vue";
import SurveyHeader from "../../components/Survey/SurveyHeader.vue";
import SurveySubHeader from "../../components/Survey/SurveySubHeader.vue";
import SurveyRadio from "../../components/Survey/SurveyRadio.vue";
import SurveyTextArea from "../../components/Survey/SurveyTextArea.vue";
import SurveyText from "../../components/Survey/SurveyText.vue";
import SurveyButton from "../../components/Survey/SurveyButton.vue";

import { ref } from "vue";
import { services, projectData, surveyData } from "../../data";
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();
const survey = ref(surveyData);
const project = ref(projectData);

const servicesRadio = ref(services.filter((item) => item.type === "radio"));
const servicesTextArea = ref(services.filter((item) => item.type === "textarea"));
const servicesText = ref(services.filter((item) => item.type === "text"));
const serviceResponses = ref([]);

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

          <!-- body content -->
        <div class="content-body">
          <div
            class="d-flex justify-content-center"
            style="height: calc(-7px + 100vh)"
          >
            <div class="row row-auto m-3">
              <div class="col-auto col-sm-12 col-md-12 col-lg-12">

               <!-- Load survey header-->
              <SurveyHeader :dataSurvey="survey" />

              <!-- Load survey subheader-->
              <SurveySubHeader :dataProject="project" />

                <!--Loader survey checkbox type -->
                <SurveyRadio
                  v-for="(box, index1) in servicesRadio"
                  :key="box.id"
                  :dataRadio="{ data: box, position: index1 }"
                />

                <!--Loader survey textarea type -->
                <SurveyTextArea
                  v-for="(tex, index2) in servicesTextArea"
                  :key="tex.id"
                  :dataText="{ data: tex, position: index2 }"
                  :class="mt-2"
                />

                <!--Loader survey text type-->
                <SurveyText
                  v-for="(signature, index3) in servicesText"
                  :key="signature.id"
                  :dataSignature="{ data: signature, position: index3 }"
                />

                <!--Save survey -->
                <SurveyButton :dataSubmission="serviceResponses" />
            
            </div>
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
  