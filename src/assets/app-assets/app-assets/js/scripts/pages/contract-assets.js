 
 $(function () { 
   ('use strict');
  //  console.log(window.location.pathname.match(/\d+/)[0]); 
  //  console.log(window.location.pathname.split("/"));
  // const contractId = window.location.pathname.split("/").slice(-1)[0];
  const contractId = window.location.pathname.match(/\d+/)[0];
  
  var token = $('.j-w-t').val();
  var baseUrl = $('.baseUrl').val();
  var isRtl = $('html').attr('data-textdirection') === 'rtl'

  var dtContractSitesTable = $('.contracts-sites-table'),
    dtContractAssetsTable = $('.contract-assets-table'),
 
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

  //end 
  // dt_sla_table 
  // end dt_sla_table

  // start dt_contracts_sites
 
    
  if (dtContractAssetsTable.length) {
     
    var contractAssetsTable = dtContractAssetsTable.DataTable({
     ajax: {
        'type': 'POST', 
        'url': baseUrl+'get-contract-assets-list',
          'data': {
            contract_id:contractId, //'1458',  
             
          },
          "beforeSend": function (xhr) {
            xhr.setRequestHeader('Authorization',
                "Bearer " + token);
          }, 
      },  
      columns: [ 
        // { data: '' },
        { data: 'AssetCode' },
        { data: 'AssetName' }, 
        { data: 'AssetMasterCategoryName' }, 
        { data: 'AssetCategoryName' },
        { data: 'AssetSubCategoryName' }, 
        { data: 'PropertyName' },
        { data: 'ZoneName' },
        { data: 'SubZoneName' },
        { data: 'BaseUnitName' },
        { data: 'AssetStatusName' },  
        // { data: '' }
      ], 
      columnDefs: [
        
        
        // { visible:false, targets: 1 },
        // { visible:false, targets: 3 },
        // { visible:false, targets: 5 },
        // { visible:false, targets: 7 },
        // { visible:false, targets: 9 },
        
      ],
      order: [[0, 'asc']],
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
      displayLength: 10,
      lengthMenu: [10, 25, 50, 75, 100],
      drawCallback: function (settings) {

        // var api = this.api();
        // var rows = api.rows({ page: 'current' }).nodes();
        // var last = null; 
        // api
        //   .column(groupColumn, { page: 'current' })
        //   .data();
          // .each(function (group, i) {
          //   if (last !== group) {
          //     $(rows)
          //       .eq(i)
          //       .before('<tr class="group"><td colspan="8">' + group + '</td></tr>');

          //     last = group;
          //   }
          // });

          var response = settings.json;
          // console.log('response');
          // console.log(response); 
          if($("#asset-jstree ul").length == 0){ 
            if(response){ 
              var masterCategoryKeys = [];
              var masterCategoryGroups = response.data.reduce(function (r, el) { 
                  r[el.AssetMasterCategoryName] = r[el.AssetMasterCategoryName] || [];
                  r[el.AssetMasterCategoryName].push(el);
                  masterCategoryKeys.push(el.AssetMasterCategoryName); 
                return r;
              }, []);
              // console.log(masterCategoryGroups); 
              var uniqueMasterCategoryIds = [...new Set(masterCategoryKeys)];
              // console.log('master category ids');
              // console.log(uniqueMasterCategoryIds);

              var treeHtml = '';

              for (let index = 0; index < uniqueMasterCategoryIds.length; index++) {
                const masterCategoryKey = uniqueMasterCategoryIds[index];
                // console.log(masterCategoryKey);

                // start property tree
                var categoriesKeys = []; 
                var categoryGroups = response.data.reduce(function (r, el) {  
                    r[el.AssetCategoryName] = r[el.AssetCategoryName] || [];
                    r[el.AssetCategoryName].push(el);
                    categoriesKeys.push(el.AssetCategoryName); 
                  return r;
                }, Object.create(null));
                // console.log(categoryGroups); 
                var uniqueCategoriesKeys = [...new Set(categoriesKeys)];
                // console.log('category ids');
                // console.log(uniqueCategoriesKeys);
                
                var categoryTreeHtml = '';
                for (let index = 0; index < uniqueCategoriesKeys.length; index++) {
                  const categoryKey = uniqueCategoriesKeys[index];
                  // console.log(categoryKey);

                  //start zone tree
                  var zonesKeys = []; 
                  var zonesGroups = response.data.reduce(function (r, el) {  
                      r[el.AssetSubCategoryName] = r[el.AssetSubCategoryName] || [];
                      r[el.AssetSubCategoryName].push(el);
                      zonesKeys.push(el.AssetSubCategoryName); 
                    return r;
                  }, Object.create(null));
                  // console.log(categoryGroups); 
                  var uniqueZonesIds = [...new Set(zonesKeys)];
                  // console.log('sub category ids');
                  
                  // console.log(uniqueZonesIds); 

                  var zoneTreeHtml = '';
                  for (let index = 0; index < uniqueZonesIds.length; index++) {
                    const subCategoryKey = uniqueZonesIds[index];

                    //start subCategory tree
                     
                    var singleZone = zonesGroups[subCategoryKey][0]; 
                    if(singleZone.AssetMasterCategoryName == masterCategoryKey && singleZone.AssetCategoryName == categoryKey ){
                      var html = `
                        <li class="assets-sub-category-tree" data-tree = "sub-category" data-master-category = "${masterCategoryKey}" data-category = "${categoryKey}" data-sub-category = "${subCategoryKey}" data-jstree='{"icon" : "fa fa-city"}'>
                        ${subCategoryKey} 
                        </li>
                      `;
                      zoneTreeHtml = zoneTreeHtml + html; 
                    } 

                  }
                  // end of subCategory tree

                  var singleProperty = categoryGroups[categoryKey][0];
                  if(singleProperty.AssetMasterCategoryName == masterCategoryKey){
                    var html = `
                      <li class="assets-category-tree" data-tree = "category" data-master-category = "${masterCategoryKey}" data-category = "${categoryKey}" data-jstree='{"icon" : "fa fa-city"}'>
                        ${categoryKey} 
                        <ul>
                            ${zoneTreeHtml}
                        </ul>
                      </li>
                    `;
                    categoryTreeHtml = categoryTreeHtml + html; 
                  } 
                }
                // end of property tree


                //start areas tree 
                var html = `
                  <li class="assets-tree" data-tree = "master-category" data-master-category = "${masterCategoryKey}" data-jstree='{"icon" : "fa fa-location-crosshairs"}'>
                  ${masterCategoryKey} 
                    <ul> 
                          ${categoryTreeHtml}
                      </ul>
                  </li>
                `; 
                // console.log(areaGroups[masterCategoryKey]);
                treeHtml = treeHtml + html; 
                // return false; 
              }//end of area loop
              $('#asset-jstree').html(`
                <ul>
                ${treeHtml}
                </ul>
              `);  
              $('#asset-jstree').jstree();

              
               
              // end of tree click event
             

            }//end of check response
          }
          //end of check list


      },
      buttons: [ 
        { 
          extend: 'excel',
          text: 'Export',
          className: ' btn btn-primary',
          // attr: {
          //   'data-bs-toggle': 'modal',
          //   'data-bs-target': '#modals-slide-in'
          // },
          exportOptions: { columns: [0, 1, 2, 3,4,5,6,7] },
          init: function (api, node, config) {
            $(node).removeClass('btn-secondary');
          }
        }, 
        // {  
        //   text: 'Show with code',
        //   className: 'ms-1 btn btn-success show-all-fields',
        //   attr: {
        //     'data-column': '0', 
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
              return 'Details of ' + data['AssetCode'];
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

        $('.show-all-fields').on('click', function (e) {
          e.preventDefault();
          // contractSitesTable.column(0).visible(false);
    
          var column1 = contractSitesTable.column(1);  
          column1.visible(!column1.visible());
          var column3 = contractSitesTable.column(3);  
          column3.visible(!column3.visible());
          var column5 = contractSitesTable.column(5);  
          column5.visible(!column5.visible());
          var column7 = contractSitesTable.column(7);  
          column7.visible(!column7.visible());
          var column9 = contractSitesTable.column(9);  
          column9.visible(!column9.visible());

      });

        var areaColumn = this.api().columns(0);
        // console.log(areaColumn); 
        
        $(document).on('click','.assets-tree',function (e) {
          // alert('area click');
          
          var currentTree = $(this).attr('data-tree');
          var masterCategory = $(this).attr('data-master-category');
          var category = $(this).attr('data-category');
          console.log("currentTree");
          console.log(currentTree); 
          console.log('masterCategory');
          console.log(masterCategory); 
          console.log('category');
          console.log(category);

          console.log(' -------------------- ');

          // contractSitesTable.ajax.reload();
          // $('.contracts-sites-table').DataTable().ajax.reload()

          if(currentTree == "master-category"){ 
            console.log('inside master category');
            var regExSearch = `(${masterCategory})`;
            contractAssetsTable
            .columns(2)
            // .search(masterCategory)
            .search(masterCategory ? '^' + masterCategory + '$' : '', true, false).draw()
            .draw(); 

            // var val = $.fn.dataTable.util.escapeRegex(area);
            // console.log('val');
            // console.log(val); 
            // areaColumn.search(val, true, false).draw();

          }else if(currentTree == "category"){
            
            console.log('category');
            
            var regExSearch = `(${masterCategory}|${category})`;
            contractAssetsTable
            .columns([ 2,3 ])
            .search(regExSearch, true, false)
            .draw(); 
          }

          e.stopImmediatePropagation();
          // e.preventDefault();
        });
        // 

        // this.api() 
        //   .columns(2)
        //   .every(function () {
        //     var column = this;    
        //     $(document).on('click','.assets-tree',function (e) {
        //       // alert('area click');
              
        //       var currentTree = $(this).attr('data-tree');
        //       var masterCategory = $(this).attr('data-master-category');
        //       var property = $(this).attr('data-category'); 
        //       // var zone = $(this).attr('data-zone');  
        //       console.log("currentTree");
        //       console.log(currentTree);
        //       console.log(masterCategory);
        //       console.log('---------------');
      
        //       var regExSearch = `(${masterCategory})`;  
        //       if(currentTree == "master-category"){ 
        //         regExSearch = `(${masterCategory})`;  
        //         column.search(regExSearch, true, false).draw(); 
        //       } 
 
        //       e.stopImmediatePropagation();
        //       // e.preventDefault();
        //     });//
        //   });
        // end of master category column 
        // this.api() 
        //   .columns(3)
        //   .every(function () {
        //     var column = this;    
        //     $(document).on('click','.assets-category-tree',function (e) {
        //       // alert('area click');
              
        //       var currentTree = $(this).attr('data-tree'); 
        //       var category = $(this).attr('data-category'); 
        //       // var zone = $(this).attr('data-zone');  
        //       console.log("currentTree");
        //       console.log(currentTree);
        //       console.log(category);
        //       console.log('-----------------');


      
        //       var regExSearch = `(${category})`;    
        //       column.search(regExSearch, true, false).draw(); 
              
 
        //       e.stopImmediatePropagation();
        //       // e.preventDefault();
        //     });//
        //   });
        // end of category column 


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
  // end of dtContractAssetsTable
   
 

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
