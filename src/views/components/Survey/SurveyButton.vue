<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import constents from "../../../constents";
import CustomerRemote from "../../../remote/customer_remote";

const props = defineProps(["dataSubmission"]);
const loading = ref(false);

// Loader style
onBeforeMount(() => {
  loadStylesheet(
    "/src/assets/app-assets/app-assets/css/pages/authentication.css"
  );
});

onMounted(async () => {
  loadJS(
    "/src/assets/app-assets/app-assets/js/scripts/pages/auth-login.js",
    true
  );
});

function submitSurvey() {
  const answers = [];
  let required = false;

  if (
    (props.dataSubmission.radioData &&
    props.dataSubmission.radioData.length > 0) ||
     (props.dataSubmission.textData &&
    props.dataSubmission.textData.length > 0) ||
     (props.dataSubmission.textareaData &&
    props.dataSubmission.textareaData.length > 0)

  ) {

    // Replace by the user Id
    const participantId = Math.floor(Math.random()*100 + 1) || 1;

    // Get radio answers
    props.dataSubmission.radioData.forEach((data, index) => {
      data.assertions.forEach((asser, key) => {
        let hasAnswer = false;
        asser.answers[data.type].forEach((ans, i) => {
          if (ans.reponse && !hasAnswer) {
            hasAnswer = true;
          } 
        });

        // Format  response
        if (!hasAnswer) {
          answers.push({
            survey_id: CustomerRemote.state.survey.id,
            service_id: data.id,
            assertion_id: asser.id,
            type:data.type,
            reponse: "",
            comment: "No complaint",
            participant_id: participantId,
          });
        } else if (hasAnswer) {
          answers.push({
            survey_id: CustomerRemote.state.survey.id,
            service_id: data.id,
            assertion_id: asser.id,
            type:data.type,
            reponse: asser.reponse,
            comment: "",
            participant_id: participantId,
          });
        }
      });
    });

      //  Get textarea answer
     props.dataSubmission.textareaData.forEach((data, index) => {
      data.assertions.forEach((asser, key) => {
        let answer = "";
        asser.answers[data.type].forEach((ans, i) => {
          if (ans.reponse) {
            answer ? (answer += "\n\n" + ans.reponse) : (answer = ans.reponse);
          }
        });

        // Format  response
     if (!required &&answer) {
          answers.push({
            survey_id: CustomerRemote.state.survey.id,
            service_id: data.id,
            assertion_id: asser.id,
            type:data.type,
            reponse: answer,
            comment: "",
            participant_id: participantId,
          });
        } else {
          required = true;
        }
      });
    });

     // Get text answer
     props.dataSubmission.textData.forEach((data, index) => {
      data.assertions.forEach((asser, key) => {
        let answer = "";
        asser.answers[data.type].forEach((ans, i) => {
         if (ans.reponse) {
            answer ? (answer += "\n\n" + ans.reponse) : (answer = ans.reponse);
          }
        });

        // Format  response
        if (!required &&answer) {
          answers.push({
            survey_id: CustomerRemote.state.survey.id,
            service_id: data.id,
            assertion_id: asser.id,
            type:data.type,
            reponse: answer,
            comment: "",
            participant_id: participantId,
          });
        } else {
          required = true;
        }
      });
    });



    if (required) {
      constents.methods.errorToastr(
        "Please fill open answer of survey. Thank you !"
      );
    } else {
      // call api to save data
      $(".login-spinner").removeClass("d-none");
      $(".login-text").addClass("d-none");

      loading.value = true;

      console.log(answers);
      const parameters = { answers: answers };

      constents.methods
        .apiCallFunction("savesurvey", parameters)
        .then((response) => {
          loading.value = false;

          $(".login-spinner").addClass("d-none");
          $(".btn-text").removeClass("d-none");

          if (response && response.status === "success") {
           constents.methods.successToastr(
            "Your answer has been succesfully saved !"
          );
            // Get update survey

           CustomerRemote.methods.getSurvey(response.data[0].survey_id);
          }

        })
        .catch(() => {
          loading.value = false;
          $(".login-spinner").addClass("d-none");
          $(".btn-text").removeClass("d-none");
        });
    }
  } else {
    constents.methods.errorToastr("There is not answer to save");
  }
}
</script>

<template>
  <div class="card">
    <div class="row">
      <div class="col col-12 col-lg-12 text-center">
        <div class="m-1">
          <button
            type="submit"
            @click.prevent="submitSurvey"
            :disabled="props?.dataSubmission?.answers.length === 0"
            class="btn btn-full btn-success"
          >
            <div
              class="spinner-border text-white d-none login-spinner"
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
            <span class="btn-text"> SAVE YOUR ANSWER</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
