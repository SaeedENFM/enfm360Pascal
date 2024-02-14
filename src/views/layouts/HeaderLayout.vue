<template>
  <!-- BEGIN: Header-->
  <nav
    class="header-navbar navbar navbar-expand-lg align-items-center floating-nav navbar-light navbar-shadow container-xxl"
  >
    <div class="navbar-container d-flex content">
      <div class="bookmark-wrapper d-flex align-items-center">
        <ul class="nav navbar-nav d-xl-none">
          <li class="nav-item">
            <a class="nav-link menu-toggle" href="#"
              ><i class="ficon" data-feather="menu"></i
            ></a>
          </li>
        </ul>
        <ul class="nav navbar-nav bookmark-icons ">
          <li class="nav-item me-2 d-none d-lg-block "> 
            <a class="" href="/"> 
                    <img src="/src/assets/images/ENFM_LOGO.png" class="header-brand-logo">
                    <img v-if="user?.clientlogo" :src="'https://enfmcustomerapp.emiratesnfm.ae/usersimages/'+user?.clientlogo" class="header-brand-logo mx-2" style="height: 40px;"> 
                <!-- <h3 class="brand-text">EmiratesNFM</h3> -->
            </a>  
          </li>
          <li v-for="(menu, key2) in user?.topMenues" :key="key2" class="nav-item d-none d-lg-block">
            <RouterLink 
              :to="menu?.Url"
              class="nav-link"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom" 
              ><i class="ficon" 
              :data-feather="menu.menuIcon"></i>
              {{menu.Menuname}} 
            </RouterLink>
          </li> 
        </ul> 
        <ul class="nav navbar-nav">
          <li class="nav-item d-none d-lg-block">
            <!-- <a class="nav-link bookmark-star"><i class="ficon text-warning" data-feather="star"></i></a> -->
            <div class="bookmark-input search-input">
              <div class="bookmark-input-icon">
                <i data-feather="search"></i>
              </div>
              <input
                class="form-control input"
                type="text"
                placeholder="Bookmark"
                tabindex="0"
                data-search="search"
              />
              <ul class="search-list search-list-bookmark"></ul>
            </div>
          </li>
        </ul>
      </div>
      <ul class="nav navbar-nav align-items-center ms-auto">
        <!-- <li class="nav-item dropdown dropdown-language"><a class="nav-link dropdown-toggle" id="dropdown-flag" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="flag-icon flag-icon-us"></i><span class="selected-language">English</span></a>
                    <div class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdown-flag"><a class="dropdown-item" href="#" data-language="en"><i class="flag-icon flag-icon-us"></i> English</a><a class="dropdown-item" href="#" data-language="fr"><i class="flag-icon flag-icon-fr"></i> French</a><a class="dropdown-item" href="#" data-language="de"><i class="flag-icon flag-icon-de"></i> German</a><a class="dropdown-item" href="#" data-language="pt"><i class="flag-icon flag-icon-pt"></i> Portuguese</a></div>
                </li> -->
        <li
          class="nav-item d-none d-lg-block change-theme-btn"
          @click="changeTheme"
        >
          <a class="nav-link"><i class="ficon" data-feather="cast"></i></a>
        </li>

        <!-- <li class="nav-item d-none d-lg-block">
          <a class="nav-link nav-link-style">
            <i class="ficon" data-feather="moon"></i>
          </a>
        </li> -->
        
        <li class="nav-item nav-search">
          <a class="nav-link nav-link-search"
            ><i class="ficon" data-feather="search"></i
          ></a>
          <div class="search-input">
            <div class="search-input-icon"><i data-feather="search"></i></div>
            <input
              class="form-control input"
              type="text"
              placeholder="Explore ENFM360..."
              tabindex="-1"
              data-search="search"
            />
            <div class="search-input-close"><i data-feather="x"></i></div>
            <ul class="search-list search-list-main"></ul>
          </div>
        </li>
        <!-- search icon -->
        <!-- <li class="nav-item dropdown dropdown-notification me-25">
          <a class="nav-link" href="#" data-bs-toggle="dropdown"
            ><i class="ficon" data-feather="bell"></i
            ><span class="badge rounded-pill bg-danger badge-up">5</span></a
          >
          <ul class="dropdown-menu dropdown-menu-media dropdown-menu-end">
            <li class="dropdown-menu-header">
              <div class="dropdown-header d-flex">
                <h4 class="notification-title mb-0 me-auto">Notifications</h4>
                <div class="badge rounded-pill badge-light-primary">6 New</div>
              </div>
            </li>
            <li class="scrollable-container media-list">
              <a class="d-flex" href="#">
                <div class="list-item d-flex align-items-start">
                  <div class="me-1">
                    <div class="avatar">
                      <img
                        src="/src/assets/app-assets/app-assets/images/portrait/small/avatar-s-15.jpg"
                        alt="avatar"
                        width="32"
                        height="32"
                      />
                    </div>
                  </div>
                  <div class="list-item-body flex-grow-1">
                    <p class="media-heading">
                      <span class="fw-bolder">Congratulation Sam 🎉</span
                      >winner!
                    </p>
                    <small class="notification-text">
                      Won the monthly best seller badge.</small
                    >
                  </div>
                </div> </a
              ><a class="d-flex" href="#">
                <div class="list-item d-flex align-items-start">
                  <div class="me-1">
                    <div class="avatar">
                      <img
                        src="/src/assets/app-assets/app-assets/images/portrait/small/avatar-s-3.jpg"
                        alt="avatar"
                        width="32"
                        height="32"
                      />
                    </div>
                  </div>
                  <div class="list-item-body flex-grow-1">
                    <p class="media-heading">
                      <span class="fw-bolder">New message</span>&nbsp;received
                    </p>
                    <small class="notification-text">
                      You have 10 unread messages</small
                    >
                  </div>
                </div> </a
              ><a class="d-flex" href="#">
                <div class="list-item d-flex align-items-start">
                  <div class="me-1">
                    <div class="avatar bg-light-danger">
                      <div class="avatar-content">MD</div>
                    </div>
                  </div>
                  <div class="list-item-body flex-grow-1">
                    <p class="media-heading">
                      <span class="fw-bolder">Revised Order 👋</span
                      >&nbsp;checkout
                    </p>
                    <small class="notification-text">
                      MD Inc. order updated</small
                    >
                  </div>
                </div>
              </a>
              <div class="list-item d-flex align-items-center">
                <h6 class="fw-bolder me-auto mb-0">System Notifications</h6>
                <div class="form-check form-check-primary form-switch">
                  <input
                    class="form-check-input"
                    id="systemNotification"
                    type="checkbox"
                    checked=""
                  />
                  <label
                    class="form-check-label"
                    for="systemNotification"
                  ></label>
                </div>
              </div>
              <a class="d-flex" href="#">
                <div class="list-item d-flex align-items-start">
                  <div class="me-1">
                    <div class="avatar bg-light-danger">
                      <div class="avatar-content">
                        <i class="avatar-icon" data-feather="x"></i>
                      </div>
                    </div>
                  </div>
                  <div class="list-item-body flex-grow-1">
                    <p class="media-heading">
                      <span class="fw-bolder">Server down</span>&nbsp;registered
                    </p>
                    <small class="notification-text">
                      USA Server is down due to high CPU usage</small
                    >
                  </div>
                </div> </a
              ><a class="d-flex" href="#">
                <div class="list-item d-flex align-items-start">
                  <div class="me-1">
                    <div class="avatar bg-light-success">
                      <div class="avatar-content">
                        <i class="avatar-icon" data-feather="check"></i>
                      </div>
                    </div>
                  </div>
                  <div class="list-item-body flex-grow-1">
                    <p class="media-heading">
                      <span class="fw-bolder">Sales report</span>&nbsp;generated
                    </p>
                    <small class="notification-text">
                      Last month sales report generated</small
                    >
                  </div>
                </div> </a
              ><a class="d-flex" href="#">
                <div class="list-item d-flex align-items-start">
                  <div class="me-1">
                    <div class="avatar bg-light-warning">
                      <div class="avatar-content">
                        <i
                          class="avatar-icon"
                          data-feather="alert-triangle"
                        ></i>
                      </div>
                    </div>
                  </div>
                  <div class="list-item-body flex-grow-1">
                    <p class="media-heading">
                      <span class="fw-bolder">High memory</span>&nbsp;usage
                    </p>
                    <small class="notification-text">
                      BLR Server using high memory</small
                    >
                  </div>
                </div>
              </a>
            </li>
            <li class="dropdown-menu-footer">
              <a class="btn btn-primary w-100" href="#"
                >Read all notifications</a
              >
            </li>
          </ul>
        </li> -->
        <!-- notification icon -->
        <li class="nav-item dropdown dropdown-user">
          <a
            class="nav-link dropdown-toggle dropdown-user-link"
            id="dropdown-user"
            href="#"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <div class="user-nav d-sm-flex d-none">
              <span class="user-name fw-bolder">ENFM</span
              ><span class="user-status">{{ user.UserName ?? 'Admin' }}</span>
            </div>
            <!-- <span class="avatar"
              ><img
                class="round"
                src="/src/assets/app-assets/app-assets/images/portrait/small/avatar-s-11.jpg"
                alt="avatar"
                height="40"
                width="40" /><span class="avatar-status-online"></span
            ></span> -->
          </a>
          <div
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdown-user"
          >
            <a class="dropdown-item" href="#"
              ><i class="me-50" data-feather="user"></i> Profile</a
            >
            <!-- <a class="dropdown-item" href="app-todo.html"
              ><i class="me-50" data-feather="check-square"></i> Task</a
            >  -->
            <div class="dropdown-divider"></div>
            <!-- <a class="dropdown-item" href="#"
              ><i class="me-50" data-feather="settings"></i> Settings</a
            >  -->
            <a class="dropdown-item" @click="changePassword()"
              ><i class="me-50" data-feather="edit"></i> Change Password</a
            >
            <div class="dropdown-divider"></div>

            <a class="dropdown-item" @click="logout"
              ><i class="me-50" data-feather="power"></i> Logout</a
            >
          </div>
        </li>
      </ul>
    </div>
  </nav>
 
  <ul class="main-search-list-defaultlist-other-list d-none">
    <li class="auto-suggestion justify-content-between">
      <a class="d-flex align-items-center justify-content-between w-100 py-50">
        <div class="d-flex justify-content-start">
          <span class="me-75" data-feather="alert-circle"></span
          ><span>No results found.</span>
        </div>
      </a>
    </li>
  </ul>
  <!-- END: Header-->
  <ChangePassword/>
</template>

<script setup>
import { RouterLink } from "vue-router";
import {onMounted,ref} from "vue";
import ChangePassword from "./ChangePassword.vue";


const isLogin = ref(null); 
const user = localStorage.user?JSON.parse(localStorage.user) : null;
const menues = ref(null);
onMounted(()=>{
  isLogin.value = localStorage.isLogin??"0";  
  menues.value = user.sideMenues;
  searchPages();
})


function changeTheme() { 
  if (localStorage.theme && localStorage.theme != "new") {
    localStorage.theme = "new";
  } else {
    localStorage.theme = "old";
  }
  window.location.reload();
 
}

function changePassword() { 
  $("#changePasswordPopup").modal('toggle')
}

function logout() {
  localStorage.isLogin = "0";
  localStorage.user = "";

  window.location.href = "/login" 
}

function searchPages() {

  var bookmarkWrapper = $('.bookmark-wrapper'),
      bookmarkStar = $('.bookmark-wrapper .bookmark-star'),
      bookmarkInput = $('.bookmark-wrapper .bookmark-input'),
      navLinkSearch = $('.nav-link-search'),
      searchInput = $('.search-input'),
      searchInputInputfield = $('.search-input input'),
      searchList = $('.search-input .search-list'),
      appContent = $('.app-content'),
      bookmarkSearchList = $('.bookmark-input .search-list');

  $('.search-input input').on('keyup', function (e) {
     
      $(this).closest('.search-list').addClass('show');
      if (e.keyCode !== 38 && e.keyCode !== 40 && e.keyCode !== 13) {
        if (e.keyCode == 27) {
          appContent.removeClass('show-overlay');
          bookmarkInput.find('input').val('');
          bookmarkInput.find('input').blur();
          searchInputInputfield.val('');
          searchInputInputfield.blur();
          searchInput.removeClass('open');
          if (searchInput.hasClass('show')) {
            $(this).removeClass('show');
            searchInput.removeClass('show');
          }
        }

        // Define variables
        var value = $(this).val().toLowerCase(), //get values of input on keyup
          activeClass = '',
          bookmark = false,
          liList = $('ul.search-list li'); // get all the list items of the search
        liList.remove();
        // To check if current is bookmark input
        if ($(this).parent().hasClass('bookmark-input')) {
          bookmark = true;
        }

        // If input value is blank
        if (value != '') {
          appContent.addClass('show-overlay');

          // condition for bookmark and search input click
          if (bookmarkInput.focus()) {
            bookmarkSearchList.addClass('show');
          } else {
            searchList.addClass('show');
            bookmarkSearchList.removeClass('show');
          }
          if (bookmark === false) {
            searchList.addClass('show');
            bookmarkSearchList.removeClass('show');
          }

          var $startList = '',
            $otherList = '',
            $htmlList = '',
            $bookmarkhtmlList = '',
            $pageList =
              '<li class="d-flex align-items-center">' +
              '<a href="#">' +
              '<h6 class="section-label mt-75 mb-0">Pages</h6>' +
              '</a>' +
              '</li>',
            $activeItemClass = '',
            $bookmarkIcon = '',
            $defaultList = '',
            a = 0;

          // getting json data from file for search results
          // $.getJSON(assetPath + 'data/' + $filename + '.json', function (data) {

            for (var i = 0; i < menues.value.length; i++) {
              // if current is bookmark then give class to star icon
              // for laravel
              
               

              if (bookmark === true) {
                activeClass = ''; // resetting active bookmark class
                var arrList = $('ul.nav.navbar-nav.bookmark-icons li'),
                  $arrList = '';
                // Loop to check if current seach value match with the bookmarks already there in navbar
                for (var j = 0; j < arrList.length; j++) {
                  if (menues.value[i].name === arrList[j].firstChild.dataset.bsOriginalTitle) {
                    activeClass = ' text-warning';
                    break;
                  } else {
                    activeClass = '';
                  }
                }

                $bookmarkIcon = feather.icons['star'].toSvg({ class: 'bookmark-icon float-end' + activeClass });
              }
              // Search list item start with entered letters and create list
              // console.log(menues.value[i].Menuname);
              if (menues.value[i].Menuname.toLowerCase().indexOf(value) == 0 && a < 5) {
                if (a === 0) {
                  $activeItemClass = 'current_item';
                } else {
                  $activeItemClass = '';
                }
                $startList +=
                  '<li class="auto-suggestion ' +
                  $activeItemClass +
                  '">' +
                  '<a class="d-flex align-items-center justify-content-between w-100" href=' +
                  menues.value[i].Url +
                  '>' +
                  '<div class="d-flex justify-content-start align-items-center">' +
                  feather.icons[menues.value[i].menuIcon].toSvg({ class: 'me-75 ' }) +
                  '<span>' +
                  menues.value[i].Menuname +
                  '</span>' +
                  '</div>' +
                  $bookmarkIcon +
                  '</a>' +
                  '</li>';
                a++;
              }

            }

            for (var i = 0; i < menues.value.length; i++) {
              if (bookmark === true) {
                activeClass = ''; // resetting active bookmark class
                var arrList = $('ul.nav.navbar-nav.bookmark-icons li'),
                  $arrList = '';
                // Loop to check if current search value match with the bookmarks already there in navbar
                for (var j = 0; j < arrList.length; j++) {
                  if (menues.value[i].Menuname === arrList[j].firstChild.dataset.bsOriginalTitle) {
                    activeClass = ' text-warning';
                  } else {
                    activeClass = '';
                  }
                }

                $bookmarkIcon = feather.icons['star'].toSvg({ class: 'bookmark-icon float-end' + activeClass });
              }
              // Search list item not start with letters and create list
              if (
                !(menues.value[i].Menuname.toLowerCase().indexOf(value) == 0) &&
                menues.value[i].Menuname.toLowerCase().indexOf(value) > -1 &&
                a < 5
              ) {
                if (a === 0) {
                  $activeItemClass = 'current_item';
                } else {
                  $activeItemClass = '';
                }
                $otherList +=
                  '<li class="auto-suggestion ' +
                  $activeItemClass +
                  '">' +
                  '<a class="d-flex align-items-center justify-content-between w-100" href=' +
                  menues.value[i].Url +
                  '>' +
                  '<div class="d-flex justify-content-start align-items-center">' +
                  feather.icons[menues.value[i].menuIcon].toSvg({ class: 'me-75 ' }) +
                  '<span>' +
                  menues.value[i].Menuname +
                  '</span>' +
                  '</div>' +
                  $bookmarkIcon +
                  '</a>' +
                  '</li>';
                a++;
              }
            } 


            $defaultList = $('.main-search-list-defaultlist').html();
            if ($startList == '' && $otherList == '') {
              $otherList = $('.main-search-list-defaultlist-other-list').html();
            }

            // concatinating startlist, otherlist, defalutlist with pagelist
            // $htmlList = $pageList.concat($startList, $otherList, $defaultList);
            
            $htmlList = $pageList.concat($startList, $otherList);
            
            // $('ul.search-list').html($startList);
            $('ul.search-list').html($htmlList);

            // concatinating otherlist with startlist

            $bookmarkhtmlList = $startList.concat($otherList);
            $('ul.search-list-bookmark').html($bookmarkhtmlList);
            
            // Feather Icons
            // if (feather) {
            //   featherSVG();
            // }

          // });
        } else {
          // console.log('else condition');
          if (bookmark === true) {
            var arrList = $('ul.nav.navbar-nav.bookmark-icons li'),
              $arrList = '';
            for (var i = 0; i < arrList.length; i++) {
              if (i === 0) {
                $activeItemClass = 'current_item';
              } else {
                $activeItemClass = '';
              }

              var iconName = '',
                className = '';
              if ($(arrList[i].firstChild.firstChild).hasClass('feather')) {
                var classString = arrList[i].firstChild.firstChild.getAttribute('class');
                iconName = classString.split('feather-')[1].split(' ')[0];
                className = classString.split('feather-')[1].split(' ')[1];
              }
              $arrList +=
                '<li class="auto-suggestion">' +
                '<a class="d-flex align-items-center justify-content-between w-100" href=' +
                arrList[i].firstChild.href +
                '>' +
                '<div class="d-flex justify-content-start align-items-center">' +
                feather.icons[iconName].toSvg({ class: 'me-75 ' }) +
                '<span>' +
                arrList[i].firstChild.dataset.bsOriginalTitle +
                '</span>' +
                '</div>' +
                feather.icons['star'].toSvg({ class: 'text-warning bookmark-icon float-end' }) +
                '</a>' +
                '</li>';
            }

            $('ul.search-list').append($arrList);

            // Feather Icons
            // if (feather) {
            //   featherSVG();
            // }
          } else {
            // if search input blank, hide overlay
            if (appContent.hasClass('show-overlay')) {
              appContent.removeClass('show-overlay');
            }
            // If filter box is empty
            if (searchList.hasClass('show')) {
              searchList.removeClass('show');
            }
          }
        }
      }
    });
}


</script>

<style lang="scss" scoped></style>
