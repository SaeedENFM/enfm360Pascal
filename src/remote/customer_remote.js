import constents from "../constents";
import { reactive } from "vue";

const state = reactive({
    servicesRadio: [],
    servicesTextArea: [],
    servicesText: [],
    surveyData: [],
    survey:{},
    statsByAssertions:[],
    statsByChoices:[],
    surveys : []
})

// get services list
async function getServices() {
   await constents.methods.apiCallFunction2('service').then(reponse => {
        const formatService = [];
         reponse.data.data.forEach(service => {
            formatService.push({choice:false,reponse:service.id, data:service})
         });
         state.services = formatService;
    });
}

// get services list // use surveyId if define
async function getSurvey(surveyId) {
    
    await constents.methods.apiCallFunction2(`survey/${surveyId}`).then(reponse => {
          const data = reponse.data.data;

          if (data.survey) {
            state.survey = data.survey;
          }
         
          if (data.services && data.services.length) {
            state.servicesRadio = data.services.filter((item) => item.type === "radio");
            state.servicesTextArea = data.services.filter((item) => item.type === "textarea");
            state.servicesText = data.services.filter((item) => item.type === "text");
          }

     });
 }

 // get stats by assertions
async function getStatsByAssertions(surveyId) {
    await constents.methods.apiCallFunction2(`resultByAssertions/${surveyId}`).then(reponse => {
          state.statsByAssertions = reponse.data.data;
     });
 }

  // get stats by choices
async function getStatsByChoices(surveyId) {
    await constents.methods.apiCallFunction2(`resultByChoices/${surveyId}`).then(reponse => {
          state.statsByChoices = reponse.data.data;
     });
}

 // get surveys list
  async function getSurveys() {
    await constents.methods.apiCallFunction2(`survey`).then(reponse => {
          state.surveys = reponse.data.data;
    });
}

const methods = {
    getServices,
    getSurvey,
    getStatsByAssertions,
    getStatsByChoices,
    getSurveys
}


export default {
    state,
    methods
}