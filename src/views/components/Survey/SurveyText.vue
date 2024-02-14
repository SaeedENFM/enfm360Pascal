<script setup>
import {ref} from 'vue'
const props = defineProps(["dataText"]);
const data = props.dataText;

</script>

<template>
<div>
    <div v-for="tex in data"  :key="tex.id" class="b-0 mt-1 p-12 ">
        <div  v-for="survey in tex.assertions"  :key="survey.id" >
          <label class="text-left">
            {{ survey.content_en }} - {{ survey.content_ar }}
          </label>
          <!--Bind with model later-->
          <div class="col-auto">
            <input  class="form-control"  v-for="answer in survey.answers[tex.type]" :key="answer.id" 
                 @input="$emit('survey-input-text', e.target.value)" type="text" :value="answer.response" />
          </div>

        </div>
      </div>
</div>
</template>
