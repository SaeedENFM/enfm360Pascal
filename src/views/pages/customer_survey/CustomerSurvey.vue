 <script setup>
import MasterLayout from "../../layouts/MasterLayout.vue";
import AnswerSurvey from "../../pages/customer_survey/AnswerSurvey.vue";
import StatsSurvey from "../../pages/customer_survey/StatsSurvey.vue";
import CreateSurvey from "../../pages/customer_survey/CreateSurvey.vue";
import ListSurvey from "../../pages/customer_survey/ListSurveys.vue";
import { RouterLink, useRouter } from "vue-router";
import { onUnmounted, ref } from "vue";

const router = useRouter();
// onMounted(() => {
//   $(".active").removeClass("active");
//   var currentModule = $('.router-link-active').parent().parent().parent().prop('id');
//   $("#"+currentModule).addClass("active");

// });

const showTab = ref(false);

onUnmounted(() => {
  showTab.value = true;
});

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
            <!-- Load Answer content -->

            <div class="m-1">
              <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link active"
                    id="surveys-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#surveys"
                    type="button"
                    role="tab"
                    aria-controls="surveys"
                    :aria-selected="showTab"
                  >
                     Surveys
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="create-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#create"
                    type="button"
                    role="tab"
                    aria-controls="create"
                    :aria-selected="!showTab"
                  >
                    Create Survey
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="answers-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#answers"
                    type="button"
                    role="tab"
                    aria-controls="answers"
                     :aria-selected="!showTab"
                  >
                    Answers
                  </button>
                </li>

               <li class="nav-item" role="presentation">
                  <button
                    class="nav-link"
                    id="stats-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#stats"
                    type="button"
                    role="tab"
                    aria-controls="stats"
                     :aria-selected="!showTab"
                  >
                    Stats
                  </button>
                </li>
              </ul>
              <div class="tab-content" id="myTabContent">
                <div
                  class="tab-pane fade"
                  :class="{'show active' : showTab}"
                  id="surveys"
                  role="tabpanel"
                  aria-labelledby="surveys-tab"
                >
                    <ListSurvey />
                </div>
                <div
                  class="tab-pane fade"
                  id="create"
                  role="tabpanel"
                  aria-labelledby="create-tab"
                >
                 <CreateSurvey /> 
                </div>
                <div
                  class="tab-pane fade"
                  id="answers"
                  role="tabpanel"
                  aria-labelledby="answers-tab"
                >
                <AnswerSurvey  /> 
                </div>

                <div
                  class="tab-pane fade"
                  id="stats"
                  role="tabpanel"
                  aria-labelledby="stats-tab"
                >
               <StatsSurvey />
                </div>
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
  