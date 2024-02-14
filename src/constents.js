import { reactive } from "vue";
import axios from 'axios';


var user = localStorage.user?JSON.parse(localStorage.user) : null;


const token = user?.token ? user?.token : "eyJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6IklDTVNDU1IiLCJ1c2VyX25hbWUiOiJJQ01TQ1NSIn0.0ZbKPG-l8ILtIKX2a3QwLXU_kZnCtqcenjw_nR7LlU4";
// const baseUrl = 'http://localhost:8000/api/';
const baseUrl = 'https://enfm360-backand.emiratesnfm.ae/api/'; 

var isRtl = $('html').attr('data-textdirection') === 'rtl';
 
const state = reactive({
    token:token, 
    baseUrl:baseUrl,
    data_not_found:"No data available in table" ,
    noOfColumnToShow:19,
    user: localStorage.user?JSON.parse(localStorage.user) : null,
    version:23,
    direction : 'ltr',
});

const methods ={
    async apiCallFunction(apiEndPoint, parameters){
        return apiCallFunction(apiEndPoint, parameters);
    }, 
    successToastr(msg){
        successToastr(msg)
    },
    errorToastr(msg){
        errorToastr(msg)
    },
    formatDateToSave(date){
        return formatDateToSave(date)
    },
    loader(element,timeout){
        loader(element,timeout)
    },
    priceFormat(price){
       return priceFormat(price);
    },
    savePriceFormat(price){
        return savePriceFormat(price);
    },
    formatDate(date){
       return formatDate(date)
    },
    setNoOfColumnToShow(cols){
        setNoOfColumnToShow(cols);
    },
    noDataHtml(){
       return noDataHtml();
    },
    clearCache(){
        clearCache();
    },
    featherIcons(){
        featherIcons();
    }

};

async function apiCallFunction(apiEndPoint, parameters) {
     
    return axios
      .post(baseUrl+apiEndPoint,
        parameters,
        {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,  
                'Access-Control-Allow-Origin': '*',
                // 'Access-Control-Allow-Origin': 'https://enfm360.emiratesnfm.ae'
            },
        }
        )
      .then(async response => {
        // console.log(response); 
        const data = response.data;

        state.loading = false;
        console.log(data); 
        if (response.statusText != 'OK') { 
            const error = (data && data.message) || response.status;
              
              errorToastr(error);
            return Promise.reject(error);
        }else{
            return data;
            // state.enquirySourceList = data.data;
        }

    })
    .catch(error => {
        state.errorMessage = error; 
        if (error.response) {
             
            console.log('error.response.data');
            console.log(error.response.data.error);
            console.log(error.response.data);
            if(error.response.status != 200){
                errorToastr(error.response.data.message);
            }
            if(error.response.status == 401 || error.response.status == 403){
                window.location.href = "/un-authorized";
            }
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) { 
            console.log('error.request');
            console.log(error.request);

        } else {
            
            console.log('Error', 'error.message');
            
            console.log('Error', error.message);
        }
          console.log('error.config');
          console.log(error.config);

    });
}

async function apiCallFunctionOld(apiEndPoint, parameters) {
     
    // return "data";
        state.loading = true;
        const requestOptions = {
            method: 'POST',
            // mode:"no-cors",
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,  
                // 'Access-Control-Allow-Origin': 'https://enfm360.emiratesnfm.ae'
            },
            body: JSON.stringify(parameters)
        };
        return fetch(baseUrl+apiEndPoint, requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            state.loading = false;
            console.log(data);
            // return data;
            // check for error response
            if (!response.ok) { 
                const error = (data && data.message) || response.status;
                 
                toastr['error'](error, 'Error!', {
                    closeButton: true,
                    tapToDismiss: false,
                    rtl: isRtl
                  });
                return Promise.reject(error);
            }else{
                return data;
                // state.enquirySourceList = data.data;
            }
    
        })
        .catch(error => {
            state.errorMessage = error;
            console.error("There was an error!", error);
        });
 
       
};//end of apiCallFunction

function featherIcons() {
    if (feather) {
        feather.replace({
            width: 14,
            height: 14
        });
    }
}

function noDataHtml() {
    var noDataHtml = `
            <tbody class="w-100">
              <tr class='text-center w-100 text-black'> 
                <td colspan="100%"> No data available in table  </td>
              <tr>
            </tbody>
          `; 
    return noDataHtml;
}

function setNoOfColumnToShow(cols) {
    if(cols){
        if(cols > 2){
          var newCols = parseInt(cols) - 1; 
          state.noOfColumnToShow = newCols;
        }
    }
}

function successToastr(msg) {
    toastr['success'](msg, 'Success!', {
        closeButton: true,
        tapToDismiss: false,
        rtl: isRtl
    }); 
};

function errorToastr(msg) {
    toastr['error'](msg, 'Error!', {
        closeButton: true,
        tapToDismiss: false,
        rtl: isRtl
    }); 
};

function loader(element,timeout) {
    $(element??'.content-body').block({
        message: '<div class="spinner-border text-primary" role="status"></div>',
        timeout: timeout,
        css: {
          backgroundColor: 'transparent',
          border: '0'
        },
        overlayCSS: {
          backgroundColor: '#fff',
          opacity: 0.8
        }
    });
}

function formatDateToSave(date) { 
    if(date){
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(); 
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-'); 
    }else{
        return "";
    }
}
function priceFormat(price) {
    if (price) {
        // console.log(price);
        var newPrice = Intl.NumberFormat().format(price);
        newPrice = newPrice.toLocaleString("en", {useGrouping: false, minimumFractionDigits: 2});
        var checkDecimal =  newPrice.split('.');
          
        if(checkDecimal.length == 1){
            newPrice = newPrice+".00";
        } 
        return newPrice ;
        // const dec = newPrice.split('.')[1]
        // const len = dec && dec.length > 2 ? dec.length : 2
        // return Number(newPrice).toFixed(len);
    
    }else{
        return "";
    }
}
function savePriceFormat(price) {

    

    if (price) {
        return price.replace(/,/g, ''); 
    }else{
        return  price
    }
}

function formatDate(date) { 
    if(date){
        date = date.trim();  
        var mydate = new Date(date); 
        var month = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"][mydate.getMonth()];
        var day = parseInt(mydate.getDate()) <= 9 ? '0'+mydate.getDate() : mydate.getDate() ;
        var formatedDate = day+ ' ' + month + ' ' + mydate.getFullYear();
        return formatedDate;
    }else{
        return "";
    }
}

function clearCache() {
    var oldVersion = localStorage.version;
    // console.log(oldVersion);
    if(oldVersion){ 
        if(parseInt(state.version) > parseInt(oldVersion)){
            $.ajax({
                url: "",
                context: document.body,
                success: function(s,x){ 
                    $('html[manifest=saveappoffline.appcache]').attr('content', '');
                        $(this).html(s);
                }
            }); 
            localStorage.version = state.version; 
        }
    }else{
        if(parseInt(state.version) > parseInt(oldVersion)){
            $.ajax({
                url: "",
                context: document.body,
                success: function(s,x){ 
                    $('html[manifest=saveappoffline.appcache]').attr('content', '');
                        $(this).html(s);
                }
            }); 
        }
        localStorage.version = 1; 
    }
}

export default { 
    state,
    methods,
};