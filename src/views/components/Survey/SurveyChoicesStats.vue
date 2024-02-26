<template>
   <div class="table-responsive">
        <h3 class="text-primary">Stats by Choices</h3>
        <table class="table table-light  table-bordered border-collapse">
          <thead class="text-center border">
              <th>rating</th>
              <th>criteria</th>
              <th>Preformance rating</th>
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