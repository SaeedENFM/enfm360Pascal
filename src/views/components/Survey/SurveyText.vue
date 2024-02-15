<script setup>
import { ref } from "vue";
const props = defineProps(["dataText"]);
</script>

<template>
  <div>
    <div class="mb-2">
      <div
        v-for="(survey, index) in props.dataText.data.assertions"
        :key="survey.id"
      >
        <label class="text-left">
          {{ survey.content_en }} - {{ survey.content_ar }}
        </label>
        <!--Bind with model later e.target.value-->
        <div class="col-auto">
          <textarea
            class="form-control"
            v-for="(answer, key) in survey.answers[props.dataText.data.type]"
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
  </div>
</template>
