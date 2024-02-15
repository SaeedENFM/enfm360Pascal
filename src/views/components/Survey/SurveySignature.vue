<script setup>
import { ref } from "vue";
const props = defineProps(["dataSignature"]);
</script>

<template>
  <div>
    <div class="mb-5 pb-4">
      <div
        v-for="(sign, index) in props.dataSignature.data.assertions"
        :key="sign.id"  class="text-right"
      >
        <label class="mb-1">
          {{ sign.content_en }} <br />
          {{ sign.content_ar }}
        </label>
        <!--Bind with model later-->
        <div class="col-auto">
          <input
            type="text"
            class="form-control text-center"
            v-for="(ans, key) in sign.answers[props.dataSignature.data.type]"
            :key="ans.id"
            v-model="
              props.dataSignature.data.assertions[index].answers[
                props.dataSignature.data.type
              ][key].response
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>
