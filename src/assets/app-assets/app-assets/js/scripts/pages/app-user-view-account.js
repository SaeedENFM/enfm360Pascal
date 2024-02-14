/*=========================================================================================
    File Name: app-user-view-account.js
    Description: User View Account page
    --------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

$(function () {
  'use strict';

  // Variable declaration for table
  var dt_project_table = $('.datatable-project'),
    // dtInvoiceTable = $('.invoice-table'),
    dtUserContractsTable = $('.contracts-list-table'), 
    dtUserRolesList = $('.user-roles-list-table'), 

    invoicePreview = 'app-invoice-preview.html',
    assetPath = '/src/assets/app-assets//app-assets/';

  if ($('body').attr('data-framework') === 'laravel') {
    assetPath = $('body').attr('data-asset-path');
    invoicePreview = assetPath + 'app/invoice/preview';
  }

  var token = $('.j-w-t').val();
  var baseUrl = $('.baseUrl').val();

  // Project datatable
  // --------------------------------------------------------------------

  if (dt_project_table.length) {
    var dt_project = dt_project_table.DataTable({
      ajax: assetPath + 'data/projects-list.json', // JSON file to add data
      ordering: false,
      columns: [
        // columns according to JSON
        { data: '' },
        { data: 'project_name' },
        { data: 'total_task' },
        { data: 'progress' },
        { data: 'hours' }
      ],
      columnDefs: [
        {
          // For Responsive
          className: 'control',
          responsivePriority: 2,
          targets: 0,
          render: function (data, type, full, meta) {
            return '';
          }
        },
        {
          // User full name and email
          targets: 1,
          responsivePriority: 4,
          render: function (data, type, full, meta) {
            var $name = full['project_name'],
              $framework = full['framework'],
              $image = full['project_image'];
            if ($image) {
              // For Avatar image
              var $output =
                '<img src="' +
                assetPath +
                'images/icons/brands/' +
                $image +
                '" alt="Project Image" width="32" class="rounded-circle">';
            } else {
              // For Avatar badge
              var stateNum = Math.floor(Math.random() * 6) + 1;
              var states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];
              var $state = states[stateNum],
                $name = full['full_name'],
                $initials = $name.match(/\b\w/g) || [];
              $initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();
              $output = '<span class="avatar-initial rounded-circle bg-label-' + $state + '">' + $initials + '</span>';
            }
            // Creates full output for row
            var $row_output =
              '<div class="d-flex justify-content-left align-items-center">' +
              '<div class="avatar-wrapper">' +
              '<div class="avatar me-1">' +
              $output +
              '</div>' +
              '</div>' +
              '<div class="d-flex flex-column">' +
              '<span class="text-truncate fw-bolder">' +
              $name +
              '</span>' +
              '<small class="text-muted">' +
              $framework +
              '</small>' +
              '</div>' +
              '</div>';
            return $row_output;
          }
        },
        {
          // Label
          targets: -2,
          responsivePriority: 1,
          render: function (data, type, full, meta) {
            var $progress = full['progress'] + '%',
              $color;
            switch (true) {
              case full['progress'] < 25:
                $color = 'bg-danger';
                break;
              case full['progress'] < 50:
                $color = 'bg-warning';
                break;
              case full['progress'] < 75:
                $color = 'bg-info';
                break;
              case full['progress'] <= 100:
                $color = 'bg-success';
                break;
            }
            return (
              '<div class="d-flex flex-column"><small class="mb-1">' +
              $progress +
              '</small>' +
              '<div class="progress w-100 me-3" style="height: 6px;">' +
              '<div class="progress-bar ' +
              $color +
              '" style="width: ' +
              $progress +
              '" aria-valuenow="' +
              $progress +
              '" aria-valuemin="0" aria-valuemax="100"></div>' +
              '</div>' +
              '</div>'
            );
          }
        }
      ],
      order: [[1, 'desc']],
      dom: 't',
      displayLength: 7,
      language: {
        sLengthMenu: 'Show _MENU_',
        // search: '',
        searchPlaceholder: 'Search Project'
      },
      // For responsive popup
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of ' + data['framework'];
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== '' // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                    col.rowIndex +
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

            return data ? $('<table class="table"/><tbody />').append(data) : false;
          }
        }
      }
    });
  }

  // contracts list datatable 
  if (dtUserContractsTable.length) {
    dtUserContractsTable.DataTable({
      ajax: {
        'type': 'POST',
        // 'url': assetPath + 'data/user-list.json', 
        'url': baseUrl+'get-contracts-list',
        'data': {
           user_id: '1', 
           token:token
           // etc..
        },
        "beforeSend": function (xhr) {
          xhr.setRequestHeader('Authorization',
              "Bearer " + token);
        }, 
    },   // JSON file to add data
      columns: [
        // columns according to JSON
        // {data: ''},
        { data: 'ReferenceCode' },
        { data: 'ContractName' },
        { data: 'ContractTypeName' }, 
        { data: 'ContractStartDate' }, 
        { data: '' }
      ],
      columnDefs: [
        // {
        //   // For Responsive
        //   // className: 'control',
        //   orderable: false,
        //   responsivePriority: 2,
        //   targets: 0,
        //   render: function (data, type, full, meta) {
        //     return '';
        //   }
        // },
        {
          // Invoice ID
          targets: 0,
          // width: '46px',
          render: function (data, type, full, meta) {
            // console.log('full');
            // console.log(full);

            var $referenceCode = full['ReferenceCode'];
            // Creates full output for row
            var $rowOutput = '<a class="fw-bolder" href="' + invoicePreview + '"> ' + $referenceCode + '</a>';
            return $rowOutput;
          }
        },
        {
          // Invoice status
          targets: 1,
          // width: '42px',
          render: function (data, type, full, meta) { 

            var $contractName = full['ContractName'];
            // Creates full output for row
            var $rowOutput = $contractName;
            return $rowOutput;
          }
        },
        {
          // Total Invoice Amount
          targets: 2,
          // width: '73px',
          render: function (data, type, full, meta) {
            var $contractTypeName = full['ContractTypeName'];
            return $contractTypeName;
          }
        },
        {
          // Issue date
          targets: 3,
          // width: '130px',
          render: function (data, type, full, meta) {
            var $issuedDate = new Date(full['ContractStartDate']);
            // Creates full output for row
            var $rowOutput = moment($issuedDate).format('DD MMM YYYY');
            $issuedDate;
            return $rowOutput;
          }
        },
        {
          // Actions
          targets: -1,
          title: 'Actions',
          width: '80px',
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-flex align-items-center col-actions">' +
              // '<a class="me-1" href="#" data-bs-toggle="tooltip" data-bs-placement="top" title="Send Mail">' +
              // feather.icons['send'].toSvg({ class: 'font-medium-2 text-body' }) +
              // '</a>' +
              '<a class="me-1" href="' +
              invoicePreview +
              '" data-bs-toggle="tooltip" data-bs-placement="top" title="Preview Invoice">' +
              feather.icons['eye'].toSvg({ class: 'font-medium-2 text-body' }) +
              '</a>' +
              '<a href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" title="Download">' +
              feather.icons['download'].toSvg({ class: 'font-medium-2 text-body' }) +
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
        // {
        //   extend: 'collection',
        //   className: 'btn btn-outline-secondary dropdown-toggle me-2',
        //   text: feather.icons['external-link'].toSvg({ class: 'font-small-4 me-50' }) + 'Export',
        //   buttons: [
        //     {
        //       extend: 'print',
        //       text: feather.icons['printer'].toSvg({ class: 'font-small-4 me-50' }) + 'Print',
        //       className: 'dropdown-item',
        //       exportOptions: { columns: [1, 2, 3, 4, 5] }
        //     },
        //     {
        //       extend: 'csv',
        //       text: feather.icons['file-text'].toSvg({ class: 'font-small-4 me-50' }) + 'Csv',
        //       className: 'dropdown-item',
        //       exportOptions: { columns: [1, 2, 3, 4, 5] }
        //     },
        //     {
        //       extend: 'excel',
        //       text: feather.icons['file'].toSvg({ class: 'font-small-4 me-50' }) + 'Excel',
        //       className: 'dropdown-item',
        //       exportOptions: { columns: [1, 2, 3, 4, 5] }
        //     },
        //     {
        //       extend: 'pdf',
        //       text: feather.icons['clipboard'].toSvg({ class: 'font-small-4 me-50' }) + 'Pdf',
        //       className: 'dropdown-item',
        //       exportOptions: { columns: [1, 2, 3, 4, 5] }
        //     },
        //     {
        //       extend: 'copy',
        //       text: feather.icons['copy'].toSvg({ class: 'font-small-4 me-50' }) + 'Copy',
        //       className: 'dropdown-item',
        //       exportOptions: { columns: [1, 2, 3, 4, 5] }
        //     }
        //   ],
        //   init: function (api, node, config) {
        //     $(node).removeClass('btn-secondary');
        //     $(node).parent().removeClass('btn-group');
        //     setTimeout(function () {
        //       $(node).closest('.dt-buttons').removeClass('btn-group').addClass('d-inline-flex mt-50');
        //     }, 50);
        //   }
        // },
        // {
        //   text: 'Add New User',
        //   className: 'add-new btn btn-primary',
        //   attr: {
        //     'data-bs-toggle': 'modal',
        //     'data-bs-target': '#modals-slide-in'
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
        // Adding role filter once table initialized
        this.api()
          .columns(2)
          .every(function () {
            var column = this;
            var label = $('<label class="form-label" for="UserRole">Role</label>').appendTo('.user_role');
            var select = $(
              '<select id="UserRole" class="form-select text-capitalize mb-md-0 mb-2"><option value=""> Select Role </option></select>'
            )
              .appendTo('.user_role')
              .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex($(this).val());
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
        // Adding user type filter once table initialized
        this.api()
          .columns(3)
          .every(function () {
            var column = this;
            var label = $('<label class="form-label" for="UserPlan">User Type</label>').appendTo('.user_plan');
            var select = $(
              '<select id="UserPlan" class="form-select text-capitalize mb-md-0 mb-2"><option value=""> Select User Type </option></select>'
            )
              .appendTo('.user_plan')
              .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex($(this).val());
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
  // dtUserRolesList list datatable 
  
  if (dtUserRolesList.length) {
    dtUserRolesList.DataTable({
      ajax: {
        'type': 'POST',
        // 'url': assetPath + 'data/user-list.json', 
        'url': baseUrl+'get-user-roles-list',
        'data': {
           user_id: '1', 
           token:token
           // etc..
        },
        "beforeSend": function (xhr) {
          xhr.setRequestHeader('Authorization',
              "Bearer " + token);
        }, 
    },   // JSON file to add data
      columns: [
        // columns according to JSON
        // {data: ''},
        { data: 'ApplicationRole' }, 
        { data: '' }
      ],
      columnDefs: [
        // {
        //   // For Responsive
        //   className: 'control',
        //   orderable: false,
        //   responsivePriority: 2,
        //   targets: 0,
        //   render: function (data, type, full, meta) {
        //     return '';
        //   }
        // },
        {
          // Invoice ID
          targets: 0,
          // width: '46px',
          render: function (data, type, full, meta) {
            // console.log('full');
            // console.log(full);

            var $applicationRole = full['ApplicationRole'];
            // Creates full output for row
            var $rowOutput = '<span class="text-start fw-bolder"> ' + $applicationRole + '</span>';
            return $rowOutput;
          }
        }, 
        {
          // Actions
          targets: -1,
          title: 'Actions',
          width: '80px',
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              `<div class="form-check d-flex justify-content-center">
              <input
                class="form-check-input"
                type="checkbox"
                id="defaultCheck1"
                ${full['Role_Select'] == '1' ? 'checked' : ''}
              />
            </div>`
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

  // Filter form control to default size
  // ? setTimeout used for multilingual table initialization
  setTimeout(() => {
    $('.dataTables_filter .form-control').removeClass('form-control-sm');
    $('.dataTables_length .form-select').removeClass('form-select-sm');
  }, 300);

  // To initialize tooltip with body container
  $('body').tooltip({
    selector: '[data-bs-toggle="tooltip"]',
    container: 'body'
  });
});
