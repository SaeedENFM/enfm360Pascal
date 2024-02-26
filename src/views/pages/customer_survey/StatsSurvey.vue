<template>
<div class="card">
       <div class="container container-fluid">
        <div class="row mt-2">
            <div class="col-12 col-md-12 col-lg-6">
                <SurveyAssertionStats :stats="customerData.state.statsByAssertions"/>
            </div>

             <div class="col-12 col-md-12 col-lg-6">
                <SurveyChoicesStats :stats="customerData.state.statsByChoices" />
            </div>
        </div>
    </div> 
</div>

</template>

<script setup>
import { onMounted } from 'vue';
import SurveyAssertionStats from '../../components/Survey/SurveyAssertionStats.vue';
import SurveyChoicesStats from '../../components/Survey/SurveyChoicesStats.vue';
import customerData from '../../../remote/customer_remote';

onMounted(async () => {
  // Service data
  const surveyId = customerData.state && customerData.state.surveys
   && customerData.state.surveys.length ? customerData.state.surveys[0].id : 9 ; // get survey on router
  await customerData.methods.getStatsByAssertions(surveyId);
  await customerData.methods.getStatsByChoices(surveyId);
});
    
</script>