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

  //  console.log(window.location.pathname.split("/").slice(-1)[0]);
  // const contractId = window.location.pathname.split("/").slice(-1)[0];
  const contractId = window.location.pathname.match(/\d+/)[0];
  
  var token = $('.j-w-t').val();
  var baseUrl = $('.baseUrl').val();
  var isRtl = $('html').attr('data-textdirection') === 'rtl'

  var dtScopeServiceTable = $('.contract-scope-table'),
    dtServiceGroupsTable = $('.service-groups-table'),
    dt_sla_table = $('.dt-contract-slas'),
    dtContractContactsTable = $('.contract-contacts-table'),
    dtContractAttachmentsTable = $('.contract-attachments-table'),
    dtContractSitesTable = $('.contracts-sites-table'),
    dtContractAssetsTable = $('.contract-assets-table'),

    dtManpowerDesignationsTable = $('.manpower-designations-table'),
    dtContractManpowerTable = $('.contract-manpower-table'),

    newUserSidebar = $('.new-user-modal'),
    newUserForm = $('.add-new-user'), 
    select = $('.select2'),
    dtContact = $('.dt-contact'),
    statusObj = {
      Active: { title: 'Active', class: 'badge-light-warning' },
      Draft: { title: 'Draft', class: 'badge-light-success' }, 
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

  // dtScopeServiceTable List datatable
  if (dtScopeServiceTable.length) {
    // console.log(useRoute());
    // var id = useRoute().params.id;

    dtScopeServiceTable.DataTable({
      ajax: {
        'type': 'POST', 
        'url': baseUrl+'get-contract-scope',
        'data': {
          contract_id: contractId,//'1511',   
        },
        "beforeSend": function (xhr) {
          xhr.setRequestHeader('Authorization',
              "Bearer " + token);
        }, 
    },  
    displayLength: 5,
    lengthMenu: [5, 10, 25, 50, 75, 100],
    length: 5,
      columns: [
        // columns according to JSON
        // {data: ''},
        { data: 'ServiceGroupName' }, 
        { data: '' }
      ],
      columnDefs: [ 
        // },
        {
          // Invoice ID
          targets: 0,
          // width: '46px',
          render: function (data, type, full, meta) {
            // console.log('full');
            // console.log(full);

            var $applicationRole = full['ServiceGroupName'];
            // Creates full output for row
            var $rowOutput = '<span class="text-start fw-bolder"> ' + $applicationRole + '</span>';
            return $rowOutput;
          }
        }, 
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
          text: 'Add',
          className: 'add-new btn btn-primary',
          attr: {
            'data-bs-toggle': 'modal',
            'data-bs-target': '#addServiceGroupModal'
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
              return 'Details of ' + data['ApplicationRole'];
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
        // Adding role filter once table initialized
        // this.api()
        //   .columns(2)
        //   .every(function () {
        //     var column = this;
        //     var label = $('<label class="form-label" for="UserRole">Role</label>').appendTo('.user_role');
        //     var select = $(
        //       '<select id="UserRole" class="form-select text-capitalize mb-md-0 mb-2"><option value=""> Select Role </option></select>'
        //     )
        //       .appendTo('.user_role')
        //       .on('change', function () {
        //         var val = $.fn.dataTable.util.escapeRegex($(this).val());
        //         column.search(val ? '^' + val + '$' : '', true, false).draw();
        //       });

        //     column
        //       .data()
        //       .unique()
        //       .sort()
        //       .each(function (d, j) {
        //         select.append('<option value="' + d + '" class="text-capitalize">' + d + '</option>');
        //       });
        //   });
        // Adding user type filter once table initialized
        // this.api()
        //   .columns(3)
        //   .every(function () {
        //     var column = this;
        //     var label = $('<label class="form-label" for="UserPlan">User Type</label>').appendTo('.user_plan');
        //     var select = $(
        //       '<select id="UserPlan" class="form-select text-capitalize mb-md-0 mb-2"><option value=""> Select User Type </option></select>'
        //     )
        //       .appendTo('.user_plan')
        //       .on('change', function () {
        //         var val = $.fn.dataTable.util.escapeRegex($(this).val());
        //         column.search(val ? '^' + val + '$' : '', true, false).draw();
        //       });

        //     column
        //       .data()
        //       .unique()
        //       .sort()
        //       .each(function (d, j) {
        //         select.append('<option value="' + d + '" class="text-capitalize">' + d + '</option>');
        //       });
        //   });
        // Adding Staff  filter once table initialized
        // this.api()
        //   .columns(5)
        //   .every(function () {
        //     var column = this;
        //     var label = $('<label class="form-label" for="FilterTransaction">Status</label>').appendTo('.user_status');
        //     var select = $(
        //       '<select id="FilterTransaction" class="form-select text-capitalize mb-md-0 mb-2xx"><option value=""> Select Status </option></select>'
        //     )
        //       .appendTo('.user_status')
        //       .on('change', function () {
        //         var val = $.fn.dataTable.util.escapeRegex($(this).val());
        //         column.search(val ? '^' + val + '$' : '', true, false).draw();
        //       });

        //     column
        //       .data()
        //       .unique()
        //       .sort()
        //       .each(function (d, j) {
        //         select.append(
        //           '<option value="' +
        //             statusObj[d].title +
        //             '" class="text-capitalize">' +
        //             statusObj[d].title +
        //             '</option>'
        //         );
        //       });
        //   });
      }
    });
  }
  //end 
  // dtScopeServiceTable List datatable
  if (dtServiceGroupsTable.length) {
    dtServiceGroupsTable.DataTable({
      ajax: {
        'type': 'POST',
        // 'url': assetPath + 'data/user-list.json', 
        'url': baseUrl+'get-service-groups-list',
        'data': {
           user_id: '1', 
           // etc..
        },
        "beforeSend": function (xhr) {
          xhr.setRequestHeader('Authorization',
              "Bearer " + token);
        }, 
    }, 
    // displayLength: 5, 
      columns: [
        // columns according to JSON
        // {data: ''},
        { data: 'ServiceGroupName' }, 
        { data: 'ReferenceCode' }, 
        { data: '' }
      ],
      columnDefs: [ 
        // },
        {
          // Invoice ID
          targets: 0,
          // width: '46px',
          render: function (data, type, full, meta) {
            // console.log('full');
            // console.log(full); 
            var $serviceGroupName = full['ServiceGroupName']; 
            var $rowOutput = '<span class="text-start fw-bolder"> ' + $serviceGroupName + '</span>';
            return $rowOutput;
          }
        }, 
        {
          // Invoice ID
          targets: 1,
          // width: '46px',
          render: function (data, type, full, meta) {
            // console.log('full');
            // console.log(full); 
            var $referenceCode = full['ReferenceCode'];
            // Creates full output for row
            var $rowOutput = '<span class="text-start"> ' + $referenceCode + '</span>';
            return $rowOutput;
          }
        }, 
        {
          // Actions
          targets: -1,
          // title: 'Action',
          width: '80px',
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              ` 
              <div class="form-check d-flex justify-content-center">
                  <input class="form-check-input selected-service-groups" value = "${full['Id']}" data-id = ${full['Id']} type="checkbox"
                      id="userManagementRead${full['Id']}" />
                   
              </div>

              `
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
        // {
        //   text: 'Add',
        //   className: 'add-new btn btn-primary',
        //   attr: {
        //     'data-bs-toggle': 'modal',
        //     'data-bs-target': '#addRoleModal'
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
              return 'Details of ' + data['ServiceGroupName'];
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
      }
    });
  }
  //end 
  // dtContractContactsTable List datatable
  contractContactsList();
  function contractContactsList(params) {
    if (dtContractContactsTable.length) {
      dtContractContactsTable.DataTable({
        ajax: {
          'type': 'POST', 
          'url': baseUrl+'get-contract-contacts',
          'data': {
            contract_id: contractId, // '900', 
             
          },
          "beforeSend": function (xhr) {
            xhr.setRequestHeader('Authorization',
                "Bearer " + token);
          }, 
      }, 
      // displayLength: 5, 
        columns: [
          // columns according to JSON
          // {data: ''},
          { data: 'Salutation' }, 
          { data: 'ContactName' }, 
          { data: 'JobTitle' }, 
          { data: 'ContactAddress' }, 
          { data: 'Email' }, 
          { data: 'MobileNumber' }, 
          { data: 'Extension' },  
          { data: '' }
        ],
        columnDefs: [ 
          // },
          // {
          //   // For Responsive
          //   // className: 'control',
          //   orderable: false,
          //   responsivePriority: 2,
          //   targets: 0,
          //   render: function (data, type, full, meta) { 
          //     var output = `
          //       <div class="d-flex ">
          //       <span class="" > ${feather.icons['eye'].toSvg({ class: 'font-medium-2 text-body' })} </span> 
          //       </div>
          //     `;
          //     return output;
          //   }
          // },
          {
            // Salutation
            targets: 0,
            // width: '46px',
            render: function (data, type, full, meta) {
              // console.log('full');
              // console.log(full); 
              var $salutation = full['Salutation']; 
              var $rowOutput = '<span class="text-start fw-bolder"> ' + $salutation + '</span>';
              return $rowOutput;
            }
          },  
          {
            // ContactName
            targets: 1,
            // width: '46px',
            render: function (data, type, full, meta) {
              // console.log('full');
              // console.log(full); 
              var $contactName = full['ContactName'];
              // Creates full output for row
              var $rowOutput = '<span class="text-start"> ' + $contactName + '</span>';
              return $rowOutput;
            }
          }, 
          {
            // JobTitle
            targets: 2,
            // width: '46px',
            render: function (data, type, full, meta) {
              // console.log('full');
              // console.log(full); 
              var $jobTitle = full['JobTitle'];
              // Creates full output for row
              var $rowOutput = '<span class="text-start"> ' + $jobTitle + '</span>';
              return $rowOutput;
            }
          }, 
          {
            // ContactAddress
            targets: 3, 
            render: function (data, type, full, meta) {
               
              var $contactAddress = full['ContactAddress'];
              // Creates full output for row
              var $rowOutput = '<span class="text-start"> ' + $contactAddress + '</span>';
              return $rowOutput;
            }
          }, 
          {
            // Email
            targets: 4, 
            render: function (data, type, full, meta) {
               
              var $email = full['Email'];
              // Creates full output for row
              var $rowOutput = '<span class="text-start"> ' + $email + '</span>';
              return $rowOutput;
            }
          }, 
          {
            // mobileNumber
            targets: 5, 
            render: function (data, type, full, meta) {
               
              var $mobileNumber = full['MobileNumber'];
              // Creates full output for row
              var $rowOutput = '<span class="text-start"> ' + $mobileNumber + '</span>';
              return $rowOutput;
            }
          }, 
          {
            // mobileNumber
            targets: 6, 
            render: function (data, type, full, meta) {
               
              var $extension = full['Extension'];
              // Creates full output for row
              var $rowOutput = '<span class="text-start"> ' + $extension + '</span>';
              return $rowOutput;
            }
          }, 
          {
            // Actions
            targets: -1,
            // title: 'Action',
            width: '80px',
            orderable: false,
            render: function (data, type, full, meta) {
              return (
                // '<button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#editPermissionModal">' +
                // feather.icons['edit'].toSvg({ class: 'font-medium-2 text-body' }) +
                // '</i></button>' +
                `
                <div class="spinner-border text-primary d-none contact-spinner-${full["ID"]}" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <button class="btn btn-sm btn-icon delete-record delete-contact-btn delete-contact-btn-${full['ID']}" data-id="${full["ID"]}">
                ${feather.icons['trash'].toSvg({ class: 'font-medium-2 text-body' })}
                </button>`
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
            text: 'Add Contact',
            className: 'add-new btn btn-primary',
            attr: {
              'data-bs-toggle': 'modal',
              'data-bs-target': '#add-contact-modal'
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
                return 'Details of ' + data['ServiceGroupName'];
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
          $(document).on("click",".delete-contact-btn",function () {
            
          //  $(".delete-contact-btn").on("click",function () {

             var id = $(this).attr("data-id");
            $(".contact-spinner-"+id).removeClass("d-none");
            $(".delete-contact-btn-"+id).addClass("d-none"); 
            var parameters = {
              contact_id : id,
            }
            apiCallFunction('delete-contract-contact',parameters).then((response)=>{
                if(response.status == 200){
                  toastr['success']("Contact Deleted!", 'Success!', {
                    closeButton: true,
                    tapToDismiss: false,
                    rtl: isRtl
                  }); 
  
                  dtContractContactsTable.DataTable().destroy();
                  contractContactsList();  
  
                  // $('.contract-scope-table').DataTable().ajax.reload();
                   
                }  
            });  
  
          })
        }
      });
    } 
  }
  //end 
  

  // dtContractAttachmentsTable List datatable
  if (dtContractAttachmentsTable.length) {
    dtContractAttachmentsTable.DataTable({
      ajax: {
        'type': 'POST', 
        'url': baseUrl+'get-contract-attachments',
        'data': {
          contract_id:contractId, //'900', 
           
        },
        "beforeSend": function (xhr) {
          xhr.setRequestHeader('Authorization',
              "Bearer " + token);
        }, 
    }, 
    // displayLength: 5, 
      columns: [
        // columns according to JSON
        // {data: ''}, 
        { data: 'ContactName' },  
        { data: 'ContactAddress' },  
        { data: 'MobileNumber' }, 
        { data: 'Extension' },  
        { data: '' }
      ],
      columnDefs: [     
        {
          // ContactName
          targets: 0,
          // width: '46px',
          render: function (data, type, full, meta) {
            // console.log('full');
            // console.log(full); 
            var $contactName = full['ContactName'];
            // Creates full output for row
            var $rowOutput = '<span class="text-start"> ' + $contactName + '</span>';
            return $rowOutput;
          }
        },  
        {
          // ContactAddress
          targets: 1, 
          render: function (data, type, full, meta) {
             
            var $contactAddress = full['ContactAddress'];
            // Creates full output for row
            var $rowOutput = '<span class="text-start"> ' + $contactAddress + '</span>';
            return $rowOutput;
          }
        },  
        {
          // mobileNumber
          targets: 2, 
          render: function (data, type, full, meta) {
             
            var $mobileNumber = full['MobileNumber'];
            // Creates full output for row
            var $rowOutput = '<span class="text-start"> ' + $mobileNumber + '</span>';
            return $rowOutput;
          }
        }, 
        {
          // mobileNumber
          targets: 3, 
          render: function (data, type, full, meta) {
             
            var $extension = full['Extension'];
            // Creates full output for row
            var $rowOutput = '<span class="text-start"> ' + $extension + '</span>';
            return $rowOutput;
          }
        }, 
        {
          // Actions
          targets: -1,
          // title: 'Action',
          width: '80px',
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<button class="btn btn-sm btn-icon" data-bs-toggle="modal" data-bs-target="#editPermissionModal">' +
              feather.icons['edit'].toSvg({ class: 'font-medium-2 text-body' }) +
              '</i></button>' +
              '<button class="btn btn-sm btn-icon delete-record">' +
              feather.icons['trash'].toSvg({ class: 'font-medium-2 text-body' }) +
              '</button>'
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
          text: 'Add Attachment',
          className: 'add-new btn btn-primary',
          attr: {
            'data-bs-toggle': 'modal',
            'data-bs-target': '#add-attachment-modal',    
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
              return 'Details of ' + data['ServiceGroupName'];
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
      }
    });
  }
  //end 
  // dt_sla_table
  var groupColumn = 0;
  if (dt_sla_table.length) {
    var contractSitesTable = dt_sla_table.DataTable({
      // ajax: assetPath + 'data/table-datatable.json',
      ajax: {
        'type': 'POST', 
        'url': baseUrl+'get-contract-slas',
          'data': {
            contract_id:contractId, //'900',  
            // etc..
          },
          "beforeSend": function (xhr) {
            xhr.setRequestHeader('Authorization',
                "Bearer " + token);
          }, 
      }, 
      columns: [
        // {data:'PriorityCode'},
        { data: 'Priority' },
        { data: 'SLA Type' },
        { data: 'SLA Time' },
        { data: 'Escalation L1' },
        { data: 'Escalation L2' },
        { data: 'Escalation L3' }, 
        { data: '' }
      ], 
      columnDefs: [
        // {
        //   // For Responsive
      //   className: 'control',
        //   orderable: false,
        //   targets: 0
        // },
        { visible: false, targets: groupColumn },
        {
          // Escalation L1
          targets: 2,
          render: function (data, type, full, meta) {
             var output = `
             <input type="Text" class="form-control sla-time-${full["ID"]}" value="${full['SLA Time']}" placeholder="Edit SLA Time"  />
             
             `;
            return (output);
          }
        },
        {
          // Escalation L1
          targets: 3,
          render: function (data, type, full, meta) {
             var output = `
             <input type="Text" class="form-control escalation-1-${full["ID"]} " value="" placeholder="Edit Escalation L1"  />
             
             `;
            return (output);
          }
        },
        {
          // Escalation L2
          targets: 4,
          render: function (data, type, full, meta) {
             var output = `
             <input type="Text" class="form-control  escalation-2-${full["ID"]} " value="" placeholder="Edit Escalation L2"  />
             
             `;
            return (output);
          }
        },
        {
          // Escalation L3
          targets: 5,
          render: function (data, type, full, meta) {
             var output = `
             <input type="Text" class="form-control escalation-3-${full["ID"]}  " value="" placeholder="Edit Escalation L3"  />
             
             `;
            return (output);
          }
        },
        {
          // Actions
          targets: -1,
          title: 'Actions',
          orderable: false,
          render: function (data, type, full, meta) {
            return ( 
              `
              <div class="spinner-border text-primary d-none loading-spinner-${full["ID"]}" role="status">
                    <span class="visually-hidden">Loading...</span>
              </div>
              <a  class="item-edit edit-sla-btn edit-sla-btn-${full["ID"]}" data-id="${full['ID']}" data-type-id="${full['SLATypeId']}" data-priority-id="${full['PriorityId']}" >
                ${feather.icons['edit'].toSvg({ class: 'font-small-4 edit-sla-btn-icon' })}
              </a>`
            );
          }
        }
      ],
      order: [[groupColumn, 'asc']],
      dom: '<"d-flex justify-content-between align-items-center mx-0 row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>t<"d-flex justify-content-between mx-0 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
      displayLength: 15,
      lengthMenu: [7, 10,15, 25, 50, 75, 100],
      drawCallback: function (settings) {
        var api = this.api();
        var rows = api.rows({ page: 'current' }).nodes();
        var last = null;

        api
          .column(groupColumn, { page: 'current' })
          .data()
          .each(function (group, i) {
            if (last !== group) {
              $(rows)
                .eq(i)
                .before('<tr class="group"><td colspan="8">' + group + '</td></tr>');

              last = group;
            }
          });
      },
      
      initComplete: function () {
        $(document).on('click','.edit-sla-bt',function () {
          var id = $(this).attr("data-id");
          var parameters = {
            id:0,
            contract_id:contractId,
            priority_id:$(this).attr('data-type-id'),
            sla_type_id:$(this).attr('data-priority-id'),
            sla_time:$('.sla-time-'+id).val()
          }
          console.log(parameters);
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
  // end dt_sla_table

  // start dt_contracts_sites
 
    
 
  if (dtManpowerDesignationsTable.length) {
    dtManpowerDesignationsTable.DataTable({
      ajax: {
        'type': 'POST', 
        'url': baseUrl+'get-manpower-designations',
        'data': { 
           // etc..
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
        { data: 'Designation' },
        { data: 'Quantity' }, 
        { data: 'StartDate' },   
        // { data: '' }
      ],
      columnDefs: [
        // {
        //   // For Responsive
        //   // className: 'control',
        //   // orderable: false,
        //   responsivePriority: 2,
        //   targets: 0,
        //   render: function (data, type, full, meta) { 
        //     var output = `${full['Designation']}`;
        //     return output;
        //   }
        // },
        {
          // For Responsive
          // className: 'control',
          orderable: false, 
          targets: 1,
          render: function (data, type, full, meta) { 
            var output = `<input type="text" name="manpower-qty[]" class="form-control numberonly" value="${full['Quantity']}" data-designation-id = "${full['DesignationId']}" data-startDate = "${full['StartDate']}" placeholder="0" />`;
            return output;
          }
        },
         
        
      ],
      displayLength: 400,
      // lengthMenu: [7, 10, 25, 50, 75, 100],
      order: [[1, 'desc']],
      dom:
        '<"d-flex justify-content-between align-items-center header-actions mx-2 row mt-75"' +
        '' +
        '<"col-sm-12 col-lg-12 ps-xl-75 ps-0"<"dt-action-buttons d-flex align-items-center justify-content-center justify-content-lg-end flex-lg-nowrap flex-wrap"<"me-1"f>B>>' +
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
        //   text: 'Add Manpower',
        //   className: ' btn btn-info add-manpower-btn',
        //   // attr: {
        //   //   'data-bs-toggle': 'modal',
        //   //   'data-bs-target': '#modals-slide-in'
        //   // },
        //   // exportOptions: { columns: [0, 1, 2] },
        //   init: function (api, node, config) {
        //     $(node).removeClass('btn-secondary');
        //   }
        // },
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
        $('.numberonly').keypress(function (e) {  
            var charCode = (e.which) ? e.which : event.keyCode  
            if (String.fromCharCode(charCode).match(/[^0-9]/g))     
                return false;    
        }); 
        // alert('done');
        // Adding role filter once table initialized 
        // $(document).on('click','.add-manpower-btn',function () {
             
        //     var quantities = $('input[name^=manpower-qty]').map(function(idx, elem) {
        //       return $(elem).val();
        //     }).get(); 
        //     console.log(quantities);  
        // })
         
        // Adding user type filter once table initialized
         
      }
    });
  }
  // end dtManpowerDesignationsTable datatable


  if (dtContractManpowerTable.length) {
    dtContractManpowerTable.DataTable({
      ajax: {
        'type': 'POST', 
        'url': baseUrl+'get-contract-manpower',
        'data': {
          contract_id:contractId, //'900', 
           
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
        { data: 'Designation' },
        { data: 'IsCurrent' }, 
        { data: 'EnteredBy' }, 
        { data: 'EntryDate' }, 
        { data: 'Quantity' }, 
        { data: 'StartDate' },   
        // { data: '' }
      ],
      columnDefs: [
        {
          // For Responsive
          // className: 'control',
          // orderable: false, 
          targets: 4,
          render: function (data, type, full, meta) { 
            var output = `${ parseInt(full['Quantity'])}`;
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
          exportOptions: { columns: [0, 1, 2, 3,4,5] },
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
  // end dtContractManpowerTable datatable
  

  function generateTry(response,field) {
    var propertiesKeys = [];
    var propertyGroups = response.data.reduce(function (r, el) { 
        r[el.field] = r[el.field] || [];
        r[el.field].push(el);
        propertiesKeys.push(el.field); 
      return r;
    }, Object.create(null));
    console.log(propertyGroups); 
    var uniquePropertiesIds = [...new Set(propertiesKeys)];
    console.log(uniquePropertiesIds);
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
  if (dtContact.length) {
    dtContact.each(function () {
      new Cleave($(this), {
        phone: true,
        phoneRegionCode: 'US'
      });
    });
  }

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

 


});
