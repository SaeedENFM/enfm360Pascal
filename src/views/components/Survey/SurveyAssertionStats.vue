<template>
<div class="table-responsive">
    <h3 class="text-primary">Stats by Assertions</h3>
        <table class="table table-light  table-bordered border-collapse">

        <thead class="text-center border">
              <th scope="col">rating</th> 
              <th scope="col">criteria</th>
              <th scope="col">Preformance rating</th>
        </thead>

        <tbody>
            <tr v-for="(stat,index) in props.stats" :key="index">
                <td>{{stat.rating}}</td>
                <td>{{stat.criteria}}</td>
                <td>{{stat.performance_rating}}</td>
            </tr>
        </tbody>
    </table>
</div>

</template>

<script setup>
  const props = defineProps(['stats']);

</script>