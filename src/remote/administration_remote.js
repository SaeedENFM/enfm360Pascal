

import { reactive } from "vue";
// import FullCalendar from '@fullcalendar/vue3'

import  constents  from "../constents";
// import  users_list_datatable  from "../datatables/administration/users_list_datatable";

const  users_list_datatable = null ;


const token = constents.state.token;
const baseUrl = constents.state.baseUrl;
 
var isRtl = $('html').attr('data-textdirection') === 'rtl';

 


const state = reactive({
    loading:false,
    enquiryloading:false,
    errorMessage:null,  
    isEditable:true, 
    user: localStorage.user?JSON.parse(localStorage.user) : null,

    userDetails:null, 
    userTypes:[],
    staffsList:[],
    clientsList:[],
    suppliersList:[],
    rolesWithUsersCount:[],
    currentRoleId:0,
    currentUserId:0,
});

const methods ={

    getUserDetails(parameters){
        getUserDetails(parameters);
    }, 
    getUserTypes(parameters){
        getUserTypes(parameters)
    },
    getUserInfo(parameters){
        getUserInfo(parameters)
    },
    addNewUser(parameters){
        addNewUser(parameters)
    },
    assignContract(parameters){
        assignContract(parameters)
    },
    getRolesWithUserCount(){
        getRolesWithUserCount()
    },
    setCurrentRoleId(currentRoleId){
        setCurrentRoleId(currentRoleId)
    },
    roleModulesSaveUpdate(){
        roleModulesSaveUpdate()
    },
    applicationRoleSaveUpdate(){
        applicationRoleSaveUpdate()
    },
    async changePassword(parameters){
       await changePassword(parameters)
    }
}

function setCurrentRoleId(currentRoleId) {
    state.currentRoleId = currentRoleId
}

function getUserDetails(parameters) {   
    state.currentUserId = parameters.user_id;
   constents.methods.apiCallFunction('get-user-details',parameters).then((response)=>{
        state.userDetails = response.data[0];  
        $('.user-info-card').find('.blockUI').addClass('d-none');
    });  
}//end of getUserDetails

function getUserTypes(parameters) {   
    constents.methods.loader("#editUser .modal-content",0);   
   constents.methods.apiCallFunction('get-user-types',parameters).then((response)=>{
        state.userTypes = response.data;   
        var parameters = {
            user_id:'1'
          }; 
          getUserInfo(parameters);
        
    });  
}//end of getUserTypes

function getUserInfo(parameters) {      
   constents.methods.apiCallFunction('get-user-info',parameters).then((response)=>{
        state.staffsList = response.data.staffsList;   
        state.clientsList = response.data.clientsList;  
        state.suppliersList = response.data.supliersList;   
        constents.methods.loader("#editUser .modal-content",1);   
    });  
}//end of getUserInfo

function addNewUser(parameters) {   
    constents.methods.loader(".modal-slide-in .modal-dialog",0);   
    constents.methods.apiCallFunction('add-new-user',parameters).then((response)=>{
        constents.methods.loader(".modal-slide-in .modal-dialog",1);   
        $("#editUser").modal("toggle");
        constents.methods.successToastr("User profile added/updated");
        var parameters = {
            user_id: state.currentUserId,
        }
        $("#modals-slide-in").modal('toggle');

        users_list_datatable.state.usersDataTable.clear().draw();

        users_list_datatable.methods.getusersList(parameters).then(function (response) {
            users_list_datatable.state.usersDataTable.clear().draw();
            users_list_datatable.state.usersDataTable.rows.add(users_list_datatable.state.usersList).draw(); 
        });
        
    });  
}//end of addNewUser

 async function assignContract(parameters) {      
    await constents.methods.apiCallFunction('assign-contract',parameters).then((response)=>{
        
    });  
}//end of assignContract

async function getRolesWithUserCount() {     
    constents.methods.loader(null,0); 
    var parameters = {};
    await constents.methods.apiCallFunction('roles-with-users-count',parameters).then((response)=>{
        state.rolesWithUsersCount = response.data;
        constents.methods.loader(null,1); 
    });  
}//end of getRolesWithUserCount

async function changePassword(parameters) {  
    constents.methods.loader("#changePasswordPopup .modal-dialog",0);  
 
    console.log(parameters);

    await constents.methods.apiCallFunction('user-change-password',parameters).then((response)=>{
        
        constents.methods.loader("#changePasswordPopup .modal-dialog",1);  
        constents.methods.successToastr("Your password changed successfully !")
    });  

}//end of applicationRoleSaveUpdate

  
async function applicationRoleSaveUpdate() {  
    constents.methods.loader("#addRoleModal .modal-dialog",0);  

    var parameters = {
        Id:state.currentRoleId,
        roleName:$('.modalRoleName').val(),
        defautlPage: $("#menus-list :selected").val()
    }; 
    console.log(parameters);

    await constents.methods.apiCallFunction('application-role-save-update',parameters).then((response)=>{
        var roleId = response.data[0].Id;
        roleModulesSaveUpdate(roleId)
        // constents.methods.successToastr("Role's Modules saved/updated")
    });  

    // roleModulesSaveUpdate(12);


}//end of applicationRoleSaveUpdate

async function roleModulesSaveUpdate(roleId) {      
    var parameters = roleModulesSaveUpdateParameters(roleId);
    console.log('parameters');
    console.log(parameters);

    await constents.methods.apiCallFunction('assign-role-module-menu',parameters).then((response)=>{
        constents.methods.loader("#addRoleModal .modal-dialog",1);  
        constents.methods.successToastr("Role's Modules saved/updated")
        $("#addRoleModal").modal("toggle");
        getRolesWithUserCount();
        // users_with_role_datatable.methods.getuserRolesList();
    });  

}//end of roleModulesSaveUpdate

function roleModulesSaveUpdateParameters(roleId) {
    // var parameters = [];
    // $(".selected-modules" ).each(function( index ) {  
    //     var param = { 
    //         Id: $(this).val(),
    //         ModuleId: $(this).attr("data-moduleId"), 
    //         RoleId: roleId, 
    //         Active : $(this).is(":checked") ? 1 : 0, 
    //     } 
    //     parameters.push(param);
        
    // });

    var selectedModules = $(".roleModule-menu:checkbox")
    .map(function () {
      var roleModule = {
        // Id: $(this).val()??0,
        Id: $(this).attr("data-id")??0, 
        ModuleID: $(this).attr("data-roleModuleId"), 
        MenuID: $(this).attr("data-menuId"),  
        RoleID: roleId,   
        Active : $(this).is(":checked") ? 1 : 0, 
      };
      return roleModule;
    })
    .get();

    const parameters = { 
        selected_modules: JSON.stringify(selectedModules),
    };

    return parameters;
}
 



function formatDateToSave(date) { 
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(); 
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-'); 
}

async function apiCallFunction(apiEndPoint, parameters) {
     
    // return "data";
        state.loading = true;
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
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
 
}//end of apiCallFunction

function successToastr(msg) {
    toastr['success'](msg, 'Success!', {
        closeButton: true,
        tapToDismiss: false,
        rtl: isRtl
    }); 
}


export default { 
    state,
    methods,
};