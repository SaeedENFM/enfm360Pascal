<script setup>
import { ref } from "vue";
const props = defineProps(["dataCheckbox"]);
</script>

<template>
  <div>
    <table class="table table-fixed border border-collapse">
      <thead>
        <!--LOAD ANSWERS-->
        <tr>
          <th
            :class="{ 'border': props?.dataCheckbox?.position === 0 }"
            scope="col"
          >
            {{ props.dataCheckbox.data.service_en }} -
            {{ props.dataCheckbox.data.service_ar }}
          </th>

          <!--ANSWERS HEADER -->
          <th
            scope="col"  class="text-center text-sm font-thin capitalize"
            :class="{ 'border': props?.dataCheckbox?.position === 0 }" :style="{'min-width' : rep.answer_en.length + 'px'  }"
            v-for="rep in props.dataCheckbox.data.assertions[
              props?.dataCheckbox?.position
            ].answers[props.dataCheckbox.data.type]"
            :key="rep.id"
          >
            <!--Make that all column fit suitable size -->
            {{ props.dataCheckbox.position === 0 ? rep.answer_en : " " }}<br />
            {{ props.dataCheckbox.position === 0 ? rep.answer_ar : " " }}
          </th>
        </tr>
      </thead>

      <tbody>
        <!--LOAD CHOICES-->
        <tr
          v-for="(assertion, index) in props.dataCheckbox.data.assertions"
          :key="assertion.id"
        >
          <td class="border" scope="col">
            {{ assertion.content_en }} <br />
            {{ assertion.content_ar }}
          </td>

          <td
            v-for="(answer, key) in assertion.answers[
              props.dataCheckbox.data.type
            ]"
            :key="answer.id"
            class="border text-center"
            :style="{'width' : answer.answer_en.length + 'px'}"
            scope="col"
          >

            <input
              :checked="false"
              v-model="
                props.dataCheckbox.data.assertions[index].answers[
                  props.dataCheckbox.data.type
                ][key].response
              "
              :id="assertion.id + answer.id + key"
              type="radio"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
