<script setup>
import {ref} from 'vue'
const props = defineProps(["dataCheckbox"]); 

console.log(props.dataCheckbox)
</script>

<template>
  <div>
    
      <table  class="table table-fixed border" >
        <thead>
           
          <tr  v-if="props.dataCheckbox.data.position === 0">
            <th class="border" scope="col">
              {{ props.dataCheckbox.data.service_en }} - {{ props.dataCheckbox.data.service_ar }}
            </th>

             
            <th class="border" scope="col" 
            v-for="rep in props.dataCheckbox.data.assertions[0].answers[props.dataCheckbox.data.type]"
              :key="rep.id"
            >
              {{ rep.answer_en }}<br/>
              {{ rep.answer_ar }}
              
            </th>
         
          </tr>

      <!--"-->
         <tr v-if="props.dataCheckbox.data.position !== 0 ">
            <th scope="col">
              {{ props.dataCheckbox.data.service_en }} - {{ props.dataCheckbox.data.service_ar }}
            </th>
            <th scope="col" v-for="item in props.dataCheckbox.data.assertions[0].answers[props.dataCheckbox.data.type]" :key="item.id">
          
            </th>
          </tr> 
        </thead>

        <tbody>
          <tr v-for="assertion in props.dataCheckbox.data.assertions" :key="assertion.id">
              <td class="border" scope="col">
                {{ assertion.content_en }} <br/> {{ assertion.content_ar }}
              </td>    
            
              <td
                v-for="(answer, key) in assertion.answers[props.dataCheckbox.data.type]"
                :key="answer.id"
                class="border"
                scope="col"
              >
                <input  :checked="false" v-model="assertion.answers[props.dataCheckbox.data.type][key].response"
                  :id="assertion.id+answer.id+key"

                  type="radio"
                />
              </td>
          </tr>
        </tbody>
      </table>
  </div>
</template>
