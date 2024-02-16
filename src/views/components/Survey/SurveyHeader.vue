<script setup>
const props = defineProps(["dataProject"]);
const projet = props.dataProject;
</script>

<template>
  <table class="table table-fixed border">
    <thead>
      <tr>
        <th class="border" scope="col">
          <h3 class="fs-6 text-left">Project Name : {{ projet.name }}</h3>
          <h3 class="fs-6 text-right">{{ projet.name }} : مشروع</h3>
        </th>
        <th class="border" scope="col">
          <h3 class="fs-6 text-left">Location : {{ projet.location }}</h3>
          <h3 class="fs-6 text-right">{{ projet.location }} :الموقع</h3>
        </th>
        <th class="border" scope="col">
          <h3 class="fs-6 text-left">Date : {{ projet.date }}</h3>
          <h3 class="fs-6 text-right">{{ projet.date }}: التاريخ</h3>
        </th>
      </tr>
    </thead>
  </table>
</template>
