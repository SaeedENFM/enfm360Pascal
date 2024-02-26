<script setup>
import { ref } from "vue";
const props = defineProps(["dataSignature"]);
const emit = defineEmits(['changeTextValue']);

function updatedSurvetTextResponse(index, key) {
  emit('changeTextValue',{
    s_index : props.dataSignature.position,
    index, 
     key, 
    choice: props.dataSignature.data.assertions[index].reponse[key] ? true:false,
    value: props.dataSignature.data.assertions[index].reponse[key]
  })
}
</script>

<template>
  <div class="card p-1" v-if="props.dataSignature">
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
                  :placeholder="ans.answer_en"
                  class="form-control text-left"
                  v-for="(ans, key) in sign.answers[props.dataSignature.data.type]"
                  :key="ans.id"
                  v-model="
                    props.dataSignature.data.assertions[index].reponse[key]
                  "
                  @change="updatedSurvetTextResponse(index,key)"
                />
       </div>
      </div>
    </div>
  </div>
</template>
