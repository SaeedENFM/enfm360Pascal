<template>
<div class="card">
    
<div class="row m-1">

    <div class="col-12 col-md-12 col-lg-12">

<div class="table-responsive">

        <table class="table table-light  table-bordered">

        <thead>
              <th>Title EN</th>
              <th>Title Arabic</th>
              <th>Description</th>
              <th>Date start</th>
              <th>Date end</th>
        </thead>

        <tbody class="border border-collapse">
            <tr v-for="(survey,index) in customerData.state.surveys" :key="index">
                <td>{{survey.title_en}}</td>
                <td>{{survey.title_ar}}</td>
                <td>{{survey.description}}</td>
                <td>{{survey.date_start}}</td>
                <td>{{survey.date_end}}</td>
            </tr>
        </tbody>
    </table>
</div>
</div>
    </div>
    
</div>
</template>

<script setup>
import { onMounted } from 'vue';
import customerData from '../../../remote/customer_remote';

onMounted(async () => {
  // Survey data
  await customerData.methods.getSurveys();
});

</script>