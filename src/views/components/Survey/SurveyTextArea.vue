<script setup>
import { ref } from "vue";
const props = defineProps(["dataText"]);
</script>

<template>
  <div class="card p-1">
    <div class="row">
      <div class="col col-12 col-lg-12 text-left"
        v-for="(survey, index) in props.dataText.data.assertions"
        :key="survey.id"
      >
        <label class="mt-1 mb-1">
          {{ survey.content_en }} - {{ survey.content_ar }}
        </label>
        <!--Bind with model later e.target.value-->
        
          <textarea
            class="mb-1 form-control"
            placeholder="Enter a text"
            v-for="(answer,key) in survey.answers[props.dataText.data.type]"
            :key="answer.id"
            v-model="
              props.dataText.data.assertions[index].answers[
                props.dataText.data.type
              ][key].response
            "
          >
          </textarea>
      </div>
    </div>
  </div>
</template>
