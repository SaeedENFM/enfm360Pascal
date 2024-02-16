<script setup>
import { ref } from "vue";
const props = defineProps(["dataSubmission"]);

function submitSurvey() {
    console.log("Submit Survey")
    console.log(props.dataSubmission);
}

</script>

<template>
  <div class="card">
    <div class="row">
      <div  class="col col-12 col-lg-12 text-center"
      >
       <div class="m-1">
            <button type="submit" @click.prevent="submitSurvey" :disabled="props?.dataSubmission.length===0" class="btn btn-full btn-success" >SAVE YOUR ANSWER</button>
       </div>
      </div>
    </div>
  </div>
</template>
