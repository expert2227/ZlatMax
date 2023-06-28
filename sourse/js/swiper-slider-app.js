"use strict";
window.addEventListener("load", function () {
   // Использование преобразований
   //
   var transforms = ["transform", "msTransform", "webkitTransform", "mozTransform", "oTransform"];
   var transformProperty = getSupportedPropertyName(transforms);
   // управление вендорными префиксами
   function getSupportedPropertyName(properties) {
      for (var i = 0; i < properties.length; i++) {
         if (typeof document.body.style[properties[i]] != "undefined") {
            return properties[i];
         }
      }
      return null;
   }
   /**
    * this code will add the ability to change slides in the main menu
    */
   const allSliders = document.querySelectorAll(".slide-main-block");

   if (allSliders) {
      allSliders.forEach((el, index) => {
         index++;
         el.dataset.slider = index;
      });
      addSliderBullet(allSliders);
      addBulletData();
   }
   /**
    * this function created and added to page elements, we'll be use their to navigation our slider
    * @param {massive} allSliders
    */
   function addSliderBullet(allSliders) {
      let parentBullet = document.querySelector(".controlls-main-block__dotts");
      for (let i = 0; i < allSliders.length; i++) {
         let slider = allSliders[i].dataset.slider;
         parentBullet.insertAdjacentHTML("beforeend", `<span class='slider-pagination-bullet'></span>`);
      }
      parentBullet.firstElementChild.classList.add("slider-pagination-bullet-active");
   }
   /**
    * this function add data-bullet to crated element with classname = 'slider-pagination-bullet'
    */
   function addBulletData() {
      let bullet = document.querySelectorAll(".slider-pagination-bullet");
      for (let i = 0; i < bullet.length; i++) {
         bullet[i].dataset.bullet = i + 1;
         let sliderWidth = document.querySelector(".slide-main-block");
         sliderWidth = sliderWidth.clientWidth;
         bullet[i].dataset.coordinates = sliderWidth * i + "px";
      }
   }

   const allBullets = document.querySelectorAll(".slider-pagination-bullet");
   if (allBullets) {
      allBullets.forEach((el) => {
         el.addEventListener("click", switchBullet);
      });
   }
   function switchBullet(event) {
      const clickBullet = event.target;
      if (clickBullet.closest("[data-bullet]")) {
         event.preventDefault();
         const clickBulletId = clickBullet.dataset.bullet ? clickBullet.dataset.bullet : null;
         const clickSliderId = document.querySelector(`[data-slider="${clickBulletId}"]`);
         const swiper = document.querySelector(".main-block__swiper");
         let moveX = clickBullet.dataset.coordinates;
         swiper.style[transformProperty] = "translate3d(" + "-" + `${moveX}` + ", " + "0px, " + "0px)";
         if (clickSliderId) {
            const activeSlider = document.querySelector(".slide-main-block-active");
            const activeBullet = document.querySelector(".slider-pagination-bullet-active");
            switchFraction(clickBulletId);
            if (activeSlider !== clickSliderId) {
               activeSlider.classList.remove("slide-main-block-active");
               clickSliderId.classList.add("slide-main-block-active");
            }
            if (clickBullet !== activeBullet) {
               activeBullet.classList.remove("slider-pagination-bullet-active");
               clickBullet.classList.add("slider-pagination-bullet-active");
            }
         }
      }
   }
   function switchFraction(clickBulletId) {
      if (clickBulletId) {
         let allBullets = document.querySelectorAll(".slider-pagination-bullet");
         let countBullet = allBullets.length;
         let currentFraction = document.querySelector(".fraction-controll_current");
         let countFraction = document.querySelector(".fraction-controll_all");
         countFraction.innerHTML = countBullet;
         currentFraction.innerHTML = clickBulletId;
      }
   }
});
