<template>
            <div class="form-check" >
                <input class="form-check-input" type="checkbox" :id="'flexCheckChecked'+props.serviceData.position" 
                v-model="props.serviceData.service[props.serviceData.position].choice"
                :checked="props.serviceData.service[props.serviceData.position].choice"
                @change="handlerInputChange(props.serviceData.position)"
                 />
                 <label class="form-check-label" :for="'flexCheckChecked'+props.serviceData.position">{{props.serviceData.service[props.serviceData.position].data.service_en}}</label>
            </div>
</template>

<script setup>

const props = defineProps(['serviceData']);
const emit = defineEmits(['serviceChange']);

function handlerInputChange(index) {
    // emit the change to parent component
    emit('serviceChange', {index, 
    choice: props.serviceData.service[props.serviceData.position].choice, 
    value:props.serviceData.service[props.serviceData.position].reponse});
}


</script>