<script setup>
import {ref} from 'vue'
const props = defineProps(["dataText"]);

</script>

<template>
<div>
    <div  class="b-0 mt-1 p-12 ">
        <div  v-for="survey in props.dataText.data.assertions"  :key="survey.id" >
          <label class="text-left">
            {{ survey.content_en }} - {{ survey.content_ar }}
          </label>
          <!--Bind with model later e.target.value-->
          <div class="col-auto">
            <input  class="form-control"  v-for="answer in survey.answers[props.dataText.data.type]" :key="answer.id" 
                  type="text" value="" />
          </div>

        </div>
      </div>
</div>
</template>
