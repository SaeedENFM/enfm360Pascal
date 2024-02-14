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
 
  var token = $('.j-w-t').val();
  var baseUrl = $('.baseUrl').val();
  // const contractId = window.location.pathname.split("/").slice(-1)[0];
  const contractId = window.location.pathname.match(/\d+/)[0];

  var dtPrimaryStaffTable = $('.primary-staff-table'), 
    dtAddStaffTable = $('.add-staff-table'),
    dtStaffAllocationTable = $('.staff-allocation-table'),
    dtAllocatedSitesTable = $('.allocated-sites-table'),
    dtAllocatedServicesTable = $('.allocated-services-table'),

    newUserSidebar = $('.new-user-modal'),
    newUserForm = $('.add-new-user'), 
    select = $('.select2'),
    dtContact = $('.dt-contact'),
    statusObj = {
      0: { title: 'No', class: 'badge-light-warning' },
      1: { title: 'Yes', class: 'badge-light-success' }, 
    };
 
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

   
  if (dtPrimaryStaffTable.length) {
    var primaryStaffTable = dtPrimaryStaffTable.DataTable({
      // ajax: assetPath + 'data/table-datatable.json',
      ajax: {
        'type': 'POST', 
        'url': baseUrl+'get-contract-primary-staffs',
          'data': {
            contract_id: contractId //'914',  
          },
          "beforeSend": function (xhr) {
            xhr.setRequestHeader('Authorization',
                "Bearer " + token);
          }, 
      },  
      columns: [ 
        // { data: '' },
        { data: 'Staff Name' }, 
        { data: 'Department' }, 
        { data: 'Designation' }, 
        { data: 'IsPrimary' }, 
        { data: '' }, 
        // { data: '' }, 
        { data: '' }
      ], 
      columnDefs: [
        // { visible:false, targets: 1 }, 
        // {
        // targets: 0,
        // width: '150px',
        // },
        {
          targets: 1,
          width: '150px',
        },
        {
          targets: 2,
          width: '150px',
        },
        {
          targets: 3,
          width:'50px',
          render: function (data, type, full, meta) {
            var $IsPrimary = full['IsPrimary']; 
            return (
              '<span class="badge rounded-pill ' +
              statusObj[$IsPrimary].class +
              '" text-capitalized>' +
              statusObj[$IsPrimary].title +
              '</span>'
            );
          }
        },
        {
          // site allocation
          targets: 4,
          // title: 'Actions',
          width: '80px',
          orderable: false,
          render: function (data, type, full, meta) { 
            return (
              `<button class="btn btn-sm text-nowrap btn-primary sites-service-groups-btn" data-staff-id=${full['StaffId']} data-bs-toggle="modal" data-bs-target="#addSiteAndServiceModel">
               Sites & Service Groups
              </button>`
            );
          }
        },
        // {
        //   // site allocation
        //   targets: 5,
        //   // title: 'Actions',
        //   width: '80px',
        //   orderable: false,
        //   render: function (data, type, full, meta) {
        //     return (
        //       '<button  class="btn btn-sm text-nowrap btn-success ">' +
        //       feather.icons['plus'].toSvg({ class: '' }) +
        //        'Add Service </button>'
        //     );
        //   }
        // },
        {
          // Actions
          targets: -1,
          // title: 'Actions',
          width: '80px',
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
      // order: [[groupColumn, 'asc']],
      // dom: '<"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      dom:
        '<"d-flex justify-content-between align-items-center header-actions mx-2 row mt-75"' +
        '<"col-sm-12 col-lg-4 d-flex justify-content-center justify-content-lg-start" l>' +
        '<"col-sm-12 col-lg-8 ps-xl-75 ps-0"<"dt-action-buttons d-flex align-items-center justify-content-center justify-content-lg-end flex-lg-nowrap flex-wrap"<"me-1"f>B>>' +
        '>t' +
        '<"d-flex justify-content-between mx-2 row mb-1"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
      displayLength: 25,
      lengthMenu: [10, 25, 50, 75, 100],
      drawCallback: function (settings) { 
          var response = settings.json;  
      },
      buttons: [ 
        {  
          text: 'Add Staff',
          className: ' btn btn-primary',
          attr: {
            'data-bs-toggle': 'modal',
            'data-bs-target': '#addStaffModal'
          },
          exportOptions: { columns: [0, 1, 2, 3,4,5,6,7] },
          init: function (api, node, config) {
            $(node).removeClass('btn-secondary');
          }
        },  
      ],
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of ' + data['CityName'];
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== '' // ? Do not show row in modal popup if title is blank (for check box)
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
      initComplete: function () {
        // alert('done'); 
        // console.log(this.api()); 
        // contractSitesTable.column(0).visible(false);
        // contractSitesTable.column(0).visible(false); 
        
        $(document).on('click','.sites-service-groups-btn',function () {
            // console.log("clicked");
            var staffId = $(this).attr("data-staff-id");
            // console.log(staffId);
            $(".current-staff-id").val(staffId);
            dtAllocatedSitesTable.DataTable().destroy();
            allocatedSitesTable(staffId);
            dtAllocatedServicesTable.DataTable().destroy();
            allocatedServicesTable(staffId);
        })

      },
      language: {
        paginate: {
          // remove previous & next text from pagination
          previous: '&nbsp;',
          next: '&nbsp;'
        }
      }
    });

    // Order by the grouping
    // $('.dt-row-grouping tbody').on('click', 'tr.group', function () {
    //   var currentOrder = contractSitesTable.order()[0];
    //   if (currentOrder[0] === groupColumn && currentOrder[1] === 'asc') {
    //     contractSitesTable.order([groupColumn, 'desc']).draw();
    //   } else {
    //     contractSitesTable.order([groupColumn, 'asc']).draw();
    //   }
    // });

  }
  // end of dtPrimaryStaffTable
  if (dtAddStaffTable.length) {
    var primaryStaffTable = dtAddStaffTable.DataTable({
      // ajax: assetPath + 'data/table-datatable.json',
      ajax: {
        'type': 'POST', 
        'url': baseUrl+'get-all-staff-list',
          'data': {
            contract_id:contractId, //'914', 
          },
          "beforeSend": function (xhr) {
            xhr.setRequestHeader('Authorization',
                "Bearer " + token);
          }, 
      },  
      columns: [ 
        // { data: '' },
        { data: 'StaffCode' }, 
        { data: 'StaffName' }, 
        { data: 'DesignationName' }, 
        { data: 'DepartmentName' },   
        { data: '' },
        { data: '' },
        { data: '' } 
      ], 
      columnDefs: [
        {
          // allocate
          targets: 4, 
          width: '50px',
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              ` 
              <div class="form-check d-flex justify-content-center">
                  <input class="form-check-input allocate-checkbox" type="checkbox"
                      id="allocated-${full['Id']}" value="${full['Id']}" />
                   
              </div> 
              `
            );
          }
        },
        {
          // fulltime
          targets: 5, 
          width: '50px',
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              ` 
              <div class="form-check d-flex justify-content-center">
                  <input class="form-check-input fulltime-checkbox" type="checkbox"
                      id="fulltime-${full['Id']}" value="${full['Id']}"  />
                   
              </div>

              `
            );
          }
        },
        {
          // primary staff
          targets: 6, 
          width: '50px',
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              ` 
              <div class="form-check d-flex justify-content-center">
                  <input class="form-check-input primary-staff-checkbox" type="checkbox"
                      id="is-primary-${full['Id']}" value="${full['Id']}"  />
                   
              </div>

              `
            );
          }
        },
        // { visible:false, targets: 1 }, 
         
        
      ],
      // order: [[groupColumn, 'asc']],
      // dom: '<"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      dom:
        '<"d-flex justify-content-between align-items-center header-actions mx-2 row mt-75"' +
        '<"col-sm-12 col-lg-4 d-flex justify-content-center justify-content-lg-start" l>' +
        '<"col-sm-12 col-lg-8 ps-xl-75 ps-0"<"dt-action-buttons search-staff-section d-flex align-items-center justify-content-center justify-content-lg-end flex-lg-nowrap flex-wrap"<"me-1 "f>B>>' +
        '>t' +
        '<"d-flex justify-content-between mx-2 row mb-1"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
      displayLength: 25,
      lengthMenu: [10, 25, 50, 75, 100],
      drawCallback: function (settings) {
   
          var response = settings.json;  
      },
      buttons: [ 
          
      ],
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of ' + data['CityName'];
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== '' // ? Do not show row in modal popup if title is blank (for check box)
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
      initComplete: function () {
        // alert('done'); 
        // console.log(this.api()); 
        // contractSitesTable.column(0).visible(false);
        // contractSitesTable.column(0).visible(false); 
        this.api()
        .columns(3)
        .every(function () {
          var column = this;  
          var dropdown = $(`
            <div class=" department-filter-dropdown d-flex">
            </div>
          `).appendTo('.search-staff-section');
          var item = $('<div class="type-dropdown"> </div>').append('.search-staff-section');
          var label = $('<label class="form-label" for="UserRole">Search by department </label>').appendTo('.department-filter-dropdown');
          var select = $(
            '<select id="UserRole" class="form-select text-capitalize mb-md-0 mb-2"><option value=""> Select Deparment </option></select>'
          )
            .appendTo('.department-filter-dropdown')
            .on('change', function () {
              var val = $.fn.dataTable.util.escapeRegex($(this).val());
              console.log('val');
              console.log(val);

              column.search(val ? '^' + val + '$' : '', true, false).draw();
            });

          column
            .data()
            .unique()
            .sort()
            .each(function (d, j) {
              select.append('<option value="' + d + '" class="text-capitalize">' + d + '</option>');
            });
        });
 

      },
      language: {
        paginate: {
          // remove previous & next text from pagination
          previous: '&nbsp;',
          next: '&nbsp;'
        }
      }
    });

    // Order by the grouping
    // $('.dt-row-grouping tbody').on('click', 'tr.group', function () {
    //   var currentOrder = contractSitesTable.order()[0];
    //   if (currentOrder[0] === groupColumn && currentOrder[1] === 'asc') {
    //     contractSitesTable.order([groupColumn, 'desc']).draw();
    //   } else {
    //     contractSitesTable.order([groupColumn, 'asc']).draw();
    //   }
    // });

  }
  if (dtStaffAllocationTable.length) {
    var primaryStaffTable = dtStaffAllocationTable.DataTable({
      // ajax: assetPath + 'data/table-datatable.json',
      ajax: {
        'type': 'POST', 
        'url': baseUrl+'get-contract-allocated-staffs',
          'data': {
            contract_id:contractId, //'1511', 
          },
          "beforeSend": function (xhr) {
            xhr.setRequestHeader('Authorization',
                "Bearer " + token);
          }, 
      },  
      columns: [ 
        // { data: '' },
        { data: 'Property' }, 
        { data: 'Service Group' }, 
        { data: 'Staff' },  
        { data: '' } 
      ], 
      columnDefs: [
         
        // { visible:false, targets: 1 }, 
         
        {
          // Actions
          targets: -1,
          // title: 'Actions',
          width: '80px',
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
      // order: [[groupColumn, 'asc']],
      // dom: '<"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      dom:
        '<"d-flex justify-content-between align-items-center header-actions mx-2 row mt-75"' +
        '<"col-sm-12 col-lg-4 d-flex justify-content-center justify-content-lg-start" l>' +
        '<"col-sm-12 col-lg-8 ps-xl-75 ps-0"<"dt-action-buttons  d-flex align-items-center justify-content-center justify-content-lg-end flex-lg-nowrap flex-wrap"<"me-1 d-flex align-items-center search-allocation-staff-section"f>B>>' +
        '>t' +
        '<"d-flex justify-content-between mx-2 row mb-1"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
      displayLength: 25,
      lengthMenu: [10, 25, 50, 75, 100],
      drawCallback: function (settings) {
  

          var response = settings.json; 

      },
      buttons: [ 
        {  
          text: 'Allocate Staff',
          className: ' btn btn-primary',
          attr: {
            'data-bs-toggle': 'modal',
            'data-bs-target': '#allocate-staff-modal'
          },
          exportOptions: { columns: [0, 1, 2, 3,4,5,6,7] },
          init: function (api, node, config) {
            $(node).removeClass('btn-secondary');
          }
        }, 
      ],
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of ' + data['CityName'];
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== '' // ? Do not show row in modal popup if title is blank (for check box)
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
      initComplete: function () {
        // alert('done'); 
        // console.log(this.api()); 
        // contractSitesTable.column(0).visible(false);
        // contractSitesTable.column(0).visible(false); 
        this.api()
        .columns(1)
        .every(function () {
          var column = this; 
          console.log(column);
          var dropdown = $(`
            <div class=" service-group-filter-dropdown d-flex">
            </div>
          `).appendTo('.search-allocation-staff-section');
          var item = $('<div class="type-dropdown"> </div>').append('.search-allocation-staff-section');
          var label = $('<label class="ms-1 form-label" for="UserRole">Service Groups </label>').appendTo('.service-group-filter-dropdown');
          var select = $(
            '<select id="UserRole" class="form-select text-capitalize mb-md-0 mb-2" style="height:40px;"><option value=""> Select Service Group </option></select>'
          )
            .appendTo('.service-group-filter-dropdown')
            .on('change', function () {
              var val = $.fn.dataTable.util.escapeRegex($(this).val());
              console.log('val');
              console.log(val);

              column.search(val ? '^' + val + '$' : '', true, false).draw();
            });

          column
            .data()
            .unique()
            .sort()
            .each(function (d, j) {
              select.append('<option value="' + d + '" class="text-capitalize">' + d + '</option>');
            });
        });
 

      },
      language: {
        paginate: {
          // remove previous & next text from pagination
          previous: '&nbsp;',
          next: '&nbsp;'
        }
      }
    });

    // Order by the grouping
    // $('.dt-row-grouping tbody').on('click', 'tr.group', function () {
    //   var currentOrder = contractSitesTable.order()[0];
    //   if (currentOrder[0] === groupColumn && currentOrder[1] === 'asc') {
    //     contractSitesTable.order([groupColumn, 'desc']).draw();
    //   } else {
    //     contractSitesTable.order([groupColumn, 'asc']).draw();
    //   }
    // });

  }
  
  // end of dtStaffAllocationTable
  allocatedSitesTable('6825');
  function allocatedSitesTable(staffId) {
    if (dtAllocatedSitesTable.length) {
      var primaryStaffTable = dtAllocatedSitesTable.DataTable({
        // ajax: assetPath + 'data/table-datatable.json',
        ajax: {
          'type': 'POST', 
          'url': baseUrl+'get-contract-staff-properties',
            'data': {
              contract_id:contractId, // '1511',
              staff_id: staffId// '6825',  
            },
            "beforeSend": function (xhr) {
              xhr.setRequestHeader('Authorization',
                  "Bearer " + token);
            }, 
        },  
        columns: [ 
          // { data: '' },
          { data: 'Property' }, 
  
        ], 
        columnDefs: [
           
          // { visible:false, targets: 1 }, 
           
          // {
          //   // Actions
          //   targets: -1,
          //   // title: 'Actions',
          //   width: '80px',
          //   orderable: false,
          //   render: function (data, type, full, meta) {
          //     return (
          //       '<a href="#" class="btn btn-sm btn-icon">' +
          //       feather.icons['trash'].toSvg({ class: 'font-medium-3 text-body' }) +
          //       '</a>'
          //     );
          //   }
          // }
        ],
        // order: [[groupColumn, 'asc']],
        // dom: '<"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
        dom:
          '<"d-flex justify-content-between align-items-center header-actions mx-2 row mt-75"' +
          '' +
          '<"col-sm-12 col-lg-12 ps-xl-75 ps-0"<"dt-action-buttons  d-flex align-items-center justify-content-center justify-content-lg-end flex-lg-nowrap flex-wrap"<"me-1 d-flex align-items-center search-allocation-staff-section"f>B>>' +
          '>t' +
          '<"d-flex justify-content-between mx-2 row mb-1"' +
          '<"col-sm-12 col-md-6"i>' +
          '<"col-sm-12 col-md-6"p>' +
          '>',
        displayLength: 25,
        lengthMenu: [10, 25, 50, 75, 100],
        drawCallback: function (settings) {
    
  
            // var response = settings.json; 
            // console.log(response);
        },
        buttons: [ 
          // {  
          //   text: 'Allocate Staff',
          //   className: ' btn btn-primary',
          //   attr: {
          //     'data-bs-toggle': 'modal',
          //     'data-bs-target': '#allocate-staff-modal'
          //   },
          //   exportOptions: { columns: [0, 1, 2, 3,4,5,6,7] },
          //   init: function (api, node, config) {
          //     $(node).removeClass('btn-secondary');
          //   }
          // }, 
        ],
        responsive: {
          details: {
            display: $.fn.dataTable.Responsive.display.modal({
              header: function (row) {
                var data = row.data();
                return 'Details of ' + data['CityName'];
              }
            }),
            type: 'column',
            renderer: function (api, rowIdx, columns) {
              var data = $.map(columns, function (col, i) {
                return col.title !== '' // ? Do not show row in modal popup if title is blank (for check box)
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
        initComplete: function () {
          // alert('done'); 
          // console.log(this.api()); 
          
        },
        language: {
          paginate: {
            // remove previous & next text from pagination
            previous: '&nbsp;',
            next: '&nbsp;'
          }
        }
      }); 
  
    } 
  }
  // end of dtAllocatedSitesTable
  allocatedServicesTable('6825');
  function allocatedServicesTable(staffId) {
    if (dtAllocatedServicesTable.length) {
      var primaryStaffTable = dtAllocatedServicesTable.DataTable({
        // ajax: assetPath + 'data/table-datatable.json',
        ajax: {
          'type': 'POST', 
          'url': baseUrl+'get-contract-allocated-staffs',
            'data': {
              contract_id:contractId, //'1511',
              staff_id: staffId, //'6825', 
              // etc..
            },
            "beforeSend": function (xhr) {
              xhr.setRequestHeader('Authorization',
                  "Bearer " + token);
            }, 
        },  
        columns: [ 
          // { data: '' },
          { data: 'Service Group' },  
        ], 
        columnDefs: [
           
          // { visible:false, targets: 1 }, 
           
          // {
          //   // Actions
          //   targets: -1,
          //   // title: 'Actions',
          //   width: '80px',
          //   orderable: false,
          //   render: function (data, type, full, meta) {
          //     return (
          //       '<a href="#" class="btn btn-sm btn-icon">' +
          //       feather.icons['trash'].toSvg({ class: 'font-medium-3 text-body' }) +
          //       '</a>'
          //     );
          //   }
          // }
        ],
        // order: [[groupColumn, 'asc']],
        // dom: '<"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
        dom:
          '<"d-flex justify-content-between align-items-center header-actions mx-2 row mt-75"' +
          '' +
          '<"col-sm-12 col-lg-12 ps-xl-75 ps-0"<"dt-action-buttons  d-flex align-items-center justify-content-center justify-content-lg-end flex-lg-nowrap flex-wrap"<"me-1 d-flex align-items-center search-allocation-staff-section"f>B>>' +
          '>t' +
          '<"d-flex justify-content-between mx-2 row mb-1"' +
          '<"col-sm-12 col-md-6"i>' +
          '<"col-sm-12 col-md-6"p>' +
          '>',
        displayLength: 25,
        lengthMenu: [10, 25, 50, 75, 100],
        drawCallback: function (settings) {
    
  
            // var response = settings.json; 
  
        },
        buttons: [ 
          // {  
          //   text: 'Allocate Staff',
          //   className: ' btn btn-primary',
          //   attr: {
          //     'data-bs-toggle': 'modal',
          //     'data-bs-target': '#allocate-staff-modal'
          //   },
          //   exportOptions: { columns: [0, 1, 2, 3,4,5,6,7] },
          //   init: function (api, node, config) {
          //     $(node).removeClass('btn-secondary');
          //   }
          // }, 
        ],
        responsive: {
          details: {
            display: $.fn.dataTable.Responsive.display.modal({
              header: function (row) {
                var data = row.data();
                return 'Details of ' + data['CityName'];
              }
            }),
            type: 'column',
            renderer: function (api, rowIdx, columns) {
              var data = $.map(columns, function (col, i) {
                return col.title !== '' // ? Do not show row in modal popup if title is blank (for check box)
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
        initComplete: function () {
          // alert('done'); 
          // console.log(this.api()); 
           
        },
        language: {
          paginate: {
            // remove previous & next text from pagination
            previous: '&nbsp;',
            next: '&nbsp;'
          }
        }
      }); 
    } 
  }
  // end of dtAllocatedServicesTable

  
 

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
