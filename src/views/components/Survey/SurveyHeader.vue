<script setup>
const props = defineProps(["dataSurvey"]);
</script>

<template>

    <div class="card" v-if="props.dataSurvey && props.dataSurvey.title_en">
        <div class="row">

            <div class="col col-12 col-lg-12">
             <h1 class="text-dark text-center fw-bold mt-1">
                {{ props.dataSurvey.title_en }} - {{ props.dataSurvey.title_ar }}
              </h1>
              <p class="fs-4 p-1">
                <span v-if="props.dataSurvey.description && props.dataSurvey.description.split('-').length">
                  <strong>{{ props.dataSurvey.description.split("-")[0] }} - </strong>
                  {{ props.dataSurvey.description.split("-")[1] }}</span
                >
                <span v-else>{{ props.dataSurvey.description }}</span>
              </p>
            </div>
            
        </div>
       
    </div>

</template>
