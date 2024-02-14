/*=========================================================================================
    File Name: app-user-list.js
    Description: User List page
    --------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent

==========================================================================================*/
$(function () {
  ('use strict');

  var totalClients = 0;
  var clientsList = [];
  var totalContracts = 0;
  var totalAnnualAmount = 0;
  var totalContractsAmount = 0;
  var token = $('.j-w-t').val();
  var baseUrl = $('.baseUrl').val();

  var dtContractBudgetTable = $('.contracts-budget-table'),
    dtContractBudgetItemDetailsTable = $('.budget-item-details-table'),
    newUserSidebar = $('.new-user-modal'),
    newUserForm = $('.add-new-user'),
    select = $('.select2'),
    dtContact = $('.dt-contact'),
    statusObj = {
      Active: { title: 'Active', class: 'badge-light-success' },
      Draft: { title: 'Draft', class: 'badge-light-warning' }, 
    };

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

  // Users List datatable
  var groupColumn = 3;
  var masterID = $(".budget_master_id_input").val();
  // console.log(masterID);
  contractBudgetTable(masterID ? $(".budget_master_id_input").val() : 121231);
  function contractBudgetTable(masterId) { 
    if (dtContractBudgetTable.length) { 
  
      dtContractBudgetTable.DataTable({
        ajax: {
          'type': 'POST', 
          'url': baseUrl+'get-budget-items-list',
          'data': {
            budget_master_id: masterId, //'1210',   
          },
          "beforeSend": function (xhr) {
            xhr.setRequestHeader('Authorization',
                "Bearer " + token);
          }, 
        },  
      "createdRow": function (row, data, dataIndex, cells) {
        // console.log(data);
        // console.log(dataIndex);
        if(data["CostHeadId"] == "1"){
          $(row).addClass("bg-light-primary");
        }else if(data["CostHeadId"] == "2"){
          $(row).addClass("bg-light-warning");
        }else{
          $(row).addClass("bg-light-info");
        } 
       },
      "drawCallback": function (settings) {  
          var response = settings.json;
           
          // var api = this.api();
          // var rows = api.rows({ page: 'current' }).nodes();
          // var last = null;
  
          // api
          //   .column(groupColumn, { page: 'current' })
          //   .data()
          //   .each(function (group, i) {
          //     if (last !== group) {
          //       $(rows)
          //         .eq(i)
          //         .before('<tr class="group"><td colspan="8">' + group + '</td></tr>');
  
          //       last = group;
          //     }
          //   });
  
      }
        , // JSON file to add data
        columns: [
          // columns according to JSON
          { data: '' },
          { data: 'CostHeadName' },
          { data: 'ItemTypeName' },
          { data: 'MainGroupName' },
          { data: 'TotalCost' },
          { data: 'AnnualCost' },
          { data: '01-amount' },
          { data: '02-amount' },
          { data: '03-amount' },
          { data: '04-amount' },
          { data: '05-amount' },
          { data: '06-amount' },
          { data: '07-amount' },
          { data: '08-amount' },
          { data: '09-amount' },
          { data: '10-amount' },
          { data: '11-amount' },
          { data: '12-amount' },
          // { data: 'CostHeadId' },  
 
        ],
        displayLength: 25,
        columnDefs: [
          {
            // For Responsive
            // className: 'control',
            orderable: false,
            responsivePriority: 2,
            targets: 0,
            render: function (data, type, full, meta) { 
              var output = `
                <div class="d-flex position-relative">
                 <div class="view-costhead-details-btn" data-master-id="${full['ClientContractBudgetMasterId']}" data-head-id="${full['CostHeadId']}" data-manpower-id="${full['MainGroupId']}"  data-type-id="${full['ItemTypeId']}" 
                 data-costhead-name="${full['CostHeadName']}" data-manpower-name="${full['MainGroupName']}"  data-itemtype-name="${full['ItemTypeName']}" 
                 >
                    <a    class="ms-2 " > ${feather.icons['eye'].toSvg({ class: 'font-medium-2 ' })} </a>
                  </div>
                 </div>
              `;
              return output;
            }
          }, 
          {
            // total
            targets: 4, 
            render: function (data, type, full, meta) { 
              var totalAmount = parseFloat(full['01-amount']) + parseFloat(full['02-amount']) + parseFloat(full['03-amount'])+ parseFloat(full['04-amount'])+ parseFloat(full['05-amount'])+ parseFloat(full['06-amount'])+ parseFloat(full['07-amount'])+ parseFloat(full['08-amount'])+ parseFloat(full['09-amount'])+ parseFloat(full['10-amount'])+ parseFloat(full['11-amount'])+ parseFloat(full['12-amount']);
              return `<span class="text-nowrap"> ${Intl.NumberFormat().format(totalAmount)} </span>`; 
            }
          }, 
          {
            // annual cost
            targets: 5, 
            render: function (data, type, full, meta) { 
              var annualAmount = parseFloat(full['01-amount']) + parseFloat(full['02-amount']) + parseFloat(full['03-amount'])+ parseFloat(full['04-amount'])+ parseFloat(full['05-amount'])+ parseFloat(full['06-amount'])+ parseFloat(full['07-amount'])+ parseFloat(full['08-amount'])+ parseFloat(full['09-amount'])+ parseFloat(full['10-amount'])+ parseFloat(full['11-amount'])+ parseFloat(full['12-amount']);
               
              return `<span class="text-nowrap"> ${Intl.NumberFormat().format(annualAmount)} </span>`; 
            }
          }, 
          {
            // jan cost
            targets: 6, 
            render: function (data, type, full, meta) { 
              $(dtContractBudgetTable.DataTable().column(6).header() ).text( full['01-year'] ); 
              return `<span class="text-nowrap"> ${Intl.NumberFormat().format(full['01-amount'])} </span>`; 
            }
          }, 
          {
            // fab cost
            targets: 7, 
            render: function (data, type, full, meta) { 
              $(dtContractBudgetTable.DataTable().column(7).header() ).text( full['02-year'] ); 
              return `<span class="text-nowrap"> ${Intl.NumberFormat().format(full['02-amount'])} </span>`; 
            }
          }, 
          {
            // march cost
            targets: 8, 
            render: function (data, type, full, meta) { 
              $(dtContractBudgetTable.DataTable().column(8).header() ).text( full['03-year'] ); 
              return `<span class="text-nowrap"> ${Intl.NumberFormat().format(full['03-amount'])} </span>`; 
            }
          }, 
          {
            // april cost
            targets: 9, 
            render: function (data, type, full, meta) { 
              $(dtContractBudgetTable.DataTable().column(9).header() ).text( full['04-year'] ); 
              return `<span class="text-nowrap"> ${Intl.NumberFormat().format(full['04-amount'])} </span>`; 
            }
          },
          {
            // may cost
            targets: 10, 
            render: function (data, type, full, meta) { 
              $(dtContractBudgetTable.DataTable().column(10).header() ).text( full['05-year'] ); 
              return `<span class="text-nowrap"> ${Intl.NumberFormat().format(full['05-amount'])} </span>`; 
            }
          }, 
          {
            // june cost
            targets: 11, 
            render: function (data, type, full, meta) { 
              $(dtContractBudgetTable.DataTable().column(11).header() ).text( full['06-year'] ); 
              return `<span class="text-nowrap"> ${Intl.NumberFormat().format(full['06-amount'])} </span>`; 
            }
          }, 
          {
            // july cost
            targets: 12, 
            render: function (data, type, full, meta) { 
              $(dtContractBudgetTable.DataTable().column(12).header() ).text( full['07-year'] ); 
              return `<span class="text-nowrap"> ${Intl.NumberFormat().format(full['07-amount'])} </span>`; 
            }
          }, 
          {
            // Augest cost
            targets: 13, 
            render: function (data, type, full, meta) { 
              $(dtContractBudgetTable.DataTable().column(13).header() ).text( full['08-year'] ); 
              return `<span class="text-nowrap"> ${Intl.NumberFormat().format(full['08-amount'])} </span>`; 
            }
          },
          {
            // September cost
            targets: 14, 
            render: function (data, type, full, meta) { 
              $(dtContractBudgetTable.DataTable().column(14).header() ).text( full['09-year'] ); 
              return `<span class="text-nowrap"> ${Intl.NumberFormat().format(full['09-amount'])} </span>`; 
            }
          }, 
          {
            // Oct cost
            targets: 15, 
            render: function (data, type, full, meta) { 
              $(dtContractBudgetTable.DataTable().column(15).header() ).text( full['10-year'] ); 
              return `<span class="text-nowrap"> ${Intl.NumberFormat().format(full['10-amount'])} </span>`; 
            }
          }, 
          {
            // Nov cost
            targets: 16, 
            render: function (data, type, full, meta) { 
              $(dtContractBudgetTable.DataTable().column(16).header() ).text( full['11-year'] ); 
              return `<span class="text-nowrap"> ${Intl.NumberFormat().format(full['11-amount'])} </span>`; 
            }
          },  
          {
            // Dec cost
            targets: 17, 
            render: function (data, type, full, meta) { 
              $(dtContractBudgetTable.DataTable().column(17).header() ).text( full['12-year'] ); 
              return `<span class="text-nowrap"> ${Intl.NumberFormat().format(full['12-amount'])} </span>`; 
            }
          },   
  
          // { visible: false, targets: -1 }, 
           
            
          // {
          //   // Actions
          //   targets: -1,
          //   title: 'Actions',
          //   orderable: false,
          //   render: function (data, type, full, meta) {
          //     // return (
          //     //   '<a href="' +
          //     //   userView +
          //     //   '" class="btn btn-sm btn-icon">' +
          //     //   feather.icons['eye'].toSvg({ class: 'font-medium-3 text-body' }) +
          //     //   '</a>'
          //     // );
          //     // var output = ` <a   class="ms-2 add-new " data-bs-toggle = "modal" data-bs-target: "#modals-slide-in" > ${feather.icons['edit'].toSvg({ class: 'font-medium-2 text-body' })} </a>`;
  
          //     return output;
          //   }
          // }
        ],
        // order: [[18, 'asc']],
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
            exportOptions: { columns: [1,2,3,4,5,6,7,8,9,8,11,12,13,14,15,16,17] },
            init: function (api, node, config) {
              $(node).removeClass('btn-secondary');
            }
          },
          // {  
          //   text: 'Filter',
          //   className: 'mx-1 btn btn-success dropdown-toggle',
          //   attr: {
          //     'data-bs-toggle': 'dropdown',
          //     'aria-expanded': 'false'
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
        //         return 'Details of ' + data['ReferenceCode'];
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
          
          $(document).on("click", ".view-costhead-details-btn", function () {
            var masterId = $(this).attr("data-master-id");
            var headId = $(this).attr("data-head-id");
            var maingroupId = $(this).attr("data-manpower-id");
            var typeId = $(this).attr("data-type-id");
            var costHeadName = $(this).attr("data-costhead-name");
            var mainGroupName = $(this).attr("data-manpower-name");
            var typeName = $(this).attr("data-costhead-name");
  
            $(".header-title").html(` ${costHeadName} - ${mainGroupName} - ${typeName}`);
            // alert("master id"+masterId);
            $(".headcost-title").html(` <span class="fw-bold"> Cost Head : </span> ${costHeadName}`);
            $(".maingroup-title").html(` <span class="fw-bold" > Maingroup : </span> ${mainGroupName}`);
            $(".itemType-title").html(` <span class="fw-bold" > Item Type : </span> ${typeName}`);
  
            dtContractBudgetItemDetailsTable.DataTable().destroy();
            budgetItemDetails(masterId,headId,maingroupId,typeId);
            $("#budgetItemDetailsModel").modal("toggle");
            
          })
  
          
  
            
        }
      });
    } 
  }
  $(document).ready(function () {
    $(document).on('change','.budget_master_id_input',function (e) {
      var masterId = $(this).val();
      console.log("trigger change event");
      // console.log(masterId);
      if(masterId){
        $('.contracts-budget-table').DataTable().destroy();
        contractBudgetTable(masterId); 
      }
    }); 
  });


  budgetItemDetails(1210,1,0,0);

  function budgetItemDetails(masterId,headId,groupId,typeId) {
    if (dtContractBudgetItemDetailsTable.length) {
      
      var dynamicColumns = [
        // columns according to JSON
        { data: '' }, //0
        { data: 'ItemsName' },//1
        { data: 'Unit' },//2
        { data: 'TotalQty' },//3
        { data: 'UnitRate' },//4
        { data: 'CalculatedUnitRate' },//5
        // { data: 'CalculatedUnitRate' },//6
        { data: '01-amount' },//6
        { data: '02-amount' },//7
        { data: '03-amount' },//8
        { data: '04-amount' },//9
        { data: '05-amount' },//10
        { data: '06-amount' },//11
        { data: '07-amount' },//12
        { data: '08-amount' },//13
        { data: '09-amount' },//14
        { data: '10-amount' },//15
        { data: '11-amount' },//16
        { data: '12-amount' },//17
        // { data: 'CostHeadId' },//18
  
  
        // { data: '' }
      ];
  
      dtContractBudgetItemDetailsTable.DataTable({
        ajax: {
          'type': 'POST',
          'url': baseUrl+'get-budget-item-details',
          'data': {
            budget_master_id: masterId,  
            cost_head_id: headId,   
            main_group_id: groupId,   
            item_type_id: typeId,  
          },
          "beforeSend": function (xhr) {
            xhr.setRequestHeader('Authorization',
                "Bearer " + token);
          }, 
      },  
      "drawCallback": function (settings) {  
          var response = settings.json;
            
  
      }
        , // JSON file to add data
        columns: dynamicColumns,
        displayLength: 10,
        columnDefs: [
          {
            // For Responsive
            // className: 'control',
            orderable: false,
            responsivePriority: 2,
            targets: 0,
            render: function (data, type, full, meta) { 
              var output = `
                <div class="d-flex position-relative">
                 <div class="update-details-btn" data-master-id="${full['ClientContractBudgetMasterId']}" data-head-id="${full['CostHeadId']}" data-manpower-id="${full['MainGroupId']}"  data-type-id="${full['ItemTypeId']}"  >
                    <a    class="ms-2 " > ${feather.icons['edit'].toSvg({ class: 'font-medium-2 text-body' })} </a>
                  </div>
                 </div>
              `;
              return output;
            }
          }, 
          {
            // qty
            targets: 3, 
            render: function (data, type, full, meta) {  
              var output = `<input type="text" class="form-control qty-input price-input qty-${full['ItemsId']}" data-id="${full['ItemsId']}" value="${Intl.NumberFormat().format(full['TotalQty'])}" placeholder="0"  />`;
              // return `<span class="text-nowrap"> ${Intl.NumberFormat().format(full['UnitRate'])} </span>`; 
              return output;
            }
          }, 
          {
            // unit rate
            targets: 4, 
            width:"100px",
            render: function (data, type, full, meta) { 
              var output = `<input type="text" class="form-control price-input unit-rate unit-rate-${full['ItemsId']}" data-id="${full['ItemsId']}" value="${Intl.NumberFormat().format(full['UnitRate'])}" placeholder="0"  />`;
              // return `<span class="text-nowrap"> ${Intl.NumberFormat().format(full['UnitRate'])} </span>`; 

              return output;
            }
          }, 
          {
            // annual cost
            targets: 5, 
            render: function (data, type, full, meta) { 
              var annualAmount = parseFloat(full['01-amount']) + parseFloat(full['02-amount']) + parseFloat(full['03-amount'])+ parseFloat(full['04-amount'])+ parseFloat(full['05-amount'])+ parseFloat(full['06-amount'])+ parseFloat(full['07-amount'])+ parseFloat(full['08-amount'])+ parseFloat(full['09-amount'])+ parseFloat(full['10-amount'])+ parseFloat(full['11-amount'])+ parseFloat(full['12-amount']);
               
              return `<span class="text-nowrap total-amount total-amount-${full['ItemsId']}"> ${Intl.NumberFormat().format(annualAmount)} </span>`; 
            }
          }, 
          {
            // jan cost
            targets: 6, 
            render: function (data, type, full, meta) { 
              $(dtContractBudgetItemDetailsTable.DataTable().column(6).header() ).text( full['01-year'] ); 
              var output = `<input type="text" class="form-control price-input per-month-price-${full['ItemsId']} jan-month-rate-${full['ItemsId']}" value="${Intl.NumberFormat().format(full['01-amount'])}" placeholder="0"  />`;
              // return `<span class="text-nowrap"> ${Intl.NumberFormat().format(full['01-amount'])} </span>`; 
              return output;
            }
          }, 
          {
            // fab cost
            targets: 7, 
            render: function (data, type, full, meta) { 
              $(dtContractBudgetItemDetailsTable.DataTable().column(7).header() ).text( full['02-year'] ); 
              // return `<span class="text-nowrap"> ${Intl.NumberFormat().format(full['02-amount'])} </span>`; 
              var output = `<input type="text" class="form-control price-input per-month-price-${full['ItemsId']} jan-month-rate-${full['ItemsId']}" value="${Intl.NumberFormat().format(full['02-amount'])}" placeholder="0"  />`;
              return output;
            }
          }, 
          {
            // march cost
            targets: 8, 
            render: function (data, type, full, meta) { 
              $(dtContractBudgetItemDetailsTable.DataTable().column(8).header() ).text( full['03-year'] ); 
              // return `<span class="text-nowrap"> ${Intl.NumberFormat().format(full['03-amount'])} </span>`; 
              var output = `<input type="text" class="form-control price-input per-month-price-${full['ItemsId']} jan-month-rate-${full['ItemsId']}" value="${Intl.NumberFormat().format(full['03-amount'])}" placeholder="0"  />`;
              return output;
            }
          }, 
          {
            // april cost
            targets: 9, 
            render: function (data, type, full, meta) { 
              $(dtContractBudgetItemDetailsTable.DataTable().column(9).header() ).text( full['04-year'] ); 
              // return `<span class="text-nowrap"> ${Intl.NumberFormat().format(full['04-amount'])} </span>`; 
              var output = `<input type="text" class="form-control price-input per-month-price-${full['ItemsId']} jan-month-rate-${full['ItemsId']}" value="${Intl.NumberFormat().format(full['04-amount'])}" placeholder="0"  />`;
              return output;
            }
          },
          {
            // may cost
            targets: 10, 
            render: function (data, type, full, meta) { 
              $(dtContractBudgetItemDetailsTable.DataTable().column(10).header() ).text( full['05-year'] ); 
              // return `<span class="text-nowrap"> ${Intl.NumberFormat().format(full['05-amount'])} </span>`; 
              var output = `<input type="text" class="form-control price-input per-month-price-${full['ItemsId']} jan-month-rate-${full['ItemsId']}" value="${Intl.NumberFormat().format(full['05-amount'])}" placeholder="0"  />`;
              return output;
            }
          }, 
          {
            // june cost
            targets: 11, 
            render: function (data, type, full, meta) { 
              $(dtContractBudgetItemDetailsTable.DataTable().column(11).header() ).text( full['06-year'] ); 
              // return `<span class="text-nowrap"> ${Intl.NumberFormat().format(full['06-amount'])} </span>`; 
              var output = `<input type="text" class="form-control price-input per-month-price-${full['ItemsId']} jan-month-rate-${full['ItemsId']}" value="${Intl.NumberFormat().format(full['06-amount'])}" placeholder="0"  />`;
              return output;
            }
          }, 
          {
            // july cost
            targets: 12, 
            render: function (data, type, full, meta) { 
              $(dtContractBudgetItemDetailsTable.DataTable().column(12).header() ).text( full['07-year'] ); 
              // return `<span class="text-nowrap"> ${Intl.NumberFormat().format(full['07-amount'])} </span>`; 
              var output = `<input type="text" class="form-control price-input per-month-price-${full['ItemsId']} jan-month-rate-${full['ItemsId']}" value="${Intl.NumberFormat().format(full['07-amount'])}" placeholder="0"  />`;
              return output;
            }
          }, 
          {
            // Augest cost
            targets: 13, 
            render: function (data, type, full, meta) { 
              $(dtContractBudgetItemDetailsTable.DataTable().column(13).header() ).text( full['08-year'] ); 
              // return `<span class="text-nowrap"> ${Intl.NumberFormat().format(full['08-amount'])} </span>`; 
              var output = `<input type="text" class="form-control price-input per-month-price-${full['ItemsId']} jan-month-rate-${full['ItemsId']}" value="${Intl.NumberFormat().format(full['08-amount'])}" placeholder="0"  />`;
              return output;
            }
          },
          {
            // September cost
            targets: 14, 
            render: function (data, type, full, meta) { 
              $(dtContractBudgetItemDetailsTable.DataTable().column(14).header() ).text( full['09-year'] ); 
              // return `<span class="text-nowrap"> ${Intl.NumberFormat().format(full['09-amount'])} </span>`; 
              var output = `<input type="text" class="form-control price-input per-month-price-${full['ItemsId']} jan-month-rate-${full['ItemsId']}" value="${Intl.NumberFormat().format(full['09-amount'])}" placeholder="0"  />`;
              return output;
            }
          }, 
          {
            // Oct cost
            targets: 15, 
            render: function (data, type, full, meta) { 
              $(dtContractBudgetItemDetailsTable.DataTable().column(15).header() ).text( full['10-year'] ); 
              // return `<span class="text-nowrap"> ${Intl.NumberFormat().format(full['10-amount'])} </span>`; 
              var output = `<input type="text" class="form-control price-input per-month-price-${full['ItemsId']} jan-month-rate-${full['ItemsId']}" value="${Intl.NumberFormat().format(full['10-amount'])}" placeholder="0"  />`;
              return output;
            }
          }, 
          {
            // Nov cost
            targets: 16, 
            render: function (data, type, full, meta) { 
              $(dtContractBudgetItemDetailsTable.DataTable().column(16).header() ).text( full['11-year'] ); 
              // return `<span class="text-nowrap"> ${Intl.NumberFormat().format(full['11-amount'])} </span>`; 
              var output = `<input type="text" class="form-control price-input per-month-price-${full['ItemsId']} jan-month-rate-${full['ItemsId']}" value="${Intl.NumberFormat().format(full['11-amount'])}" placeholder="0"  />`;
              return output;
            }
          },  
          {
            // Dec cost
            targets: 17, 
            render: function (data, type, full, meta) { 
              $(dtContractBudgetItemDetailsTable.DataTable().column(17).header() ).text( full['12-year'] ); 
              // return `<span class="text-nowrap"> ${Intl.NumberFormat().format(full['12-amount'])} </span>`; 
              var output = `<input type="text" class="form-control  price-input per-month-price-${full['ItemsId']} jan-month-rate-${full['ItemsId']}" value="${Intl.NumberFormat().format(full['12-amount'])}" placeholder="0"  />`;
              return output;
            }
          },   
  
          // { visible: false, targets: 18 },
           
            
          // {
          //   // Actions
          //   targets: -1,
          //   title: 'Actions',
          //   orderable: false,
          //   render: function (data, type, full, meta) {
          //     // return (
          //     //   '<a href="' +
          //     //   userView +
          //     //   '" class="btn btn-sm btn-icon">' +
          //     //   feather.icons['eye'].toSvg({ class: 'font-medium-3 text-body' }) +
          //     //   '</a>'
          //     // );
          //     // var output = ` <a   class="ms-2 add-new " data-bs-toggle = "modal" data-bs-target: "#modals-slide-in" > ${feather.icons['edit'].toSvg({ class: 'font-medium-2 text-body' })} </a>`;
  
          //     return output;
          //   }
          // }
        ],
        order: [[2, 'asc']],
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
            exportOptions: { columns: [1,2,3,4,5,6,7,8,9,8,11,12,13,14,15,16,17] },
            init: function (api, node, config) {
              $(node).removeClass('btn-secondary');
            }
          },
          // {  
          //   text: 'Filter',
          //   className: 'mx-1 btn btn-success dropdown-toggle',
          //   attr: {
          //     'data-bs-toggle': 'dropdown',
          //     'aria-expanded': 'false'
          //   }, 
          //   init: function (api, node, config) {
          //     $(node).removeClass('btn-secondary');
          //   }
          // }
        ],
        
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
          $(document).on('keypress','.price-input',function (e) {  
            var charCode = (e.which) ? e.which : event.keyCode  
            if (String.fromCharCode(charCode).match(/[^0-9\.\,]/g))     
                return false;    
          }); 

          $(document).on('keyup','.qty-input, .unit-rate',function (e) { 
            var id = $(this).attr("data-id");
            var qty = $(".qty-"+id).val().replace(/,/g, '') ? $(".qty-"+id).val().replace(/,/g, '') : 0;
            var unitPrice = $(".unit-rate-"+id).val().replace(/,/g, '') ? $(".unit-rate-"+id).val().replace(/,/g, '') : 0; 
             
            var totalPrice = parseFloat(qty) * parseFloat(unitPrice);
            $(".total-amount-"+id).html(Intl.NumberFormat().format(totalPrice??0)??0);
            var perMonthPrice = parseFloat(totalPrice) / 12; 
            $(`.per-month-price-${id}`).val(Intl.NumberFormat().format(perMonthPrice??0));

          });
   
            
        }
      });
    } 
  }


 


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
  // if (dtContact.length) {
  //   dtContact.each(function () {
  //     new Cleave($(this), {
  //       phone: true,
  //       phoneRegionCode: 'US'
  //     });
  //   });
  // }
  
});
