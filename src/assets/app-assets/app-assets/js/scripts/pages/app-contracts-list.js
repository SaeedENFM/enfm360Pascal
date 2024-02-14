

$(document).ready(function () {
  
// })

// $(function () {
//   ('use strict');

  var totalClients = 0;
  var clientsList = [];
  var totalContracts = 0;
  var totalAnnualAmount = 0;
  var totalContractsAmount = 0;
  var token = $('.j-w-t').val();
  var baseUrl = $('.baseUrl').val();

  var dtContractsTable = $('.user-contracts-table'),
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

  // Users List datatable
  if ($('.user-contracts-table').length) {
    $('.user-contracts-table').DataTable({
      ajax: {
        'type': 'POST',
        'url': baseUrl+'get-contracts-list',
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
        // console.log('response');
        // console.log(response);
        if(response){
          if(parseInt($('.total-clients').html()) <= 0){
            response.data.forEach(full => {
              totalClients = parseInt(totalClients)+1;
              totalContracts = parseInt(totalContracts)+1;
              totalAnnualAmount = parseFloat(totalAnnualAmount) + parseFloat(full['ContractAmount']);
              totalContractsAmount = parseFloat(totalContractsAmount) + parseFloat(full['OverallContractAmount']);
              clientsList.push(full['ClientName']);
              
            });
            console.log('convertToInternationalCurrencySystem(totalAnnualAmount)');

            console.log(convertToInternationalCurrencySystem(totalAnnualAmount));
            $('.total-clients').html(clientsList.filter(onlyUnique).length);
            $('.total-contracts').html(totalContracts); 
            $('.annual-amount').html(`${convertToInternationalCurrencySystem(totalAnnualAmount) } <span> AED </span>`);
            $('.total-contract-amount').html(`${Intl.NumberFormat().format(totalContractsAmount) } <span> AED </span>`);
          
          }
        } 

    }
      , // JSON file to add data
      columns: [
        // columns according to JSON
        { data: '' },
        { data: 'ReferenceCode' },
        { dataad: 'ContractName' }, 
        { data: 'ContractTypeName' },
        { data: 'StatusName' },
        { data: 'ClientName' },
        { data: 'QuotationNo' },
        { data: 'ContractStartDate' },
        { data: 'ContractEndDate' },
        { data: 'EffectiveDate' },
        { data: 'ContractRenewalDate' },
        { data: 'PrimaryStaff' },
        { data: 'PaymentScheduleName' },
        { data: 'PaymentTypeName' },
        { data: 'ContractAmount' },
        // { data: 'Transportation Cost' },
        { data: 'InvoicedAmount' },
        { data: 'AmountPaid' },
        { data: 'BalanceAmount' },
        { data: 'OverallContractStartDate' },
        { data: 'OverallContractEndDate' },
        { data: 'OverallContractRenewalDate' },
        { data: 'OverallContractAmount' }, 
        // { data: '' }
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
            <div class="">
               <div class="edit-contract-details-btn" data-id="${full['Id']}">
                  <a  class="ms-2 " > ${feather.icons['external-link'].toSvg({ class: 'font-medium-2 text-body' })} </a>
                </div>
               </div>
            `;
            return output;
          }
        },
        {
          // Code //Reference Code
          targets: 1,
          // responsivePriority: 4,
          render: function (data, type, full, meta) { 
            // console.log('data');
            // console.log(data);
            // console.log('full');
            // console.log(full); 

            var $userName = full['ReferenceCode']; 
            return '<span class="text-nowrap ">' + $userName + '</span>'; 
          }
        },
        {
          // Contract
          targets: 2,
          width: '42px',
          render: function (data, type, full, meta) { 
            var $userName = full['ContractName']; 
            return '<span class="text-nowrap">' + $userName + '</span>'; 
          }
        }, 
        {//Contract Type
          targets: 3,
          render: function (data, type, full, meta) {
            var $userName = full['ContractTypeName'];

            return '<span class="text-nowrap">' + $userName + '</span>';
          }
        },
        {
          // contract Status
          targets: 4,
          render: function (data, type, full, meta) {
            var $loginEnabled = full['StatusName']; 
            return (
              '<span class="badge rounded-pill ' +
              statusObj[$loginEnabled].class +
              '" text-capitalized>' +
              statusObj[$loginEnabled].title +
              '</span>'
            );
          }
        },
        {//Client
          targets: 5,
          addClass:'text-nowrap',
          render: function (data, type, full, meta) {
            var $userName = full['ClientName'];

            return '<span class="text-nowrap">' + $userName + '</span>';
          }
        },
        {//Quotation No
          targets: 6,
          render: function (data, type, full, meta) {
            var $userName = full['QuotationNo'];

            return '<span class="text-nowrap">' + $userName + '</span>';
          }
        },
        {//Start Date
          targets: 7,
          render: function (data, type, full, meta) {
            var $userName = full['ContractStartDate'];

            return '<span class="text-nowrap">' + $userName + '</span>';
          }
        },
        {//End Date
          targets: 8,
          render: function (data, type, full, meta) {
            var $userName = full['ContractEndDate'];

            return '<span class="text-nowrap">' + $userName + '</span>';
          }
        },
        {//Effective Date
          targets: 9,
          render: function (data, type, full, meta) {
            var $userName = full['EffectiveDate'];

            return '<span class="text-nowrap">' + $userName + '</span>';
          }
        },
        {//Reminder Date
          targets: 10,
          render: function (data, type, full, meta) {
            var $userName = full['ContractRenewalDate'];

            return '<span class="text-nowrap">' + $userName + '</span>';
          }
        },
        {//Primary Staff
          targets: 11,
          render: function (data, type, full, meta) {
            var $userName = full['PrimaryStaff'];

            return '<span class="text-nowrap">' + $userName + '</span>';
          }
        },
        {//Invoicing Schedule
          targets: 12,
          render: function (data, type, full, meta) {
            var $userName = full['PaymentScheduleName'];

            return '<span class="text-nowrap">' + $userName + '</span>';
          }
        },
        {//Payment type
          targets: 13,
          render: function (data, type, full, meta) {
            var $userName = full['PaymentTypeName'];

            return '<span class="text-nowrap">' + $userName + '</span>';
          }
        }, 
        {//Contract Amount
          targets: 14,
          render: function (data, type, full, meta) {
            var $userName = full['ContractAmount'];

            return '<span class="text-nowrap">' + $userName + '</span>';
          }
        },
        // {//Transportation Cost
        //   targets: 4,
        //   render: function (data, type, full, meta) {
        //     var $userName = full['UserName'];

        //     return '<span class="text-nowrap">' + $userName + '</span>';
        //   }
        // },
        {//Invoiced Amount
          targets: 15,
          render: function (data, type, full, meta) {
            var $userName = full['InvoicedAmount'];

            return '<span class="text-nowrap">' + $userName + '</span>';
          }
        },
        {//Amount Paid
          targets: 16,
          render: function (data, type, full, meta) {
            var $userName = full['AmountPaid'];

            return '<span class="text-nowrap">' + $userName + '</span>';
          }
        },
        {//Balance Amount
          targets: 17,
          render: function (data, type, full, meta) {
            var $userName = full['BalanceAmount'];

            return '<span class="text-nowrap">' + $userName + '</span>';
          }
        },
        {//Overall Start Date
          targets: 18,
          render: function (data, type, full, meta) {
            var $userName = full['OverallContractStartDate'];

            return '<span class="text-nowrap">' + $userName + '</span>';
          }
        },
        {//Overall End Date
          targets: 19,
          render: function (data, type, full, meta) {
            var $userName = full['OverallContractEndDate'];

            return '<span class="text-nowrap">' + $userName + '</span>';
          }
        },
        {//Overall Reminder Date
          targets: 20,
          render: function (data, type, full, meta) {
            var $userName = full['OverallContractRenewalDate'];

            return '<span class="text-nowrap">' + $userName + '</span>';
          }
        },
        {//Overall Contract Amount
          targets: 21,
          render: function (data, type, full, meta) {
            var $userName = full['OverallContractAmount'];

            return '<span class="text-nowrap">' + $userName + '</span>';
          }
        }, 

        // {
        //   // contract Status
        //   targets: 22,
        //   render: function (data, type, full, meta) {
        //     var $loginEnabled = full['StatusName'];

        //     return (
        //       '<span class="badge rounded-pill ' +
        //       statusObj[$loginEnabled].class +
        //       '" text-capitalized>' +
        //       statusObj[$loginEnabled].title +
        //       '</span>'
        //     );
        //   }
        // },
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
          exportOptions: { columns: [1, 2, 3, 5,6,7,8,9,10,11,12,13,14,15,16] },
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
        $(document).on('click', '.edit-contract-details-btn', function() {
          var id = $(this).attr('data-id');
          console.log("check");
          $('.current-contract-id').val(id);
          $(".current-contract-id").trigger("change");

          // RouterLink.push({ path: '/about', })
        });
        this.api()
          .columns(3)
          .every(function () {
            var column = this; 
            console.log(column);
            var dropdown = $(`<button type="button" class="mx-1 btn btn-success dropdown-toggle" data-bs-toggle="dropdown"
            aria-expanded="false">
            
            Filter
          </button>
          <div class="dropdown-menu">
            <form action="#" class="px-2 py-2">
              <div class="mb-1 type-filter-dropdown">
              </div>
              <div class="mb-1 client-filter-dropdown">
              </div> 
            </form> 
          </div>`).appendTo('.dt-action-buttons');
            var item = $('<div class="type-dropdown"> </div>').appendTo('.dt-action-buttons');
            var label = $('<label class="form-label" for="UserRole">Contract Type</label>').appendTo('.type-filter-dropdown');
            var select = $(
              '<select id="UserRole" class="form-select text-capitalize mb-md-0 mb-2"><option value=""> Select Contract Type </option></select>'
            )
              .appendTo('.type-filter-dropdown')
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
        // Adding user type filter once table initialized
        this.api()
          .columns(5)
          .every(function () {
            var column = this;
            var label = $('<label class="form-label" for="UserPlan">Clients</label>').appendTo('.client-filter-dropdown');
            var select = $(
              '<select id="UserPlan" class="form-select text-capitalize mb-md-0 mb-2"><option value=""> Select Client </option></select>'
            )
              .appendTo('.client-filter-dropdown')
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
  // if (dtContact.length) {
  //   dtContact.each(function () {
  //     new Cleave($(this), {
  //       phone: true,
  //       phoneRegionCode: 'US'
  //     });
  //   });
  // }
  
});
