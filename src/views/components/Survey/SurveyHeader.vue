<script setup>
 const props = defineProps(['dataProject'])
 const projet = props.dataProject;

</script>

<template>

 <table class="table table-fixed border">   
        <thead>
            <tr>
            <th class="border" scope="col">
                <h1 class="fs-6">  Project Name : {{projet.name}}</h1>
                <h1 class="fs-6">  {{projet.name}} : مشروع</h1>
            </th>
            <th class="border" scope="col">
                <h1 class="fs-6">Location : {{projet.location}} </h1>
                <h1 class="fs-6">{{projet.location}} :الموقع</h1>
            </th>
            <th class="border" scope="col">
                <h1 class="fs-6"> Date :  {{projet.date}}</h1>
                <h1 class="fs-6"> {{projet.date}}: التاريخ</h1>
            </th>
        </tr>       
        </thead>                
    </table>
</template>
