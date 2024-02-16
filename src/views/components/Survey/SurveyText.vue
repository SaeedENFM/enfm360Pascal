<script setup>
import { ref } from "vue";
const props = defineProps(["dataSignature"]);
</script>

<template>
  <div class="card p-1">
    <div class="row">
      <div
        v-for="(sign, index) in props.dataSignature.data.assertions"
        :key="sign.id"  class="col col-12 col-lg-12 text-right"
      >
        <label class="mt-1 mb-1">
          {{ sign.content_en }} -
          {{ sign.content_ar }}
        </label>
        <!--Bind with model later-->
       <div class="mb-1">
          <input
                  type="text"
                  placeholder="Enter a text"
                  class="form-control text-left"
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
