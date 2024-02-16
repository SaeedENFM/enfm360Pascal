<script setup>
const props = defineProps(["dataSurvey"]);
const survey = props.dataSurvey;
</script>

<template>

    <div class="card">
        <div class="row">

            <div class="col col-12 col-lg-12">
             <h1 class="text-dark text-center fw-bold mt-1">
                {{ survey.title_en }} - {{ survey.title_ar }}
              </h1>
              <p class="fs-4 p-1">
                <span v-if="survey?.description.split('-').length">
                  <strong>{{ survey.description.split("-")[0] }} - </strong>
                  {{ survey.description.split("-")[1] }}</span
                >
                <span v-else>{{ survey.description }}</span>
              </p>
            </div>
            
        </div>
       
    </div>

</template>
