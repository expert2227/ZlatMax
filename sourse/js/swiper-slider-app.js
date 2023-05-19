"use strict";
window.addEventListener("load", function () {
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
         const sliderId = document.querySelector(`[data-slider="${clickBulletId}"]`);
         if (sliderId) {
            const activeSlider = document.querySelector(".slide-main-block-active");
            const activeBullet = document.querySelector(".slider-pagination-bullet-active");
            switchFraction(clickBulletId);
            if (activeSlider !== sliderId) {
               activeSlider.classList.remove("slide-main-block-active");
               sliderId.classList.add("slide-main-block-active");
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
