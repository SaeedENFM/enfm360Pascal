<script setup>
 const props = defineProps(['projet'])

</script>

<template>

 <table class="table table-fixed border">
        <thead>
            <tr>
            <th class="border" scope="col">
                <h1 class="fs-6">  Project Name : {{props.projet.name}}</h1>
                <h1 class="fs-6">  {{props.projet.name}} : مشروع</h1>
            </th>
            <th class="border" scope="col">
                <h1 class="fs-6">Location : {{props.projet.location}} </h1>
                <h1 class="fs-6">{{props.projet.location}} :الموقع</h1>
            </th>
            <th class="border" scope="col">
                <h1 class="fs-6"> Date :  {{props.projet.date}}</h1>
                <h1 class="fs-6"> {{props.projet.date}}: التاريخ</h1>
            </th>
        </tr>       
        </thead>                
    </table>
 
</template>
