<template>
  <div class="row row-auto m-3">
    <div class="col-auto col-sm-12 col-md-12 col-lg-12">
      <!-- Load survey header-->
      <SurveyHeader v-if="CustomerRemote.state && CustomerRemote.state.survey" :dataSurvey="CustomerRemote.state.survey" />

      <!-- Load survey subheader-->
      <SurveySubHeader v-if="project" :dataProject="project" />

      <!--Loader survey checkbox type -->
      <SurveyRadio
        v-for="(box, index1) in CustomerRemote.state.servicesRadio"
        :key="box.id"
        :dataRadio="{ data: box, position: index1 }"
        @changeRadioValue="getRadioUpdatedValue"
      />

      <!--Loader survey textarea type -->
      <SurveyTextArea
        v-for="(tex, index2) in CustomerRemote.state.servicesTextArea"
        :key="tex.id"
        :dataText="{ data: tex, position: index2 }"
        :class="mt - 2"
        @changeTextareaValue="getTextareaUpdatedValue"
      />

      <!--Loader survey text type-->
      <SurveyText
        v-for="(signature, index3) in CustomerRemote.state.servicesText"
        :key="signature.id"
        :dataSignature="{ data: signature, position: index3 }"
        @changeTextValue="getTextUpdatedValue"
      />

      <!--Save survey -->
      <SurveyButton 
      v-if="CustomerRemote.state && (CustomerRemote.state.servicesRadio.length ||
       CustomerRemote.state.servicesText.length ||
      CustomerRemote.state.servicesTextArea.length)
      " 
      :dataSubmission="{answers:serviceResponses, 
      radioData:CustomerRemote.state.servicesRadio,
      textData:CustomerRemote.state.servicesText,
      textareaData:CustomerRemote.state.servicesTextArea
      }" />
    </div>
  </div>
</template>

<script setup>
import SurveyHeader from "../../components/Survey/SurveyHeader.vue";
import SurveySubHeader from "../../components/Survey/SurveySubHeader.vue";
import SurveyRadio from "../../components/Survey/SurveyRadio.vue";
import SurveyTextArea from "../../components/Survey/SurveyTextArea.vue";
import SurveyText from "../../components/Survey/SurveyText.vue";
import SurveyButton from "../../components/Survey/SurveyButton.vue";

import { onMounted, ref, watchEffect } from "vue";
import { services, projectData, surveyData } from "../../data";
import CustomerRemote from "../../../remote/customer_remote";

const project = ref(projectData);
const serviceResponses = ref([]);

// Iniatiliser les reponses

onMounted(() => {
   const surveyId = CustomerRemote.state && CustomerRemote.state.surveys
   && CustomerRemote.state.surveys.length ? CustomerRemote.state.surveys[0].id : 9 ; // Get id from router param
  CustomerRemote.methods.getSurvey(surveyId);
});

// Get response on radio value
function getRadioUpdatedValue(data) {
  let nb =
    CustomerRemote.state.servicesRadio[data.s_index].assertions[data.index]
      .answers[CustomerRemote.state.servicesRadio[data.s_index].type].length;
  for (let i = 0; i < nb; i++) {
    if (i === parseInt(data.key)) {
      CustomerRemote.state.servicesRadio[data.s_index].assertions[
        data.index
      ].answers[CustomerRemote.state.servicesRadio[data.s_index].type][
        i
      ].reponse = true;
    } else {
      CustomerRemote.state.servicesRadio[data.s_index].assertions[
        data.index
      ].answers[CustomerRemote.state.servicesRadio[data.s_index].type][
        i
      ].reponse = false;
    }
    // Update response
  }

  const param = {
    assertion_id:
      CustomerRemote.state.servicesRadio[data.s_index].assertions[data.index]
        .id,
    value: data.value,
    choice_id:
      CustomerRemote.state.servicesRadio[data.s_index].assertions[data.index]
        .answers[CustomerRemote.state.servicesRadio[data.s_index].type][
        data.key
      ].id,
    type: CustomerRemote.state.servicesRadio[data.s_index].type,
  };

  if (!notEXistArray(param)) {
    serviceResponses.value.push(param);
  }

}

// check if item not exist on array
function notEXistArray(data) {
  return serviceResponses.value.find(
    (ans) =>
      ans.assertion_id === data.assertion_id &&
      ans.value === data.value &&
      ans.choice_id === data.choice_id &&
      ans.type === data.type
  );
}

// Get response on text value
function getTextUpdatedValue(data) {
  CustomerRemote.state.servicesText[data.s_index].assertions[
    data.index
  ].answers[CustomerRemote.state.servicesText[data.s_index].type][
    data.key
  ].reponse = data.value;

  serviceResponses.value.push({
    assertion_id:
      CustomerRemote.state.servicesText[data.s_index].assertions[data.index].id,
    choice_id:
      CustomerRemote.state.servicesRadio[data.s_index].assertions[data.index]
        .answers[CustomerRemote.state.servicesRadio[data.s_index].type][
        data.key
      ].id,
    value: data.value,
    type: CustomerRemote.state.servicesText[data.s_index].type,
  });

}

// Get response on text value
function getTextareaUpdatedValue(data) {
  CustomerRemote.state.servicesTextArea[data.s_index].assertions[
    data.index
  ].answers[CustomerRemote.state.servicesTextArea[data.s_index].type][
    data.key
  ].reponse = data.value;

  serviceResponses.value.push({
    assertion_id:
      CustomerRemote.state.servicesTextArea[data.s_index].assertions[data.index]
        .id,
    choice_id:
      CustomerRemote.state.servicesRadio[data.s_index].assertions[data.index]
        .answers[CustomerRemote.state.servicesRadio[data.s_index].type][
        data.key
      ].id,
    value: data.value,
    type: CustomerRemote.state.servicesTextArea[data.s_index].type,
  });

  
}

// Before sending data on server
// Add the choice the user has not selected
</script>