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

  var totalUsers = 0;
  var totalApplicationUsers = 0;
  var totalCustomers = 0;
  var totalOnlineUser = 0;
  var token = $('.j-w-t').val();
  var baseUrl = $('.baseUrl').val();

  var dtUserTable = $('.user-list-table'),
    newUserSidebar = $('.new-user-modal'),
    newUserForm = $('.add-new-user'),
    select = $('.select2'),
    dtContact = $('.dt-contact'),
    statusObj = {
      0: { title: 'Pending', class: 'badge-light-warning' },
      1: { title: 'Active', class: 'badge-light-success' }, 
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

  // Users List datatable
  if (dtUserTable.length) {
    dtUserTable.DataTable({
      ajax: {
        'type': 'POST',
        // 'url': assetPath + 'data/user-list.json', 
        'url': baseUrl+'get-users-list',
        'data': {
           user_id: '1', 
           token:token
           // etc..
        },
        "beforeSend": function (xhr) {
          xhr.setRequestHeader('Authorization',
              "Bearer " + token);
        }, 
    }, 
    "drawCallback": function (settings) {  
        var response = settings.json;
        // console.log('response');
        // console.log(response);
        if(response){
          response.data.forEach(full => {
            totalUsers = parseInt(totalUsers)+1;
              if(full['UserTypeName'] == 'Application User'){
                totalApplicationUsers = parseInt(totalApplicationUsers)+1;
              }else if(full['UserTypeName'] == 'Customer'){
                totalCustomers = parseInt(totalCustomers)+1;
              }else if(full['UserTypeName'] == 'Online User'){
                totalOnlineUser = parseInt(totalOnlineUser)+1;
              }
          });
        } 

    }
      , // JSON file to add data
      columns: [
        // columns according to JSON
        { data: '' },
        { data: 'UserName' },
        { data: 'UserLevel' },
        { data: 'UserTypeName' },
        { data: 'Staff' },
        { data: 'status' },
        { data: '' }
      ],
      columnDefs: [
        {
          // For Responsive
          className: 'control',
          orderable: false,
          responsivePriority: 2,
          targets: 0,
          render: function (data, type, full, meta) {
            return '';
          }
        },
        {
          // User full name and username
          targets: 1,
          responsivePriority: 4,
          render: function (data, type, full, meta) { 
             

            $('.total-users').html(totalUsers);
            $('.total-application-users').html(totalApplicationUsers);
            $('.total-customers').html(totalCustomers);
            $('.total-online-users').html(totalOnlineUser);

            var $customerType = full['UserTypeName'],
              $userName = full['UserName'],
              $staff = full['Staff'],
              $userLevel = full['UserLevel'],
              $email = full['Email'],

              $image = full['avatar'];
            if ($image) {
              // For Avatar image
              var $output =
                '<img src="' + assetPath + 'images/avatars/' + $image + '" alt="Avatar" height="32" width="32">';
            } else {
              // For Avatar badge
              var stateNum = Math.floor(Math.random() * 6) + 1;
              var states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];
              var $state = states[stateNum],
                $name = full['UserName']??full['UserName'],
                $initials = $name.match(/\b\w/g) || [];
              $initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();
              $output = '<span class="avatar-content">' + $initials + '</span>';
            }
            var colorClass = $image === '' ? ' bg-light-' + $state + ' ' : '';
            // Creates full output for row
            var $row_output =
              '<div class="d-flex justify-content-left align-items-center">' +
              '<div class="avatar-wrapper">' +
              '<div class="avatar ' +
              colorClass +
              ' me-1">' +
              $output +
              '</div>' +
              '</div>' +
              '<div class="d-flex flex-column">' +
              '<a href="' +
              '/administration/user/'+full['Id'] +
              '" class="user_name text-truncate text-body"><span class="fw-bolder">' +
              $userName +
              '</span></a>' +
              '<small class="emp_post text-muted">' +
              $email +
              '</small>' +
              '</div>' +
              '</div>';
            return $row_output;
          }
        },
        {
          // User Role
          targets: 2,
          className:"text-left",
          render: function (data, type, full, meta) {
            var $role = full['UserLevel'];
            var roleBadgeObj = {
              Customer: feather.icons['user'].toSvg({ class: 'font-medium-3 text-primary me-50' }),
              'Normal Level': feather.icons['settings'].toSvg({ class: 'font-medium-3 text-warning me-50' }),
              Technical: feather.icons['database'].toSvg({ class: 'font-medium-3 text-success me-50' }),
              'FM Coordinator': feather.icons['edit-2'].toSvg({ class: 'font-medium-3 text-info me-50' }),
              Administrator: feather.icons['slack'].toSvg({ class: 'font-medium-3 text-danger me-50' })
            };
            return "<span class='text-truncate align-middle'>" + roleBadgeObj[$role] + $role + '</span>';
          }
        },
        {// user type field
          targets: 3,
          className:"text-left",
          render: function (data, type, full, meta) {
            var $userType = full['UserTypeName'];

            return '<span class="text-nowrap">' + $userType + '</span>';
          }
        },
        {
          targets: 4,
          className:"text-left",
          render: function (data, type, full, meta) {
            var $userName = full['UserName'];

            return '<span class="text-nowrap">' + $userName + '</span>';
          }
        },
        {
          // User Status
          targets: 5,
          className:"text-left",
          render: function (data, type, full, meta) {
            var $loginEnabled = full['LoginEnabled'];

            return (
              '<span class="badge rounded-pill ' +
              statusObj[$loginEnabled].class +
              '" text-capitalized>' +
              statusObj[$loginEnabled].title +
              '</span>'
            );
          }
        },
        {
          // Actions
          targets: -1,
          title: 'Actions',
          className:"text-left",
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<a href="' +
              '/administration/user/'+full['Id'] +
              '" class="btn btn-sm btn-icon">' +
              feather.icons['eye'].toSvg({ class: 'font-medium-3 text-body' }) +
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
        {
          text: 'Add New User',
          className: 'add-new btn btn-primary',
          attr: {
            'data-bs-toggle': 'modal',
            'data-bs-target': '#modals-slide-in'
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
              return 'Details of ' + data['UserName'];
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
