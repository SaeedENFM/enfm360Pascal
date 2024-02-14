$(function () {
  ('use strict');

  
  var token = $('.j-w-t').val();
  var baseUrl = $('.baseUrl').val();
  var isRtl = $('html').attr('data-textdirection') === 'rtl'

  var dtPiplineEnquiesTable = $('.pipline-enquiries-table'),
    dtClientsListTable = $('.clients-list-table'),
    dtEnquiryHistoryTable = $('.enquiry-history-table'),
    dtEnquiryFollowUpTable = $('.enquiry-followups-table'),
    dtEnquiryAttachmentsTable = $('.enquiry-attachments-table'),

    newUserSidebar = $('.new-user-modal'),
    newUserForm = $('.add-new-user'),
    select = $('.select2'),
    dtContact = $('.dt-contact'),
    statusObj = {
      Won: { title: 'WON', class: 'badge-light-success' },
      OPEN: { title: 'OPEN', class: 'badge-light-warning' }, 
      Submitted: { title: 'Submitted', class: 'badge-light-info' }, 
      UnderPreparation: { title: 'Under Preparation', class: 'badge-light-info' }
    };

  function formatDate(date) {
      var mydate = new Date(date);
      var month = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"][mydate.getMonth()];
      var day = parseInt(mydate.getDate()) <= 9 ? '0'+mydate.getDate() : mydate.getDate() ;
      var formatedDate = day+ ' ' + month + ' ' + mydate.getFullYear();
      return formatedDate;
  }

  var statusList = [
    {
        "Id": "1",
        "StatusName": "OPEN"
    },
    {
        "Id": "5",
        "StatusName": "Under Preparation"
    },
    {
        "Id": "10",
        "StatusName": "Potential Business"
    },
    {
        "Id": "15",
        "StatusName": "Not To Bid"
    },
    {
        "Id": "20",
        "StatusName": "Submitted"
    },
    {
        "Id": "25",
        "StatusName": "Shortlisted"
    },
    {
        "Id": "30",
        "StatusName": "BAFO"
    },
    {
        "Id": "35",
        "StatusName": "Revised"
    },
    {
        "Id": "40",
        "StatusName": "Cancelled"
    },
    {
        "Id": "45",
        "StatusName": "Lost"
    },
    {
        "Id": "50",
        "StatusName": "Won"
    }
  ];

  var scopesList = [
    {
        "Id": "2",
        "ContractTypeName": "Hard Services", 
    },
    {
        "Id": "3",
        "ContractTypeName": "Outsource Services", 
    },
    {
        "Id": "4",
        "ContractTypeName": "Security Services", 
    },
    {
        "Id": "5",
        "ContractTypeName": "Soft Services", 
    },
    {
        "Id": "7",
        "ContractTypeName": "TFM Services", 
    },
    {
        "Id": "8",
        "ContractTypeName": "Fit-out", 
    },
    {
        "Id": "10",
        "ContractTypeName": "B2C HS", 
    },
    {
        "Id": "11",
        "ContractTypeName": "B2C SS", 
    },
    {
        "Id": "12",
        "ContractTypeName": "B2C AMC", 
    }
  ];

  var assetPath = '/src/assets/app-assets/app-assets/',
      userView = '/administration/user/12';

  // if ($('body').attr('data-framework') === 'laravel') {
  //   assetPath = $('body').attr('data-asset-path');
  //   userView = assetPath + 'app/user/view/account';
  // }

  select.each(function () {
    var $this = $(this);
    $this.wrap('<div class="position-relative"></div>');
    $this.select2({
      // the following code is used to disable x-scrollbar when click in select input and
      // take 100% width in responsive also
      dropdownAutoWidth: true,
      width: '100%',
      dropdownParent: $this.parent()
    });
  });
  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  } 
  // $(document).on('click','.edit-btn',function (e) {
  //   // alert('check');
  //   e.preventDefault();
  // })
  function convertToInternationalCurrencySystem (labelValue) {

      // Nine Zeroes for Billions
      return Math.abs(Number(labelValue)) >= 1.0e+9

      ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
      // Six Zeroes for Millions 
      : Math.abs(Number(labelValue)) >= 1.0e+6

      ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
      // Three Zeroes for Thousands
      : Math.abs(Number(labelValue)) >= 1.0e+3

      ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"

      : Math.abs(Number(labelValue));

  }
  function addDays(theDate, days) {
    return new Date(theDate.getTime() + days*24*60*60*1000);
  }
  var piplineEnquiesTable;
  // dtPiplineEnquiesTable datatable
  enquiryDataTable();
  function enquiryDataTable() {
     
    if (dtPiplineEnquiesTable.length) {
      // console.log('inside enquiry list table');
      piplineEnquiesTable = dtPiplineEnquiesTable.DataTable({
        ajax: {
          'type': 'POST',  
          'url': baseUrl+'get-pending-pipline-enquires',
          'data': {
            user_id: '1',   
          },
          "beforeSend": function (xhr) {
            xhr.setRequestHeader('Authorization',
                "Bearer " + token);
          }, 
      }, 
      "drawCallback": function (settings) {  
          var response = settings.json;
          // console.log('response first');
          // console.log(response);
          var totalEnquires = 0; 
          var totalOpenEnquires = 0;
          var totalSubmittedEnquires = 0;
          var totalWonEnquires = 0;
          // if(response){ 
          //     response.data.forEach(full => {
          //       totalEnquires = parseInt(totalEnquires)+1;  
          //       if(full['STATUS'] == "OPEN"){
          //         totalOpenEnquires = parseInt(totalOpenEnquires)+1;  
          //       }else if(full['STATUS'] == "Submitted"){
          //         totalSubmittedEnquires = parseInt(totalSubmittedEnquires)+1;  
          //       }else if(full['STATUS'] == "Won"){
          //         totalWonEnquires = parseInt(totalWonEnquires)+1;  
          //       }  
          //     });
          //     $('.total-enquires').html(totalEnquires);
          //     $('.total-open-enquires').html(totalOpenEnquires); 
          //     $('.total-submitted-enquires').html(`${totalSubmittedEnquires }`);
          //     $('.total-won-enquires').html(`${ totalWonEnquires }`);
               
          // } 

          // console.log('filter data'); 
          var filterDataLength = dtPiplineEnquiesTable.DataTable().rows( { filter : 'applied'} ).nodes().length;
          // console.log('filterDataLength');
          // console.log(filterDataLength);
          var totalEnquiresAmount = 0;
          var totalOpenEnquiresAmount = 0;
          var totalSubmittedEnquiresAmount = 0;
          var totalWonEnquiresAmount = 0;
          var totalDueDateEnquires = 0;

          var filterData = dtPiplineEnquiesTable.DataTable().rows( { filter : 'applied'} ).data();
          if(filterDataLength > 0 ){
            for (let index = 0; index < filterDataLength; index++) {
              const data = filterData[index];
              totalEnquires = parseInt(totalEnquires)+1; 
              totalEnquiresAmount = parseFloat(totalEnquiresAmount) + parseFloat(data['TotalProjectVal']);

                if(data['STATUS'] == "OPEN" || data['STATUS'] == "Under Preparation" || data['STATUS'] == "Potential Business" || data['STATUS'] == "Revised"){ 
                  totalOpenEnquires = parseInt(totalOpenEnquires)+1;  
                  totalOpenEnquiresAmount = parseFloat(totalOpenEnquiresAmount) + parseFloat(data['TotalProjectVal']);
                  // console.log(data['SubmissionDate']); 
                  // var currentDate = new Date();
                  var currentDate = addDays(new Date(), 7); 
                  // console.log(addDays(new Date(), 7));
                  var submissionDate = new Date(data['SubmissionDate']);
                   
                  if(data['SubmissionDate'] != null && currentDate > submissionDate){
                    // console.log(data['STATUS']);
                    // console.log("due date");
                    totalDueDateEnquires = parseInt(totalDueDateEnquires) + 1; 
                  }
                    
                }else if(data['STATUS'] == "Submitted" || data['STATUS'] == "Shortlisted" || data['STATUS'] == "BAFO"){
                  totalSubmittedEnquires = parseInt(totalSubmittedEnquires)+1;  
                  totalSubmittedEnquiresAmount = parseFloat(totalSubmittedEnquiresAmount) + parseFloat(data['TotalProjectVal']);
                }else if(data['STATUS'] == "Won"){
                  totalWonEnquires = parseInt(totalWonEnquires)+1; 
                  totalWonEnquiresAmount = parseFloat(totalWonEnquiresAmount) + parseFloat(data['TotalProjectVal']);
                }  

            } 

            $('.total-enquires').html(`${totalEnquires} / ${convertToInternationalCurrencySystem(totalEnquiresAmount) } <span> AED </span>`);
            $('.total-open-enquires').html(`${totalOpenEnquires} / ${convertToInternationalCurrencySystem(totalOpenEnquiresAmount) } <span> AED </span>`); 
            $('.total-submitted-enquires').html(`${totalSubmittedEnquires } / ${convertToInternationalCurrencySystem(totalSubmittedEnquiresAmount) } <span> AED </span>`);
            $('.total-won-enquires').html(`${ totalWonEnquires } / ${convertToInternationalCurrencySystem(totalWonEnquiresAmount) } <span> AED </span>`);
            // $('.annual-amount').html(`${Intl.NumberFormat().format(totalAnnualAmount) } <span> AED </span>`);
            // console.log('totalDueDateEnquires');
            // console.log(totalDueDateEnquires);

            $('.due-date-enquires').html(`Due for submission : ${ totalDueDateEnquires } `);
            
          }
          // console.log(filterData); 


      }
        , // JSON file to add data
        columns: [
          // columns according to JSON
          { data: '' },//0
          { data: 'RowNum' },//1
          { data: 'ENQUIRY #' },//2
          // { data: 'Emirate' }, 
          { data: 'ENQUIRY DATE' },//3
          { data: 'SubmissionDate' },//4
          { data: 'Scope' },//5
          { data: 'CUSTOMER NAME' },//6
          { data: 'ENQUIRY DESCRIPTION' },//7 
          { data: 'AnnualProjectVal' },//8
          { data: 'TotalProjectVal' },//9
          { data: 'STATUS' },//10 
          { data: 'SPECIAL REMARKS' },//11
          // { data: 'Scope' },//10
          // { data: 'CUSTOMER NAME' },//11

          // { data: 'ENQUIRY SOURCE' },
          // { data: 'YOC' },
          // { data: 'ENQUIRY DATE' }, 
          { data: 'ClientCode' },//12
          // { data: 'Awarddate' },
          { data: 'STATUS' }, //13
          { data: 'Scope' }, //14
          { data: 'ENQUIRY DATE' },//15 
          { data: 'ENQUIRY DESCRIPTION' },//16
          { data: 'SPECIAL REMARKS' },//17
          { data: 'SubmissionDate' },//18
          { data: 'CUSTOMER NAME' },//19
          { data: 'AnnualProjectVal' },//20
          { data: 'TotalProjectVal' },//21



  
          // { data: '' }
        ],
        columnDefs: [
          {
            // For Responsive
            // className: 'control',
            orderable: false,
            responsivePriority: 2,
            targets: 0,
            render: function (data, type, full, meta) { 
              // console.log('data');
              // console.log(data);

              // <span class="" > ${feather.icons['eye'].toSvg({ class: 'font-medium-2 text-body' })} </span> 

              var output = `
                <div class="d-flex ">
                <a href="/edit-enquiry/${full['Id']}" class="text-center text-warning" > 
                ${feather.icons['external-link'].toSvg({ class: 'font-medium-2' })} 
                View
                </a> 
                
                <a class="ms-2 edit-enquiry-btn text-primary text-center" data-enquiry-id="${full['Id']}" data-enquiry-no="${full['ENQUIRY #']}" data-enquiry-typeId="${full['EnquiryTypeId']}" data-assignTo="${full['AssignedTo']}"  data-salesPerson="${full['SalesPersonId']}" data-enquiryDate="${full['ENQUIRY DATE']}"> 
                  ${feather.icons['edit'].toSvg({ class: 'font-medium-2 text-primary' })} 
                   Update 
                </a>
                </div>
              `;
              return output;
            }
          },
          {
            // Code //Reference Code
            targets: 1, 
            width:"45px",
            render: function (data, type, full, meta) {  
                
              var output = `<div class="input-group input-group-merge text-center" style="width:40px">
                ${full['RowNum']}
               </div>`;
              return output; 
            }
          },
          {
            // Code //enquiry date
            targets: 3, 
            render: function (data, type, full, meta) {  
               

              var output = `<div class="input-group input-group-merge" style="width:110px">
                <span> ${formatDate(full['ENQUIRY DATE']) } </span>
              </div>`;
              
              return output; 
            }
          },
          {
            // Code //submission date
            targets: 4,
            // responsivePriority: 4,
            orderable: false,
            render: function (data, type, full, meta) {  
               

              var output = `<div class="input-group input-group-merge" style="width:100px">
                <span> ${formatDate(full['SubmissionDate']) } </span>
                
                <input type="hidden" class=" submission-date-${full['Id']}" value="${full['SubmissionDate']}"  placeholder="18 June, 2023" />
              </div>`;
              return output; 
            }
          },
          
          {
            // contract type
            targets: 5,
            orderable: false,
            render: function (data, type, full, meta) { 
              var scopeHtml = '';
              // console.log(full['ProductionTypeID']);
              scopesList.forEach(scope => {
                var html = `
                  <option value = "${scope.Id}" ${scope.Id == full['ProductionTypeID'] ? 'selected' : '' } > ${scope.ContractTypeName} </option>
                `;
                scopeHtml = scopeHtml + html;
              });
              var output = `
                <div style="width:150px">
                <select class=" form-select enquiry-type enquiry-type-${full['Id']}" readonly >  
                    ${scopeHtml}
                </select>
                <div>
                  `;

 
              return `<span> ${full['Scope']} 
              <input type="hidden" readonly class="form-control enquiry-type-${full['Id']}" value="${full['ProductionTypeID']}" placeholder="Enter Customer Name"  />

              </span>`;
            }
          },
          {//customer name
            targets: 6,
            orderable: false,
            width:"120px",
            className:'max-width',
            render: function (data, type, full, meta) { 
              var output = `<div class="input-group input-group-merge" style="width:210px">
              <span> ${full['CUSTOMER NAME']} </span>
              <input type="hidden" readonly class="form-control customer-name-${full['Id']}" value="${full['CUSTOMER NAME']}" placeholder="Enter Customer Name"  />
              <input type="hidden"   class="client-id-${full['Id']}" value="${full['ClientId']}">
              <button class="btn-icon btn btn-primary btn-round btn-sm add-customer-btn" data-enquiry-id="${full['Id']}" type="button"  >
               
               ${feather.icons['plus'].toSvg({ class: 'font-medium-2' })}
             </button> 
               
            </div>`;
            
              return ` 
               
              <input type="text" readonly class="form-control " value="${full['CUSTOMER NAME']}" placeholder="Enter Customer Name"  />
                
                <input type="hidden" readonly class="form-control customer-name-${full['Id']}" value="${full['CUSTOMER NAME']}" placeholder="Enter Customer Name"  />
                <input type="hidden"   class="client-id-${full['Id']}" value="${full['ClientId']}">
              
              `;
            }
          },
          
          {//Description
            targets: 7,
            orderable: false,
            render: function (data, type, full, meta) { 
              var output = `<div   style="width: 230px">
              <textarea readonly class="form-control description description-${full['Id']}" id="exampleFormControlTextarea1" rows="3" placeholder="Enter Enquiry Description"
                style="height: 30px;">${full['ENQUIRY DESCRIPTION'] }</textarea> 
            </div>`; 
              return output;
            }
          },
          {//annual project value
            targets: 8,
            orderable: false,
            render: function (data, type, full, meta) { 
              // <span> ${Intl.NumberFormat().format(full['AnnualProjectVal'])} </span>
              var output = `<div class="input-group input-group-merge" style="width:100px">
              <input type="text" class="form-control price-input annual-project-value-${full['Id']}" value="${Intl.NumberFormat().format(full['AnnualProjectVal'])}" placeholder="Enter Annual project value"  />
               
            </div>`;

              return output;
            }
          },
          {//total project value
            targets: 9,
            orderable: false,
            render: function (data, type, full, meta) { 
              // <span> ${Intl.NumberFormat().format(full['TotalProjectVal'])} </span>
              var output = `<div class="input-group input-group-merge" style="width:100px">
              
              <input type="text" class="form-control price-input total-project-value-${full['Id']}" value="${Intl.NumberFormat().format(full['TotalProjectVal'])}" data-totalProjectVal = "${full['TotalProjectVal']}" placeholder="Enter Annual project value"  />
               
            </div>`;

              return output;
            }
          },
          {
            // contract Status
            targets: 10,
            orderable: false,
            render: function (data, type, full, meta) {
              var $loginEnabled = full['STATUS']; 
              var statusHtml = '';
              statusList.forEach(status => {
                var html = `
                  <option value = "${status.Id}" ${status.Id == full['StatusId'] ? 'selected' : '' } > ${status.StatusName} </option>
                `;
                statusHtml = statusHtml + html;
              });
              var output = `
                <div style="width:140px">
                <select class=" form-select enquiry-status enquiry-status-${full['Id']}"  >  
                    ${statusHtml}
                </select>
                <div>
                  `;
 
              return output;
            }
          },
          
          {//remarks
            targets: 11,
            orderable: false,
            render: function (data, type, full, meta) { 
              var output = `<div   style="width: 230px">
              <textarea class="form-control description remarks-${full['Id']}" id="exampleFormControlTextarea1" rows="3" placeholder="Enter Remarks"
                style="height: 30px;">${full['SPECIAL REMARKS'] }</textarea> 
            </div>`;

              return output;
            }
          },
          
          
          
          
           
          // {//enquiry date
          //   targets: 12,
          //   render: function (data, type, full, meta) { 
          //     var output = `<div class="input-group input-group-merge" style="width:150px">
          //       <input type="text" class="form-control received-date enquiry-date-${full['Id']}" value="${full['ClientCode']}"   placeholder="18 June, 2023" />
          //     </div>`;
          //     return output;  
          //   }
          // }, 
          {
            targets:13,
            visible:false
          },
          {
            targets:14,
            visible:false
          },
          {
            targets:15,
            visible:false
          },
          {
            targets:16,
            visible:false
          },
          {
            targets:17,
            visible:false
          },
          {
            targets:18,
            visible:false
          },
          {
            targets:19,
            visible:false
          },
          {
            targets:20,
            visible:false
          },
          {
            targets:21,
            visible:false
          },
          
          
           
        ],
        order: [[1, 'asc']],
        dom:
          '<"d-flex justify-content-between align-items-center header-actions mx-2 row mt-75"' +
          '<"col-sm-12 col-lg-4 d-flex justify-content-center justify-content-lg-start search-input-section" l>' +
          '<"col-sm-12 col-lg-8 ps-xl-75 ps-0"<"dt-action-buttons enquiries-dt-action-buttons d-flex align-items-center justify-content-center justify-content-lg-end flex-lg-nowrap flex-wrap"<"me-1"f>B>>' +
          '>t' +
          '<"d-flex justify-content-between mx-2 row mb-1"' +
          '<"col-sm-12 col-md-6"i>' +
          '<"col-sm-12 col-md-6"p>' +
          '>',
        
        language: {
          sLengthMenu: 'Show _MENU_',
          search: 'Search',
          searchPlaceholder: 'Search..'
        },
        // Buttons with Dropdown
        buttons: [
          // {
          //   extend: 'collection',
          //   className: 'btn btn-outline-secondary dropdown-toggle me-2',
          //   text: feather.icons['share'].toSvg({ class: 'font-small-4 me-50' }) + 'Export',
          //   buttons: [
          //     {
          //       extend: 'print',
          //       text: feather.icons['printer'].toSvg({ class: 'font-small-4 me-50' }) + 'Print',
          //       className: 'dropdown-item',
          //       exportOptions: { columns: [3, 4, 5, 6, 7] }
          //     },
          //     {
          //       extend: 'csv',
          //       text: feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) + 'Csv',
          //       className: 'dropdown-item',
          //       exportOptions: { columns: [3, 4, 5, 6, 7] }
          //     },
          //     {
          //       extend: 'excel',
          //       text: feather.icons['file'].toSvg({ class: 'font-small-4 me-50' }) + 'Excel',
          //       className: 'dropdown-item',
          //       exportOptions: { columns: [3, 4, 5, 6, 7] }
          //     },
          //     {
          //       extend: 'pdf',
          //       text: feather.icons['clipboard'].toSvg({ class: 'font-small-4 me-50' }) + 'Pdf',
          //       className: 'dropdown-item',
          //       exportOptions: { columns: [3, 4, 5, 6, 7] }
          //     },
          //     {
          //       extend: 'copy',
          //       text: feather.icons['copy'].toSvg({ class: 'font-small-4 me-50' }) + 'Copy',
          //       className: 'dropdown-item',
          //       exportOptions: { columns: [3, 4, 5, 6, 7] }
          //     }
          //   ],
          //   init: function (api, node, config) {
          //     $(node).removeClass('btn-secondary');
          //     $(node).parent().removeClass('btn-group');
          //     setTimeout(function () {
          //       $(node).closest('.dt-buttons').removeClass('btn-group').addClass('d-inline-flex');
          //     }, 50);
          //   }
          // },
          { 
            extend: 'excel',
            text: 'Export',
            className: ' btn btn-primary',
            // attr: {
            //   'data-bs-toggle': 'modal',
            //   'data-bs-target': '#modals-slide-in'
            // },
            exportOptions: { columns: [1,2,3,4,5,19,16,20,21,13,11,12] },
            init: function (api, node, config) {
              $(node).removeClass('btn-secondary');
            }
          },
          // {  
          //   text: 'Add New',
          //   className: 'mx-1 btn btn-success ',
          //   attr: {
          //     // 'data-bs-toggle': 'modal',
          //     // 'data-bs-target': '#addEnquiryModel'
          //     'href': '/add-enquiry', 
          //   },
          //   init: function (api, node, config) {
          //     $(node).removeClass('btn-secondary');
          //   }
          // }
        ],
        // For responsive popup
        // responsive: {
        //   details: {
        //     display: $.fn.dataTable.Responsive.display.modal({
        //       header: function (row) {
        //         var data = row.data();
        //         return 'Details of ' + data['ENQUIRY #'];
        //       }
        //     }),
        //     type: 'column',
        //     renderer: function (api, rowIdx, columns) {
        //       var data = $.map(columns, function (col, i) {
        //         return col.columnIndex !== 6 // ? Do not show row in modal popup if title is blank (for check box)
        //           ? '<tr data-dt-row="' +
        //               col.rowIdx +
        //               '" data-dt-column="' +
        //               col.columnIndex +
        //               '">' +
        //               '<td>' +
        //               col.title +
        //               ':' +
        //               '</td> ' +
        //               '<td>' +
        //               col.data +
        //               '</td>' +
        //               '</tr>'
        //           : '';
        //       }).join('');
        //       return data ? $('<table class="table"/>').append('<tbody>' + data + '</tbody>') : false;
        //     }
        //   }
        // },
        language: {
          paginate: {
            // remove previous & next text from pagination
            previous: '&nbsp;',
            next: '&nbsp;'
          }
        },
        initComplete: function () {
          // alert('done');
          // Adding role filter once table initialized 
          
          $('.enquiry-status').select2();
          

          $(document).on("click",".add-customer-btn",function () {
             
          // $(".add-customer-btn").on('click',function (e) {
            // console.log('check click');
            var enquiryId = $(this).attr('data-enquiry-id');
            $('.current-enquiry-id').val(enquiryId);
            $('#showClientsModel').modal('toggle');
          })
          filterDate();
          $(document).on("click",".edit-enquiry-btn",function (e) {
            // console.log('check click');
            var enquiryId = $(this).attr('data-enquiry-id'); 
            // var currentRow = $(this).parent().children('tr').eq(1);
             
            var parameters = {
              Id : $(this).attr('data-enquiry-id'),  
              enquiryNo : $(this).attr('data-enquiry-no'),  
              companyName : "Emirates National Facilities Management",
              submissionDate : $(".submission-date-"+enquiryId).val(),  
              enquiryDate : $(this).attr('data-enquiryDate'),
              status : $(`.enquiry-status-${enquiryId} :selected`).val(),
              // contractType : $(`.enquiry-type-${enquiryId} :selected`).val(), 
              contractType : $(`.enquiry-type-${enquiryId}`).val(), 
              customerName : $(".customer-name-"+enquiryId).val(),
              clientId : $(".client-id-"+enquiryId).val(),
              description : $(".description-"+enquiryId).val(),
              remarks : $(".remarks-"+enquiryId).val(), 
              annualProjectValue : $(".annual-project-value-"+enquiryId).val().replace(/,/g, ''),
              // yoc : $(".yoc-"+enquiryId).val(),
              totalProjectValue : $(".total-project-value-"+enquiryId).val().replace(/,/g, ''),
              assignedTo: $(this).attr('data-assignTo'),
              salesPerson : $(this).attr('data-salesPerson'),
              piplineType:$(this).attr('data--enquiry-typeId')??1,
              
            }
            console.log('parameters');
            console.log(parameters);
            console.log("sumission date");
            var submissionDate = $(".submission-date-"+enquiryId).val();

            // console.log(submissionDate);
            
            if(submissionDate  === null){ 
              console.log("condition false"); 
                toastr['error']("Enter Submission Date", 'Error!', {
                    closeButton: true,
                    tapToDismiss: false,
                    rtl: isRtl
                  }); 

            }else{
              console.log("condition true"); 
              saveUpdateEnquiry(parameters).then((response)=>{ 
                  console.log(response);
                   if(response){ 
                    toastr['success']("Pipline Enquiry Updated", 'Success!', {
                        closeButton: true,
                        tapToDismiss: false,
                        rtl: isRtl
                      }); 
                    // window.location.reload();
                    $('.pipline-enquiries-table').DataTable().ajax.reload();
                    
                  }
              }); 
            }

          })
          
         
          var dateFilterHtml = `
              <div class="mb-1 position-relative">
              <label class="form-label" for="pd-format">Start date</label>
              <div class="input-group input-group-merge">
                <input type="text" class="form-control received-date" id="start-date" placeholder="18 June, 2023" />
              </div>
            </div>
            <div class="mb-1 position-relative">
              <label class="form-label" for="pd-format">End date</label>
              <div class="input-group input-group-merge">
                <input type="text" class="form-control received-date" id="end-date" placeholder="18 June, 2023" />
              </div>
            </div>
            `;

            var b2cBtn = `<button type="button" class="badge bg-info b2c-filter-btn text-center "> 
            ${feather.icons['search'].toSvg({ class: '' })} <span> B2C </span> ${feather.icons['check'].toSvg({ class: 'active d-none' })}
            </button>`;
            var b2bBtn = `<button type="button" class="badge mx-2 bg-warning b2b-filter-btn text-center"> 
            ${feather.icons['search'].toSvg({ class: '' })} <span> B2B </span> ${feather.icons['check'].toSvg({ class: 'active d-none' })}
            </button>`;
 
            var button = $(`<a href="/add-enquiry" class="mx-1 btn btn-success " > 
            Add Enquiry
          </a>`).appendTo('.enquiries-dt-action-buttons');
          this.api()
            .columns(13)
            .every(function () {
              var column = this; 
              // console.log(column);
              var dropdown = $(` <button type="button" class="mx-1 btn btn-info dropdown-toggle rms-filter-btn" data-bs-toggle="dropdown"
              aria-expanded="false">
              
              Filter
            </button>
            <div class="dropdown-menu" style="width:450px">
                <div class="row px-2">
                <div class="col-md-6">
                  ${b2cBtn} ${b2bBtn} 
                  <form action="#" class="">
                    <div class="mb-1 type-filter-dropdown">
                    </div>
                    <div class="mb-1 client-filter-dropdown">
                    </div> 
                  </form> 
                </div>
                <div class="col-md-6 date-filter-section">
                  ${dateFilterHtml}
                </div>  
            </div> `).appendTo('.enquiries-dt-action-buttons');

              var item = $('<div class="type-dropdown"> </div>').appendTo('.dt-action-buttons');
              var label = $('<label class="form-label" for="enquirystatus">Status</label>').appendTo('.type-filter-dropdown');
              var select = $(
                '<select id="enquirystatus" class="form-select text-capitalize mb-md-0 " multiple="multiple" ></select>'
              )
                .appendTo('.type-filter-dropdown')
                .on('change', function () {
                  $('.clear-filter-btn').removeClass("d-none");
                  
                  // var val = $.fn.dataTable.util.escapeRegex($(this).val());
                  var status = $(this).val();
                  // console.log(val);
                  $('.clear-filter-btn').removeClass("d-none"); 
                  // var status = ['^OPEN$','^Under Preparation$',"^Potential Business$","^Revised$"];
                  var statuses = status.map(function(value) {
                     
                    return '^' + value + '$';
                  }).join('|');
                  // status = status.join('|');
                  // console.log(status);

                  // status = "^OPEN$|^Under Preparation$|^Potential Business$|^Revised$";
                  // console.log(status);
                  column.search(statuses, true, false, false).draw(false);
                 
                  // console.log('val');
                  // console.log(val);
                  // column.search(val).draw();
                  // piplineEnquiesTable.column(10).search(val).draw();
                  // column.search(val ? '^' + val + '$' : '', true, false).draw();
                });

              column
                .data()
                .unique()
                .sort()
                .each(function (d, j) {
                  select.append('<option value="' + d + '" class="text-capitalize">' + d + '</option>');
                });
            });
          // Adding user type filter once table initialized
          this.api()
            .columns(14)
            .every(function () {
              var column = this;
              var label = $('<label class="form-label" for="enquiryclient">Contract Type</label>').appendTo('.client-filter-dropdown');
              var select = $(
                '<select id="enquiryclient" class="form-select text-capitalize mb-md-0 " multiple="multiple"  ></select>'
              )
                .appendTo('.client-filter-dropdown')
                .on('change', function () {
                  $('.clear-filter-btn').removeClass("d-none");
                  // var val = $.fn.dataTable.util.escapeRegex($(this).val());
                  
                  var client = $(this).val();
                  
                  var clients = client.map(function(value) {
                    return '^' + value + '$';
                  }).join('|');
                     
                  column.search(clients, true, false, false).draw(false);
                  
                  // console.log('val');
                  // console.log(val);
                  // column.search(val ? '^' + val + '$' : '', true, false).draw();
                });

              column
                .data()
                .unique()
                .sort()
                .each(function (d, j) {
                  select.append('<option value="' + d + '" class="text-capitalize">' + d + '</option>');
                });
            });

            var clearBtn = $(`<button type="button" class="badge bg-danger clear-filter-btn text-center d-none"> 
            ${feather.icons['x-circle'].toSvg({ class: '' })} <span> Clear </span> 
            </button>`).appendTo('.enquiries-dt-action-buttons');

            $('.received-date').flatpickr();
            
            $('.due-date-enquires').on('click', function () {
              submissionFilterDate();
              $(".due-date-applied").val("1");
              $('.clear-filter-btn').removeClass("d-none"); 
              var status = ['^OPEN$','^Under Preparation$',"^Potential Business$","^Revised$"];
              // var positions = status.map(function() {
              //   console.log();
              //   return '^' + this.value + '$';
              // }).get().join('|');
              status = status.join('|');
              console.log(status);
              // status = "^OPEN$|^Under Preparation$|^Potential Business$|^Revised$";
              // console.log(status);
              // piplineEnquiesTable.columns(13).search(status, true).draw();
              piplineEnquiesTable.columns(13).search(status, true, false, false).draw(false);
              // piplineEnquiesTable.draw();  
            });

            $('#start-date, #end-date').on('change', function () {
              var val = $("#start-date").val();
              $('.clear-filter-btn').removeClass("d-none"); 
              piplineEnquiesTable.draw();  
            });
            $(".b2c-filter-btn").on('click',function () {
              var b2cFilters = ["B2C HS","B2C SS","B2C AMC"];
              var allFilters = b2cFilters.join('|').replace("&", "\\&").replace(/\s/g, "\\s");
              piplineEnquiesTable.columns(14).search(allFilters, true).draw();
              $('.b2c-filter-btn .active').removeClass("d-none");
              $('.b2b-filter-btn .active').addClass("d-none"); 

              $('.clear-filter-btn').removeClass("d-none"); 
            });
            $(".b2b-filter-btn").on('click',function () {
              var b2bFilters = ["Hard Services","Outsource Services","Security Services","Soft Services","TFM Services","Fit-out"];
              var allFilters = b2bFilters.join('|').replace("&", "\\&").replace(/\s/g, "\\s");
              piplineEnquiesTable.columns(14).search(allFilters, true).draw();
              $('.b2c-filter-btn .active').addClass("d-none");
              $('.b2b-filter-btn .active').removeClass("d-none"); 

              $('.clear-filter-btn').removeClass("d-none"); 
            });
            $(".clear-filter-btn").on('click',function () {
              // piplineEnquiesTable.ajax.reload();
              $("#start-date").val("");
              $("#end-date").val(""); 
              piplineEnquiesTable.search( '' ).columns().search( '' ).draw();
              console.log($(".due-date-applied").val());
              if($(".due-date-applied").val() == "1"){
                window.location.reload();
                // dtPiplineEnquiesTable.DataTable().destroy();
                // enquiryDataTable();
                // piplineEnquiesTable.ajax.reload();

              }
              $(".due-date-applied").val("");

              // piplineEnquiesTable.draw();  

              $("#enquirystatus:selected").removeAttr("selected");
              $("#enquiryclient:selected").removeAttr("selected");
              $('#enquirystatus option').prop('selected', false);
              $('#enquirystatus').trigger('change.select2'); 
              $('#enquiryclient option').prop('selected', false);
              $('#enquiryclient').trigger('change.select2');
              
             $('.clear-filter-btn').addClass("d-none");
              $('.b2c-filter-btn .active').addClass("d-none");
              $('.b2b-filter-btn .active').addClass("d-none"); 

              // $("#enquirystatus:selected").prop("selected", false);
              // $("#enquiryclient:selected").prop("selected", false);
            });
            $(".top-card-btn").on('click',function () {
              var currentStatus = $(this).attr('data-status');
              // var allStatus = [currentStatus];
              var allStatus = currentStatus.split(',');

              var allFilters = allStatus.join('|').replace("&", "\\&").replace(/\s/g, "\\s");
              piplineEnquiesTable.columns(13).search(allFilters, true).draw();
               
              $('.clear-filter-btn').removeClass("d-none"); 
            });
            $(document).on("keypress",".price-input", function (e) { 
              var charCode = (e.which) ? e.which : event.keyCode  
              if (String.fromCharCode(charCode).match(/[^0-9\.\,]/g))     
                  return false;    
            });  

            $('#enquirystatus').select2({
              placeholder: "Select Status",
            });
            $('#enquiryclient').select2({
              placeholder: "Select Type",
            });
             
            $(document).on('click', '.enquiries-dt-action-buttons .dropdown-menu, .enquiries-dt-action-buttons .dropdown-menu div, .enquiries-dt-action-buttons .dropdown-menu li, .enquiries-dt-action-buttons .dropdown-menu input, .enquiries-dt-action-buttons .dropdown-menu span,  .enquiries-dt-action-buttons .dropdown-menu ul, .enquiries-dt-action-buttons .dropdown-menu select, .enquiries-dt-action-buttons .dropdown-menu option', function (e) {
              console.log('clicked');  
              showDropdownMenu(e);   
            }); 
            
            $(document).on('keyup', '.enquiries-dt-action-buttons .dropdown-menu input', function (e) {
              console.log('focus'); 
              showDropdownMenu(e); 
            });

            var all_p = document.querySelectorAll('.enquiries-dt-action-buttons .dropdown-menu span');
            all_p = Array.prototype.slice.call(all_p); // Convert the NodeList object to array (this method is not cross browser)
            var listener = function(event){ 
              showDropdownMenu(event);  
            };
            var event_list = ['click'];
            event_list.forEach(function(ev, ev_index){
                all_p.forEach(function(p, p_index){
                    p.addEventListener(ev, listener, false);
                });
            });
            
            
        }

      });
    }

    function addFilterSection() {
      
    }

  }
  // end dtPiplineEnquiesTable datatable

  function showDropdownMenu(e) {
     
    $('.rms-filter-btn').addClass('show');
    $('.rms-filter-btn').attr('aria-expanded',"true");
    $('.enquiries-dt-action-buttons .dropdown-menu').addClass('show');
    $('.enquiries-dt-action-buttons .dropdown-menu').css({
      "width": "450px", "position": "absolute", "inset": "0px auto auto 0px", "margin": "0px", "transform": "translate3d(844px, 40px, 0px)",
    })
    $('.enquiries-dt-action-buttons .dropdown-menu').attr('data-popper-placement',"bottom-end");
  
    e.stopPropagation(); 
    e.preventDefault(); 
  } 

  async function saveUpdateEnquiry(parameters) {
     
    // return "data";
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
            body: JSON.stringify(parameters)
        };
        return fetch(baseUrl+"add-new-enquiry", requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
             
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
            console.error("There was an error!", error);
        });
 
  }//end of saveUpdateEnquiry

 
  // due-date-enquires
  
  function submissionFilterDate() {
    // piplineEnquiesTable.filter.push( 
    $.fn.dataTable.ext.search.push(
      function( settings, data, dataIndex ) {
         
        // console.log(dtPiplineEnquiesTable[0].attributes.class.nodeValue.split(" ")[0]);
        var currentTable = dtPiplineEnquiesTable[0].attributes.class.nodeValue.split(" ")[0];
        if ( settings.nTable.id !== dtPiplineEnquiesTable[0].id ) {
          return true;
        }

        // if ( settings.nTable.id == dtPiplineEnquiesTable[0].id ) { 
           
          // var currentDate = new Date();
          var currentDate = addDays(new Date(), 7);
 
          var date = new Date( data[18] );
          // console.log('date');
          // console.log(date);

          if ( 
              ( currentDate > date )
          ) {
              return true;
          }
          return false;
        // }
      }
    ); 
  }
 

  function filterDate() {
    // piplineEnquiesTable.filter.push( 
    $.fn.dataTable.ext.search.push(
      function( settings, data, dataIndex ) {
         
        // console.log(dtPiplineEnquiesTable[0].attributes.class.nodeValue.split(" ")[0]);
        var currentTable = dtPiplineEnquiesTable[0].attributes.class.nodeValue.split(" ")[0];
        if ( settings.nTable.id !== dtPiplineEnquiesTable[0].id ) {
          return true;
        }

        // if ( settings.nTable.id == dtPiplineEnquiesTable[0].id ) { 
          let min = moment($("#start-date").val()).isValid() ?
              new Date( $("#start-date").val() ).setUTCHours(0,0,0,0) :
              null;
          
           let max = moment($("#end-date").val()).isValid() ?
               new Date( $("#end-date").val() ).setUTCHours(23,59,59,999):
               null;
          var date = new Date( data[15] );
          // console.log('date');
          // console.log(date);

          if (
              ( min === null && max === null ) ||
              ( min === null && date <= max ) ||
              ( min <= date   && max === null ) ||
              ( min <= date   && date <= max )
          ) {
              return true;
          }
          return false;
        // }
      }
    ); 
  }

  // Custom filtering function which will search data in column four between two values
  

  

  $(".reload-table").on('click',function () {
    console.log('reload table');
    startDate.val('');
    endDate.val('');
    piplineEnquiesTable.column(3).search('', false, false);

    piplineEnquiesTable.search('').columns().search('').draw();

    dtPiplineEnquiesTable.DataTable().destroy();
    enquiryDataTable();
    // dtPiplineEnquiesTable.DataTable().ajax.reload();
    // piplineEnquiesTable.draw();
    // dtPiplineEnquiesTable.DataTable().api().ajax.reload();

    
  })

  var clientListTable;
  // dtPiplineEnquiesTable datatable
  clientListDataTable();
  function clientListDataTable() {
    if (dtClientsListTable.length) {
      
      clientListTable = dtClientsListTable.DataTable({
        ajax: {
          'type': 'POST', 
          'url': baseUrl+'get-clients-list',
          'data': {
            user_id: '1',  
            // etc..
          },
          "beforeSend": function (xhr) {
            xhr.setRequestHeader('Authorization',
                "Bearer " + token);
          }, 
      }, 
      "drawCallback": function (settings) {  
          
          // console.log('this is client table');

      }
        , // JSON file to add data
        columns: [
          // columns according to JSON
          { data: 'ClientCode' },
          { data: 'ClientName' }, 
          
  
          // { data: '' }
        ],
        columnDefs: [
          {
            // For Responsive
            // className: 'control',
            // orderable: false,
            responsivePriority: 2,
            targets: 0,
            render: function (data, type, full, meta) { 
              var output = `
                <div class="client-details" data-id = "${full['Id']}" data-clientName = "${full['ClientName']}" data-addressLine1 = "${full['AddressLine1']}" data-addressLine2 = "${full['AddressLine2']}" data-city = "${full['City']}" 
                data-contactPerson = "${full['ContactPerson']}" data-phone = "${full['Phone']}" data-mobileNumber = "${full['MobileNumber']}" data-email = "${full['Email']}"> 
                ${full['ClientCode']}   
                </div>
              `;
              return output;
            }
          },
          
          
        ],
        order: [[1, 'desc']],
        dom:
          '<"d-flex justify-content-between align-items-center header-actions mx-2 row mt-75"' +
          '<"col-sm-12 col-lg-4 d-flex justify-content-center justify-content-lg-start" l>' +
          '<"col-sm-12 col-lg-8 ps-xl-75 ps-0"<"dt-action-buttons d-flex align-items-center justify-content-center justify-content-lg-end flex-lg-nowrap flex-wrap"<"me-1"f>B>>' +
          '>t' +
          '<"d-flex justify-content-between mx-2 row mb-1"' +
          '<"col-sm-12 col-md-6"i>' +
          '<"col-sm-12 col-md-6"p>' +
          '>',
        
        language: {
          sLengthMenu: 'Show _MENU_',
          search: 'Search',
          searchPlaceholder: 'Search..'
        },
        // Buttons with Dropdown
        buttons: [
          
          { 
            extend: 'excel',
            text: 'Export',
            className: ' btn btn-primary',
            // attr: {
            //   'data-bs-toggle': 'modal',
            //   'data-bs-target': '#modals-slide-in'
            // },
            exportOptions: { columns: [1, 2, 3, 5,6,7,8,9,10,11,12,13,14,15,15] },
            init: function (api, node, config) {
              $(node).removeClass('btn-secondary');
            }
          },
          
        ],
        // For responsive popup
        
        language: {
          paginate: {
            // remove previous & next text from pagination
            previous: '&nbsp;',
            next: '&nbsp;'
          }
        },
        initComplete: function () {
          // alert('done');
          // Adding role filter once table initialized 
          $(document).on('click','.clients-list-table tbody tr',function () {
            var currentTr = $(this).find('.client-details');
            var clientId = currentTr.attr('data-id');
            var clientName = currentTr.attr('data-clientName');
            var addressLine1 = currentTr.attr('data-addressLine1');
            var addressLine2 = currentTr.attr('data-addressLine2');
            var city = currentTr.attr('data-city');
            var contactPerson = currentTr.attr('data-contactPerson');
            var phone = currentTr.attr('data-phone');
            var mobileNumber = currentTr.attr('data-mobileNumber');
            var email = currentTr.attr('data-email'); 
            
            var enquiryId = $(".clients-list-table .current-enquiry-id").val();

            $('.client-id').val(clientId);  
            $('.customer-name').val(clientName); 
            $('.client-id-'+enquiryId).val(clientId);  
            $('.customer-name-'+enquiryId).val(clientName); 
              
            $('.contact-person').val(contactPerson); 
            $('.address-line-1').val(addressLine1); 
            $('.address-line-2').val(addressLine2); 
            $('.enquiry-city').val(city); 
            $('.enquiry-phone').val(phone); 
            $('.enquiry-mobile').val(mobileNumber); 
            $('.enquiry-email').val(email); 
            $("#showClientsModel").modal('toggle'); 

          })
          
          // Adding user type filter once table initialized
          
        }
      });
    }
  }
  // end dtClientsListTable datatable

  if (dtEnquiryHistoryTable.length) {
    dtEnquiryHistoryTable.DataTable({
      ajax: {
        'type': 'POST', 
        'url': baseUrl+'get-enquiry-history',
        'data': {
          enquiry_id: '454',  
        },
        "beforeSend": function (xhr) {
          xhr.setRequestHeader('Authorization',
              "Bearer " + token);
        }, 
    }, 
    "drawCallback": function (settings) {  
         
    }, // JSON file to add data
      columns: [
        // columns according to JSON
        { data: 'Date & Time' },
        { data: 'Type' }, 
        { data: 'From Status' }, 
        { data: 'To Status' }, 
        { data: 'User' }, 
        
 
        // { data: '' }
      ],
      columnDefs: [
        {
          // For Responsive
          // className: 'control',
          // orderable: false,
          responsivePriority: 2,
          targets: 0,
          render: function (data, type, full, meta) { 
            var output = `
              <div class="client-details" data-id = "${full['Id']}" data-clientName = "${full['ClientName']}" data-addressLine1 = "${full['AddressLine1']}" data-addressLine2 = "${full['AddressLine2']}" data-city = "${full['City']}" 
              data-contactPerson = "${full['ContactPerson']}" data-phone = "${full['Phone']}" data-mobileNumber = "${full['MobileNumber']}" data-email = "${full['Email']}"> 
               ${full['ClientCode']}   
              </div>
            `;
            return output;
          }
        },
         
        
      ],
      order: [[1, 'desc']],
      dom:
        '<"d-flex justify-content-between align-items-center header-actions mx-2 row mt-75"' +
        '<"col-sm-12 col-lg-4 d-flex justify-content-center justify-content-lg-start" l>' +
        '<"col-sm-12 col-lg-8 ps-xl-75 ps-0"<"dt-action-buttons d-flex align-items-center justify-content-center justify-content-lg-end flex-lg-nowrap flex-wrap"<"me-1"f>B>>' +
        '>t' +
        '<"d-flex justify-content-between mx-2 row mb-1"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
       
      language: {
        sLengthMenu: 'Show _MENU_',
        search: 'Search',
        searchPlaceholder: 'Search..'
      },
      // Buttons with Dropdown
      buttons: [
        // {
        //   extend: 'collection',
        //   className: 'btn btn-outline-secondary dropdown-toggle me-2',
        //   text: feather.icons['share'].toSvg({ class: 'font-small-4 me-50' }) + 'Export',
        //   buttons: [
        //     {
        //       extend: 'print',
        //       text: feather.icons['printer'].toSvg({ class: 'font-small-4 me-50' }) + 'Print',
        //       className: 'dropdown-item',
        //       exportOptions: { columns: [3, 4, 5, 6, 7] }
        //     },
        //     {
        //       extend: 'csv',
        //       text: feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) + 'Csv',
        //       className: 'dropdown-item',
        //       exportOptions: { columns: [3, 4, 5, 6, 7] }
        //     },
        //     {
        //       extend: 'excel',
        //       text: feather.icons['file'].toSvg({ class: 'font-small-4 me-50' }) + 'Excel',
        //       className: 'dropdown-item',
        //       exportOptions: { columns: [3, 4, 5, 6, 7] }
        //     },
        //     {
        //       extend: 'pdf',
        //       text: feather.icons['clipboard'].toSvg({ class: 'font-small-4 me-50' }) + 'Pdf',
        //       className: 'dropdown-item',
        //       exportOptions: { columns: [3, 4, 5, 6, 7] }
        //     },
        //     {
        //       extend: 'copy',
        //       text: feather.icons['copy'].toSvg({ class: 'font-small-4 me-50' }) + 'Copy',
        //       className: 'dropdown-item',
        //       exportOptions: { columns: [3, 4, 5, 6, 7] }
        //     }
        //   ],
        //   init: function (api, node, config) {
        //     $(node).removeClass('btn-secondary');
        //     $(node).parent().removeClass('btn-group');
        //     setTimeout(function () {
        //       $(node).closest('.dt-buttons').removeClass('btn-group').addClass('d-inline-flex');
        //     }, 50);
        //   }
        // },
        { 
          extend: 'excel',
          text: 'Export',
          className: ' btn btn-primary',
          // attr: {
          //   'data-bs-toggle': 'modal',
          //   'data-bs-target': '#modals-slide-in'
          // },
          exportOptions: { columns: [0, 1, 2, 3,4] },
          init: function (api, node, config) {
            $(node).removeClass('btn-secondary');
          }
        },
        // {  
        //   text: 'Add New',
        //   className: 'mx-1 btn btn-success ',
        //   attr: {
        //     // 'data-bs-toggle': 'modal',
        //     // 'data-bs-target': '#addEnquiryModel'
        //     'href': '/add-enquiry', 
        //   },
        //   init: function (api, node, config) {
        //     $(node).removeClass('btn-secondary');
        //   }
        // }
      ],
      // For responsive popup
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of ' + data['ENQUIRY #'];
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.columnIndex !== 6 // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                    col.rowIdx +
                    '" data-dt-column="' +
                    col.columnIndex +
                    '">' +
                    '<td>' +
                    col.title +
                    ':' +
                    '</td> ' +
                    '<td>' +
                    col.data +
                    '</td>' +
                    '</tr>'
                : '';
            }).join('');
            return data ? $('<table class="table"/>').append('<tbody>' + data + '</tbody>') : false;
          }
        }
      },
      language: {
        paginate: {
          // remove previous & next text from pagination
          previous: '&nbsp;',
          next: '&nbsp;'
        }
      },
      initComplete: function () {
        // alert('done');
        // Adding role filter once table initialized 
        
         
        // Adding user type filter once table initialized
         
      }
    });
  }
  // end dtEnquiryHistoryTable datatable
  
  if (dtEnquiryFollowUpTable.length) {
    dtEnquiryFollowUpTable.DataTable({
      ajax: {
        'type': 'POST', 
        'url': baseUrl+'get-enquiry-followups',
        'data': {
          enquiry_id: '454', 
           token:token 
        },
        "beforeSend": function (xhr) {
          xhr.setRequestHeader('Authorization',
              "Bearer " + token);
        }, 
    }, 
    "drawCallback": function (settings) {  
        
         

    }
      , // JSON file to add data
      columns: [
        // columns according to JSON
        { data: 'FOLLOWUP DATE' },
        { data: 'REMARKS' }, 
        { data: 'NEXT FOLLOWUP DATE' },  
        { data: 'ACTION' }, 
        
        // { data: '' }
      ],
      columnDefs: [
        {
          // For Responsive
          // className: 'control',
          // orderable: false,
          responsivePriority: 2,
          targets: 0,
          render: function (data, type, full, meta) { 
            var output = `
              ${full['FOLLOWUP DATE']}
            `;
            return output;
          }
        },
         
        
      ],
      order: [[1, 'desc']],
      dom:
        '<"d-flex justify-content-between align-items-center header-actions mx-2 row mt-75"' +
        '<"col-sm-12 col-lg-4 d-flex justify-content-center justify-content-lg-start" l>' +
        '<"col-sm-12 col-lg-8 ps-xl-75 ps-0"<"dt-action-buttons d-flex align-items-center justify-content-center justify-content-lg-end flex-lg-nowrap flex-wrap"<"me-1"f>B>>' +
        '>t' +
        '<"d-flex justify-content-between mx-2 row mb-1"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
       
      language: {
        sLengthMenu: 'Show _MENU_',
        search: 'Search',
        searchPlaceholder: 'Search..'
      },
      // Buttons with Dropdown
      buttons: [
        
        // { 
        //   extend: 'excel',
        //   text: 'Export',
        //   className: ' btn btn-primary',
        //   // attr: {
        //   //   'data-bs-toggle': 'modal',
        //   //   'data-bs-target': '#modals-slide-in'
        //   // },
        //   exportOptions: { columns: [0, 1, 2, 3] },
        //   init: function (api, node, config) {
        //     $(node).removeClass('btn-secondary');
        //   }
        // },
        {  
          text: 'Add New',
          className: 'mx-1 btn btn-success ',
          attr: {
            'data-bs-toggle': 'modal',
            'data-bs-target': '#addFollowUpModel' 
          },
          init: function (api, node, config) {
            $(node).removeClass('btn-secondary');
          }
        }
      ],
      // For responsive popup
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of ' + data['ENQUIRY #'];
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.columnIndex !== 6 // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                    col.rowIdx +
                    '" data-dt-column="' +
                    col.columnIndex +
                    '">' +
                    '<td>' +
                    col.title +
                    ':' +
                    '</td> ' +
                    '<td>' +
                    col.data +
                    '</td>' +
                    '</tr>'
                : '';
            }).join('');
            return data ? $('<table class="table"/>').append('<tbody>' + data + '</tbody>') : false;
          }
        }
      },
      language: {
        paginate: {
          // remove previous & next text from pagination
          previous: '&nbsp;',
          next: '&nbsp;'
        }
      },
      initComplete: function () {
        // alert('done');
        // Adding role filter once table initialized 
        
         
        // Adding user type filter once table initialized
         
      }
    });
  }
  // end dtEnquiryFollowUpTable datatable

  $(".add-new-client-btn").on("click",function (e) {
    $('.needs-validation')[0].classList.add('was-validated')
    
    if (!$('.needs-validation')[0].checkValidity()) {
          event.preventDefault()
          event.stopPropagation() 
    }else{
        console.log('valid form'); 
        var parameters = {
         client_code:$(".client-code").val(),
         client_name:$(".client-customer-name").val(),
         mobile_no:$(".client-mobile").val(),
         email:$(".client-email").val(),
         first_name:$(".client-first-name").val(),
         last_name:$(".client-last-name").val(),
        }
        console.log(parameters);
       
        apiCallFunction('save-new-client',parameters).then((response)=>{
           if(response.status == 200){
             dtClientsListTable.DataTable().destroy();
             clientListDataTable(); 
             
             $("#addNewClientModel").modal("toggle");
             $(".client-code").val("");
             $(".client-customer-name").val("");
             $(".client-mobile").val("");
             $(".client-email").val("");
             $(".client-first-name").val("");
             $(".client-last-name").val("");
             
           }  
       });  

    }//end of else



  });
  async function apiCallFunction(apiEndPoint, parameters) {
     
    // return "data";
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
            console.error("There was an error!", error);
        });
 
  }//end of apiCallFunction


  
  if (dtEnquiryAttachmentsTable.length) {
    dtEnquiryAttachmentsTable.DataTable({
      ajax: {
        'type': 'POST', 
        'url': baseUrl+'get-enquiry-attachments',
        'data': {
          enquiry_id: '444', 
           token:token 
        },
        "beforeSend": function (xhr) {
          xhr.setRequestHeader('Authorization',
              "Bearer " + token);
        }, 
    }, 
    "drawCallback": function (settings) {  
        
         

    }
      , // JSON file to add data
      columns: [
        // columns according to JSON
        { data: 'AttachDate' },
        { data: 'AttachedBy' }, 
        { data: 'Source' },  
        { data: 'Document Type' },  
        { data: 'Description' },  
        { data: 'FileType' },  
        { data: 'FileSize' },  
        // { data: '' }, 
        
        // { data: '' }
      ],
      columnDefs: [
        { 
          // className: 'control',
          // orderable: false,
          responsivePriority: 2,
          targets: 0,
          render: function (data, type, full, meta) { 
            var output = ` ${full['AttachDate']}
            `;
            return output;
          }
        },
        {
          // Actions
          targets: -1,
          title: 'Action',
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<a href="#" class="btn btn-sm btn-icon">' +
              feather.icons['trash'].toSvg({ class: 'font-medium-3 text-body' }) +
              '</a>'
            );
          }
        }
         
        
      ],
      order: [[1, 'desc']],
      dom:
        '<"d-flex justify-content-between align-items-center header-actions mx-2 row mt-75"' +
        '<"col-sm-12 col-lg-4 d-flex justify-content-center justify-content-lg-start" l>' +
        '<"col-sm-12 col-lg-8 ps-xl-75 ps-0"<"dt-action-buttons d-flex align-items-center justify-content-center justify-content-lg-end flex-lg-nowrap flex-wrap"<"me-1"f>B>>' +
        '>t' +
        '<"d-flex justify-content-between mx-2 row mb-1"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
       
      language: {
        sLengthMenu: 'Show _MENU_',
        search: 'Search',
        searchPlaceholder: 'Search..'
      },
      // Buttons with Dropdown
      buttons: [
        
        { 
          extend: 'excel',
          text: 'Export',
          className: ' btn btn-primary',
          // attr: {
          //   'data-bs-toggle': 'modal',
          //   'data-bs-target': '#modals-slide-in'
          // },
          exportOptions: { columns: [0, 1, 2, 3] },
          init: function (api, node, config) {
            $(node).removeClass('btn-secondary');
          }
        },
        {  
          text: 'Add New',
          className: 'mx-1 btn btn-success ',
          attr: {
            'data-bs-toggle': 'modal',
            'data-bs-target': '#addAttachmentModel' 
          },
          init: function (api, node, config) {
            $(node).removeClass('btn-secondary');
          }
        }
      ],
      // For responsive popup
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of ' + data['ENQUIRY #'];
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.columnIndex !== 6 // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                    col.rowIdx +
                    '" data-dt-column="' +
                    col.columnIndex +
                    '">' +
                    '<td>' +
                    col.title +
                    ':' +
                    '</td> ' +
                    '<td>' +
                    col.data +
                    '</td>' +
                    '</tr>'
                : '';
            }).join('');
            return data ? $('<table class="table"/>').append('<tbody>' + data + '</tbody>') : false;
          }
        }
      },
      language: {
        paginate: {
          // remove previous & next text from pagination
          previous: '&nbsp;',
          next: '&nbsp;'
        }
      },
      initComplete: function () {
        // alert('done');
        // Adding role filter once table initialized 
        
         
        // Adding user type filter once table initialized
         
      }
    });
  }
  // end dtEnquiryAttachmentsTable datatable

  // Form Validation
  if (newUserForm.length) {
    newUserForm.validate({
      errorClass: 'error',
      rules: {
        'user-fullname': {
          required: true
        },
        'user-name': {
          required: true
        },
        'user-email': {
          required: true
        }
      }
    });

    newUserForm.on('submit', function (e) {
      var isValid = newUserForm.valid();
      e.preventDefault();
      if (isValid) {
        newUserSidebar.modal('hide');
      }
    });
  }

  // Phone Number
  if (dtContact.length) {
    dtContact.each(function () {
      new Cleave($(this), {
        phone: true,
        phoneRegionCode: 'US'
      });
    });
  }
});
