<script setup>
import {ref} from 'vue'
const props = defineProps(["dataCheckbox"]); 

const data = props.data;

</script>

<template>
  <div>

      <table v-for="(service, index) in data" :key="service.id" class="table" >
        <thead>
           
          <tr  v-if="index === 0">
            <th class="border" scope="col">
              {{ service.service_en }} - {{ service.service_ar }}
            </th>

            <th class="border" scope="col" v-for="rep in service.assertions[index].answers[service.type]"
              :key="rep.id"
            >
              {{ rep.answer_en }}<br/>
              {{ rep.answer_en }}

            </th>
         
          </tr>

      <!--colspan="service.assertions[0].answers[service.type].length"-->
         <tr v-if="index !== 0 ">
            <th scope="col">
              {{ service.service_en }} - {{ service.service_ar }}
            </th>
            <th scope="col"  v-for="rep in service.assertions[index].answers[service.type]" :key="rep.id">
            </th>
            
          </tr> 
        </thead>

        <tbody>
          <tr v-for="assertion in service.assertions" :key="assertion.id">
              <td class="border" scope="col">
                {{ service.content_en }} - {{ service.content_ar }}
              </td>    
            
              <td
                v-for="(answer, key) in assertion.answers[service.type]"
                :key="answer.id"
                class="border"
                scope="col"
              >
                <input class="form-control" :value="answer.response" v-model="assertion.answers[service.type][key].response"
                  :id="key+answer.id"
                  type="radio"
                />
              </td>
          </tr>
        </tbody>
      </table>

  </div>
</template>
