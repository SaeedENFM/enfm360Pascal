<template>
  <div class="card m-1  col-12 col-lg-12 col-sm-12 col-md-12 m-auto">
    <div class="bg-white">
      <h2 class="mt-2 text-center text-primary-600">CREATE SURVEY</h2>
    </div>
    <form class="auth-login-fo m-3">
      <div class="row">
        <div class="col-12 col-lg-6 col-md-6 mb-1">
          <label class="form-label" for="survey-title_en"
            >Title(English) <span class="text-danger">*</span></label
          >
          <input
            class="form-control"
            :class="{'is-valid': survey.title_en.dirty && survey.title_en.valid,
            'is-invalid': survey.title_en.dirty &&!survey.title_en.valid }"
            id="survey-title_en"
            placeholder="Enter english title"
            type="text"
            tabindex="1"
            @change="handleInputChange('title_en', false)"
            @blur="handleInputChange('title_en', true)"
            v-model="survey.title_en.value"
            name="survey-title_en"
          />

        </div>

        <div class="col-12 col-lg-6 col-md-6 mb-1">
          <label class="form-label" for="survey-title_ar"
            >Title(Arabic) <span class="text-danger">*</span></label
          >
          <input
            class="form-control"
            :class="{'is-valid': survey.title_ar.dirty &&survey.title_ar.valid,
            'is-invalid': survey.title_ar.dirty &&!survey.title_ar.valid }"
            id="survey-title_ar"
            placeholder="Enter arabic title"
            type="text"
            tabindex="2"
            @change="handleInputChange('title_ar', false)"
            @blur="handleInputChange('title_ar', true)"
            v-model="survey.title_ar.value"
            name="survey-title_ar"
          />
          
        </div>


        <div class="col-12 col-lg-12 col-md-12 mb-1">
          <label class="form-label" for="survey-description"
            >Description <span class="text-danger">*</span></label
          >
          <textarea
            class="form-control"
            :class="{'is-valid': survey.description.dirty && survey.description.valid,
            'is-invalid': survey.description.dirty &&!survey.description.valid }"
            rows="5"
            id="survey-description"
            placeholder="description"
            @change="handleInputChange('description', false)"
            @blur="handleInputChange('description', true)"
            v-model="survey.description.value"
            name="survey-description"
            tabindex="3"
          ></textarea>
        </div>
      </div>

      <div class="row mb-2">
        <div class="col-12 col-lg-6 col-md-6 mb-1">
          <label class="form-label" for="survey-date-start"
            >Date start
            <span class="text-danger">*</span>
          </label>
          <input
            type="date"
            class="form-control"
            :class="{'is-valid': survey.date_start.dirty &&survey.date_start.valid,
            'is-invalid': survey.date_start.dirty && !survey.date_start.valid }"
            id="survey-date-start"
            placeholder="Date start"
            @change="handleInputChange('date_start', false)"
            @blur="handleInputChange('date_start', true)"
            v-model="survey.date_start.value"
            name="survey-date-start"
            tabindex="5"
          />

        </div>

        <div class="col-12 col-lg-6 col-md-6 mb-1">
          <label class="form-label" for="survey-date-end"
            >Date End
            <span class="text-danger">*</span>
          </label>
          <input
            type="date"
            class="form-control"
            :class="{'is-valid': survey.date_end.dirty && survey.date_end.valid,
            'is-invalid': survey.date_end.dirty && !survey.date_end.valid }"
            id="survey-date-end"
            placeholder="Date End"
            @change="handleInputChange('date_end', false)"
            @blur="handleInputChange('date_end', true)"
            v-model="survey.date_end.value"
            name="survey-date-end"
            tabindex="6"
          />
        </div>
      </div>

      <div class="row bg-light p-1 mb-3">
        <h6 class="text-center">
          SELECT SERVICES<span class="text-danger">*</span>
        </h6>
        <div v-show="loading && survey.reponses.length === 0" class="mb-1">
          <span class="text-danger">You must select a service.</span>
        </div>
      </div>

      <div class="row border p-2">
        <div
          class="col-12 col-md-6 col-lg-4 mb-1"
          v-for="(service, index) in survey.services"
          :key="service.position"
        >
          <SurveyService
            :serviceData="{ position: index, service: survey.services }"
            @serviceChange="getUpdateService"
          />
        </div>
      </div>

      <div v-show="errorMessage" class="mb-1">
        <span class="text-danger">{{ errorMessage }}</span>
      </div>

      <div class="text-center mt-1">
        <button
          class="btn btn-primary w-25 login-btn"
          type="submit"
          @click.prevent="saveSurvey"
        >
          <div
            class="spinner-border text-white d-none login-spinner"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
          <span class="btn-text"> Save</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref, watchEffect } from "vue";
import constents from "../../../constents";
import customerData from "../../../remote/customer_remote";
import { useRouter } from "vue-router";
import SurveyService from "../../components/Survey/SurveyService.vue";

const errorMessage = ref(null);
const token = null; // Get the token for  api serveur
const loading = ref(false);

const survey = ref({
  title_en: {
    value: "",
    validation: {
      required: true,
    },
    validationMessage: "",
    valid: false,
    focus: false,
    dirty: false,
  },
  title_ar: {
    value: "",
    validation: {
      required: true,
    },
    validationMessage: "",
    valid: false,
    focus: false,
    dirty: false,
  },
  description: {
    value: "",
    validation: {
      required: true,
      maxLen: 2000,
    },
    validationMessage: "",
    valid: false,
    focus: false,
    dirty: false,
  },
  date_start: {
    value: "",
    validation: {
      required: true,
    },
    validationMessage: "",
    valid: false,
    focus: false,
    dirty: false,
  },
  date_end: {
    value: "",
    validation: {
      required: true,
    },
    validationMessage: "",
    valid: false,
    focus: false,
    dirty: false,
  },
  user_id: {
    value: 1,
    validation: {
      required: true,
    },
    validationMessage: "",
    valid: true,
    focus: false,
    dirty: true,
  },
  project_id: {
    value: 1,
    validation: {
      required: true,
    },
    validationMessage: "",
    valid: true,
    focus: false,
    dirty: true,
  },
  services: [],
  reponses: [],
});

// init form data
function initFormData() {
  survey.value.title_en.value = "";
  survey.value.title_ar.value = "";
  survey.value.description.value = "";
  survey.value.date_start.value = "";
  survey.value.date_end.value = "";
  survey.value.reponses = [];
  survey.value.services.forEach((service, index) => {
    survey.value.services[index].choice = false;
  });
}

// handle Input change
function handleInputChange(inputName, blur) {
  
  if (blur) {
    let validation = validateForm(inputName);
    survey.value[inputName].valid = validation[0];
    survey.value[inputName].validationMessage = validation[1];
  }
 
  survey.value[inputName].dirty = true;
  survey.value[inputName].focus = blur;
}

// Validate Form
function validateForm(inputName) {
  const input = survey.value[inputName];
  let error = [true, ""];

  if (input.validation.maxLen) {
    const valid = input.value.length <= input.validation.maxLen;
    const message = `${
      !valid ? `Must be less than ${input.validation.maxLen}` : ""
    }`;
    error = valid ? error : [valid, message];
  }

  if (input.validation.pattern) {
    const valid = input.validation.pattern.test(input.value);
    const message = `${!valid ? `This fiels is incorrect` : ""}`;
    error = valid ? error : [valid, message];
  }

  if (input.validation.required) {
    const valid = input.value.trim() !== "";
    const message = `${!valid ? `This field is required !` : ""}`;
    error = valid ? error : [valid, message];
  }

  return error;
}

onBeforeMount(() => {
  loadStylesheet(
    "/src/assets/app-assets/app-assets/css/pages/authentication.css"
  );
});

onMounted(async () => {
  loadJS(
    "/src/assets/app-assets/app-assets/js/scripts/pages/auth-login.js",
    true
  );

  // Service data
  await customerData.methods.getServices();
  survey.value.services = customerData.state.services;
});

// get user choice
function getUpdateService(data) {
  data.choice
    ? (survey.value.reponses[data.index] = { id: data.value })
    : survey.value.reponses.splice(data.index, 1);
}

// Save Input
function saveSurvey() {
  if (
    survey.value.title_en.value &&
    survey.value.title_ar.value &&
    survey.value.description.value &&
    survey.value.user_id.value &&
    survey.value.project_id.value &&
    survey.value.reponses.length &&
    survey.value.date_end >= survey.value.date_start
  ) {
    $(".login-spinner").removeClass("d-none");
    $(".login-text").addClass("d-none");

    loading.value = true;
    var parameters = {
      title_en: survey.value.title_en.value,
      title_ar: survey.value.title_ar.value,
      description: survey.value.description.value,
      date_start: survey.value.date_start.value,
      date_end: survey.value.date_end.value,
      user_id: survey.value.user_id.value,
      project_id: survey.value.project_id.value,
      services: survey.value.reponses,
      nb_max_attempt: 1,
    };

    constents.methods
      .apiCallFunction("survey", parameters)
      .then((response) => {
        loading.value = false;

        $(".login-spinner").addClass("d-none");
        $(".btn-text").removeClass("d-none");

        constents.methods.successToastr("Survey created !");

        initFormData();
      })
      .catch(() => {
        loading.value = false;
        $(".login-spinner").addClass("d-none");
        $(".btn-text").removeClass("d-none");
      });
  } else {
    loading.value = false;
    $(".btn-text").removeClass("d-none");
    $(".login-spinner").addClass("d-none");
    constents.methods.errorToastr("Please check inputs and try again.");
  }
}
</script>
