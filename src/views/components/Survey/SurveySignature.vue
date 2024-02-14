<script setup>
import { ref } from "vue";
const props = defineProps(["dataSignature"]);
const data = props.dataSignature;
</script>

<template>
  <div>
    <div
      v-for="signature in data"
      :key="signature.id"
      class="b-0 mt-1 p-12 mb-3"
    >
      <div v-for="sign in signature.assertions" :key="sign.id">
        <label>
          {{ sign.content_en }} <br />
          {{ sign.content_ar }}
        </label>
        <!--Bind with model later-->
        <div class="col-auto">
          <input
            class="form-control"
            v-for="ans in sign.answers[signature.type]"
            :key="ans.id"
            value="ans.response"
            type="file"
          />
        </div>
      </div>
    </div>
  </div>
</template>
