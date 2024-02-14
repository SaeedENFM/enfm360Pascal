 
$(document).ready(function () { 
// })
//  $(function () { 
  //  ('use strict');
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
 
  var groupColumn = 0;
   
  if ($('.contracts-sites-table').length) { 
    var contractSitesTable = $('.contracts-sites-table').DataTable({
      // ajax: assetPath + 'data/table-datatable.json',
      ajax: {
        'type': 'POST', 
        'url': baseUrl+'get-contract-sites',
          'data': {
            contract_id:contractId, //'1134', 
             
          },
          "beforeSend": function (xhr) {
            xhr.setRequestHeader('Authorization',
                "Bearer " + token);
          }, 
      },  
      columns: [ 
        // { data: '' },
        { data: 'CityName' },
        { data: 'AreaCode' }, 
        { data: 'AreaName' }, 
        { data: 'PropertyCode' },
        { data: 'PropertyName' },
        { data: 'ZoneCode' },
        { data: 'Zone' },
        { data: 'SubZoneCode' },
        { data: 'SubZone' },
        { data: 'BaseUnitCode' },
        { data: 'BaseUnit' },
        { data: 'BusinessTypeName'},
        { data: 'BusinessSubTypeName'},
        // { data: '' }
      ], 
      columnDefs: [
       
        // {
        //   // BusinessSubTypeName
        //   targets: 7, 
        //   render: function (data, type, full, meta) {
             
        //     var $areaName = full['BusinessSubTypeName']; 
        //     var $rowOutput = '<span class="text-nowrap"> ' + $areaName + '</span>';
        //     return $rowOutput;
        //   }
        // },
        { visible:false, targets: 1 },
        { visible:false, targets: 3 },
        { visible:false, targets: 5 },
        { visible:false, targets: 7 },
        { visible:false, targets: 9 },
        
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
      displayLength: 25,
      lengthMenu: [10, 25, 50, 75, 100],
      drawCallback: function (settings) {

        var api = this.api();
        var rows = api.rows({ page: 'current' }).nodes();
        var last = null; 
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
          if($("#jstree-basic ul").length == 0){ 
            if(response){ 
              var areasKeys = [];
              var areaGroups = response.data.reduce(function (r, el) { 
                  r[el.AreaName] = r[el.AreaName] || [];
                  r[el.AreaName].push(el);
                  areasKeys.push(el.AreaName); 
                return r;
              }, []);
              // console.log(areaGroups); 
              var uniqueAreasIds = [...new Set(areasKeys)];
              // console.log(uniqueAreasIds);

              var treeHtml = '';

              for (let index = 0; index < uniqueAreasIds.length; index++) {
                const areaKey = uniqueAreasIds[index];
                // console.log(areaKey);

                // start property tree
                var propertiesKeys = []; 
                var propertyGroups = response.data.reduce(function (r, el) {  
                    r[el.PropertyName] = r[el.PropertyName] || [];
                    r[el.PropertyName].push(el);
                    propertiesKeys.push(el.PropertyName); 
                  return r;
                }, Object.create(null));
                // console.log(propertyGroups); 
                var uniquePropertiesIds = [...new Set(propertiesKeys)];
                // console.log(uniquePropertiesIds);
                var propertyTreeHtml = '';
                for (let index = 0; index < uniquePropertiesIds.length; index++) {
                  const propertyKey = uniquePropertiesIds[index];
                  // console.log(propertyKey);

                  //start zone tree
                  var zonesKeys = []; 
                  var zonesGroups = response.data.reduce(function (r, el) {  
                      r[el.Zone] = r[el.Zone] || [];
                      r[el.Zone].push(el);
                      zonesKeys.push(el.Zone); 
                    return r;
                  }, Object.create(null));
                  // console.log(propertyGroups); 
                  var uniqueZonesIds = [...new Set(zonesKeys)];
                  var zoneTreeHtml = '';
                  for (let index = 0; index < uniqueZonesIds.length; index++) {
                    const zoneKey = uniqueZonesIds[index];

                    //start subzone tree
                    var subzoneKeys = []; 
                    var subzoneGroups = response.data.reduce(function (r, el) {  
                        r[el.SubZone] = r[el.SubZone] || [];
                        r[el.SubZone].push(el);
                        subzoneKeys.push(el.SubZone); 
                      return r;
                    }, Object.create(null));
                    // console.log(propertyGroups); 
                    var uniqueSubzoneIds = [...new Set(subzoneKeys)];
                    var subzoneTreeHtml = '';

                    for (let index = 0; index < uniqueSubzoneIds.length; index++) {
                      const subzoneKey = uniqueSubzoneIds[index];

                      //start baseUnit tree
                      var baseUnitKeys = []; 
                      var baseUnitGroups = response.data.reduce(function (r, el) {  
                          r[el.BaseUnit] = r[el.BaseUnit] || [];
                          r[el.BaseUnit].push(el);
                          baseUnitKeys.push(el.BaseUnit); 
                        return r;
                      }, Object.create(null));
                      // console.log(propertyGroups); 
                      var uniqueBaseUnitIds = [...new Set(baseUnitKeys)];
                      var baseUnitTreeHtml = '';

                      for (let index = 0; index < uniqueBaseUnitIds.length; index++) {
                        const baseUnitKey = uniqueBaseUnitIds[index];
                        var singleBaseUnit = baseUnitGroups[baseUnitKey][0];

                        if(singleBaseUnit.AreaName == areaKey && singleBaseUnit.PropertyName == propertyKey && singleBaseUnit.Zone == zoneKey && singleBaseUnit.SubZone == subzoneKey ){
                          var html = `
                            <li class="sites-tree" data-tree = "baseunit" data-area = "${areaKey}" data-property = "${propertyKey}" data-zone = "${zoneKey}" data-subzone = "${subzoneKey}" data-baseunit = "${baseUnitKey}" data-jstree='{"icon" : "fa fa-city"}'>
                            ${baseUnitKey}
                            </li>
                          `;
                          baseUnitTreeHtml = baseUnitTreeHtml + html; 
                        }  
                      }
                      //end of subzone tree

                      var singleSubZone = subzoneGroups[subzoneKey][0]; 
                      if(singleSubZone.AreaName == areaKey && singleSubZone.PropertyName == propertyKey && singleSubZone.Zone == zoneKey ){
                        var html = `
                          <li class="sites-tree" data-tree = "subzone" data-area = "${areaKey}" data-property = "${propertyKey}" data-zone = "${zoneKey}" data-subzone = "${subzoneKey}"  data-jstree='{"icon" : "fa fa-city"}'>
                            ${subzoneKey}
                            <ul>
                                ${baseUnitTreeHtml}
                            </ul>
                          </li>
                        `;
                        subzoneTreeHtml = subzoneTreeHtml + html; 
                      }  
                    }
                    //end of subzone tree

                    var singleZone = zonesGroups[zoneKey][0]; 
                    if(singleZone.AreaName == areaKey && singleZone.PropertyName == propertyKey ){
                      var html = `
                        <li class="sites-tree" data-tree = "zone" data-area = "${areaKey}" data-property = "${propertyKey}" data-zone = "${zoneKey}" data-jstree='{"icon" : "fa fa-city"}'>
                        ${zoneKey}
                          <ul>
                              ${subzoneTreeHtml}
                          </ul>
                        </li>
                      `;
                      zoneTreeHtml = zoneTreeHtml + html; 
                    } 

                  }
                  // end of zone tree

                  var singleProperty = propertyGroups[propertyKey][0];
                  if(singleProperty.AreaName == areaKey){
                    var html = `
                      <li class="sites-tree" data-tree = "property" data-area = "${areaKey}" data-property = "${propertyKey}" data-jstree='{"icon" : "fa fa-city"}'>
                        ${propertyKey}
                        <ul>
                            ${zoneTreeHtml}
                        </ul>
                      </li>
                    `;
                    propertyTreeHtml = propertyTreeHtml + html; 
                  } 
                }
                // end of property tree


                //start areas tree 
                var html = `
                  <li class="sites-tree" data-tree = "area" data-area = "${areaKey}" data-jstree='{"icon" : "fa fa-location-crosshairs"}'>${areaKey}
                    <ul>
                          ${propertyTreeHtml}
                      </ul>
                  </li>
                `; 
                // console.log(areaGroups[areaKey]);
                treeHtml = treeHtml + html; 
                // return false; 
              }//end of area loop
              $('#jstree-basic').html(`
                <ul>
                ${treeHtml}
                </ul>
              `);  
              $('#jstree-basic').jstree();

              
               
              // end of tree click event
             

            }//end of check response
          }//end of check list


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
        {  
          text: 'Show with code',
          className: 'ms-1 btn btn-success show-all-fields',
          attr: {
            'data-column': '0', 
          },
          exportOptions: { columns: [0, 1, 2, 3,4,5,6,7] },
          init: function (api, node, config) {
            $(node).removeClass('btn-secondary');
          }
        }, 
      ],
       
      initComplete: function () {
        // alert('done'); 
        // console.log(this.api()); 
        // contractSitesTable.column(0).visible(false);
        // contractSitesTable.column(0).visible(false); 

        $(document).on("click",".show-all-fields",function (e) {
          //  console.log("clicked");
        // $('.show-all-fields').on('click', function (e) {
          e.preventDefault();
          // contractSitesTable.column(0).visible(false);
    
          var column1 = contractSitesTable.column(1);  
          // console.log(column1);
          // console.log(column1.visible()); 
          column1.visible(!column1.visible());
          var column3 = contractSitesTable.column(3);  
          column3.visible(!column3.visible());
          var column5 = contractSitesTable.column(5);  
          column5.visible(!column5.visible());
          var column7 = contractSitesTable.column(7);  
          column7.visible(!column7.visible());
          var column9 = contractSitesTable.column(9);  
          column9.visible(!column9.visible());

          contractSitesTable.draw(); 

      });

        var areaColumn = this.api().columns(0);
        // console.log(areaColumn); 
        
        $(document).on('click','.sites-tree',function (e) {
          // alert('area click');
          
          var currentTree = $(this).attr('data-tree');
          var area = $(this).attr('data-area');
          var property = $(this).attr('data-property');
          // console.log("currentTree");
          // console.log(currentTree); 
          // console.log('area value');
          // console.log(area); 
          // console.log('property value');
          // console.log(property);

          // console.log(' -------------------- ');

          contractSitesTable.ajax.reload();
          $('.contracts-sites-table').DataTable().ajax.reload()

          if(currentTree == "area"){ 
            var regExSearch = `(${area})`;
            contractSitesTable
            .columns(2)
            .search(area)
            .draw(); 

            // var val = $.fn.dataTable.util.escapeRegex(area);
            // console.log('val');
            // console.log(val); 
            // areaColumn.search(val, true, false).draw();

          }else if(currentTree == "property"){
            
            
            var regExSearch = `(${area}|${property})`;
            contractSitesTable
            .columns([ 2,4 ])
            .search(regExSearch, true, false)
            .draw(); 
          }

          e.stopImmediatePropagation();
          // e.preventDefault();
        });// 

        // this.api() 
        //   .columns()
        //   .every(function () {
        //     var column = this;    
        //     $(document).on('click','.sites-tree',function (e) {
        //       // alert('area click');
              
        //       var currentTree = $(this).attr('data-tree');
        //       var area = $(this).attr('data-area');
        //       var property = $(this).attr('data-property'); 
        //       var zone = $(this).attr('data-zone'); 
        //       var subzone = $(this).attr('data-subzone'); 
        //       var baseunit = $(this).attr('data-baseunit'); 
        //       console.log("currentTree");
        //       console.log(currentTree);
      
        //         var regExSearch = `(${area})`;  
        //         if(currentTree == "area"){ 
        //           regExSearch = `(${area})`;   
        //         }else if(currentTree == "property"){
        //           regExSearch = `(${area}|${property})`;   
        //         }else if(currentTree == "zone"){
        //           regExSearch = `(${area}|${property}|${zone})`;   
        //         }else if(currentTree == "subzone"){
        //           regExSearch = `(${area}|${property}|${zone}|${subzone})`;   
        //         }else if(currentTree == "baseunit"){
        //           regExSearch = `(${area}|${property}|${zone}|${subzone}|${baseunit})`;   
        //         }
        //         console.log('regExSearch');
        //         console.log(regExSearch);
        //         // if (column.search() == area) {
        //           // that.search(this.value).draw();
        //            column.search(regExSearch, true, false).draw();
        //         // }
 
        //       e.stopImmediatePropagation();
        //       // e.preventDefault();
        //     });//
        //   });
          // end of area column 

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
  // end of dtContractSitesTable

   
 

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
