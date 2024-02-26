<script setup>
import { ref } from "vue";
const props = defineProps(["dataRadio"]);
const emit = defineEmits(['changeRadioValue']);

function updatedSurveyRadioResponse(index, key) {
  emit('changeRadioValue',{
    s_index : props.dataRadio.position,
    index, 
     key, 
    choice: props.dataRadio.data.assertions[index].reponse ? true:false,
    value: props.dataRadio.data.assertions[index].reponse 
  })

}
</script>

<template>
  <div class="card" v-if="props.dataRadio">
    <div class="row">
      <div class="col col-12 col-lg-12">
        <table class="table table-fixed border border-collapse">
          <thead>
            <!--LOAD ANSWERS-->
            <tr>
              <th
                class="text-left"
                :class="{ border: props?.dataRadio?.position === 0 }"
                scope="col"
              >
                <h3>
                  {{ props.dataRadio.data.service_en }} -
                  {{ props.dataRadio.data.service_ar }}
                </h3>
              </th>

              <!--ANSWERS HEADER -->
              <th
                scope="col"
                class="text-center border text-sm font-thin capitalize"
                :style="{ width: rep.answer_en.length + 'px' }"
                v-for="rep in props.dataRadio.data.assertions[
                  props?.dataRadio?.position
                ].answers[props.dataRadio.data.type]"
                :key="rep.id"
              >
                <!--Make all column fit suitable size -->
                ({{ rep.answer_en }}<br />
                {{ rep.answer_ar }})    
              </th>
            </tr>
          </thead>

          <tbody>
            <!--LOAD CHOICES-->
            <tr
              v-for="(assertion, index) in props.dataRadio.data.assertions"
              :key="assertion.id"
            >
              <td class="border" scope="col">
                <p>
                  {{ assertion.content_en }} <br />
                  {{ assertion.content_ar }}
                </p>
              </td>

              <td
                v-for="(answer, key) in assertion.answers[
                  props.dataRadio.data.type
                ]"
                :key="answer.id"
                class="border"
                :style="{ width: answer.answer_en.length + 'px' }"
                scope="col"
              >
                <div class="form-check">
                  <input
                    class="form-check-input"
                    :name="'surveyRadio' + assertion.id + index + key"
                    @change="updatedSurveyRadioResponse(index, key)"
                    :value="props.dataRadio.data.assertions[index].answers[props.dataRadio.data.type][key].id"
                    :checked="props.dataRadio.data.assertions[index].answers[props.dataRadio.data.type][key].reponse"
                    v-model="props.dataRadio.data.assertions[index].reponse"
                    :id="assertion.id + answer.id + key"
                    type="radio"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style>
.form-check .form-check-input {
  display: block;
  margin: auto;
}
</style>
