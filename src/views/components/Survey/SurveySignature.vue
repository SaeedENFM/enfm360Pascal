<script setup>
import { ref } from "vue";
const props = defineProps(["dataSignature"]);

</script>

<template>
  <div>
   
    <div
      class="b-0 mt-1 p-12 mb-3"
    >
      <div v-for="sign in props.dataSignature.data.assertions" :key="sign.id">
        <label>
          {{ sign.content_en }} <br />
          {{ sign.content_ar }}
        </label>
        <!--Bind with model later-->
        <div class="col-auto">
          <input
            class="form-control"
            v-for="ans in sign.answers[props.dataSignature.data.type]"
            :key="ans.id"
            value=""
            type="file"
          />
        </div>
      </div>
    </div>
  </div>
</template>
