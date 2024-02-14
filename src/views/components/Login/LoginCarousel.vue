<template>
  <div
    id="carousel-interval"
    class="carousel slide  "
    data-bs-ride="carousel"
    data-bs-interval="2000"
  >
    <ol class="carousel-indicators">
      <li
        data-bs-target="#carousel-interval"
        data-bs-slide-to="0"
        class="active"
      ></li>
      <!-- <li data-bs-target="#carousel-interval" data-bs-slide-to="1"></li> -->
      <!-- <li data-bs-target="#carousel-interval" data-bs-slide-to="2"></li> -->
      <!-- <li data-bs-target="#carousel-interval" data-bs-slide-to="3"></li> -->

    </ol>
    <div class="carousel-inner" role="listbox">
      <div class="carousel-item active">
        <img
          class="img-fluid"
          src="/src/assets/images/login/02.png"
          alt="First slide"
        />
      </div>
      <!-- <div class="carousel-item">
        <img
          class="img-fluid"
          src="/src/assets/images/login/02.png" 
          alt="Third slide"
        /> 
      </div> -->
      <!-- <div class="carousel-item ">
        <img
          class="img-fluid"
          src="/src/assets/images/login/04.jpeg"
          alt="Second slide"
        />
      </div> -->
      <!-- <div class="carousel-item">
        <img
          class="img-fluid"
          src="/src/assets/images/login/01.jpeg"
          alt="Third slide"
        /> 
      </div> -->

    </div>
    <a
      class="carousel-control-prev"
      data-bs-target="#carousel-interval"
      role="button"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </a>
    <a
      class="carousel-control-next"
      data-bs-target="#carousel-interval"
      role="button"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </a>
  </div>
</template>
