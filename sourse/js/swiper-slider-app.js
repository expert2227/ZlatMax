"use strict";
window.addEventListener("load", function () {
   /**
    * this code will add the ability to change slides in the main menu
    */
   const allSwipers = document.querySelectorAll(".main-block__swiper");

   if (allSwipers) {
      allSwipers.forEach((el, index) => {
         index++;
         el.dataset.swiper = index;
      });
      addSwiperBullet(allSwipers);
      addBulletData();
   }
   /**
    * this function created and added to page elements, we'll be use their to navigation our slider
    * @param {massive} allSwipers
    */
   function addSwiperBullet(allSwipers) {
      let parentBullet = document.querySelector(".controlls-main-block__dotts");
      for (let i = 0; i < allSwipers.length; i++) {
         let swiper = allSwipers[i].dataset.swiper;
         parentBullet.insertAdjacentHTML("beforeend", `<span class='swiper-pagination-bullet'></span>`);
      }
      parentBullet.firstElementChild.classList.add("swiper-pagination-bullet-active");
   }
   /**
    * this function add data-bullet to crated element with classname = 'swiper-pagination-bullet'
    */
   function addBulletData() {
      let bullet = document.querySelectorAll(".swiper-pagination-bullet");
      for (let i = 0; i < bullet.length; i++) {
         bullet[i].dataset.bullet = i + 1;
      }
   }

   const allBullets = document.querySelectorAll(".swiper-pagination-bullet");
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
         const swiperId = document.querySelector(`[data-swiper="${clickBulletId}"]`);
         if (swiperId) {
            const activeSwiper = document.querySelector(".main-block-swiper-active");
            const activeBullet = document.querySelector(".swiper-pagination-bullet-active");
            switchFraction(clickBulletId);
            if (activeSwiper !== swiperId) {
               activeSwiper.classList.remove("main-block-swiper-active");
               swiperId.classList.add("main-block-swiper-active");
            }
            if (clickBullet !== activeBullet) {
               activeBullet.classList.remove("swiper-pagination-bullet-active");
               clickBullet.classList.add("swiper-pagination-bullet-active");
            }
         }
      }
   }
   function switchFraction(clickBulletId) {
      if (clickBulletId) {
         let allBullets = document.querySelectorAll(".swiper-pagination-bullet");
         let countBullet = allBullets.length;
         let currentFraction = document.querySelector(".fraction-controll_current");
         let countFraction = document.querySelector(".fraction-controll_all");
         countFraction.innerHTML = countBullet;
         currentFraction.innerHTML = clickBulletId;
      }
   }
});
