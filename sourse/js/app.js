"use strict";
// this block code checks and adds eventListeners on object with className = '.phones-body__other-phones'
const phoneArrow = document.querySelector(".phones-body-arrow");
const phoneBlock = document.querySelector(".phones-body__other-phones");
document.addEventListener("click", (e) => {
   if (e.target.classList.contains("phones-body-arrow")) {
      phoneBlock.classList.toggle("phones-body__active");
      //console.log(phoneBlock.classList);
   } else {
      phoneBlock.classList.remove("phones-body__active");
   }
   e.preventDefault();
});
// this block code added icons (.icon-arrow-up) on elements was have attribute data-parent
function addIcons () {
   const dataElement = document.querySelectorAll('[data-parent]');
   dataElement.forEach((el) => {
      el.classList.add('icon-arrow_up');
   })
}
addIcons();
/**
 * this function gets objects from event and opens or closes the submenu
 */
document.addEventListener("click", documentActions);

function documentActions(event) {
   const elementClick = event.target;
   if (elementClick.closest("[data-parent]")) {
      event.preventDefault();
      const parentId = elementClick.dataset.parent ? elementClick.dataset.parent : null;
      const subMenuId = document.querySelector(`[data-submenu="${parentId}"]`);
      if (subMenuId) {
         //const changeLink = document.querySelector(".menu-catalog__link");
         const activeLink = document.querySelector("._sub-menu-active");
         const activeBlock = document.querySelector("._sub-menu-open");
         if (activeLink && activeLink !== elementClick) {
            activeBlock.classList.remove("_sub-menu-open");
            activeLink.classList.remove("_sub-menu-active");
         }
         subMenuId.classList.toggle("_sub-menu-open");
         elementClick.classList.toggle("_sub-menu-active");
         subMenuCatalogOpen(event);
      } else {
         console.log("нет такого элемента");
      }
   }
   if (elementClick.closest(".menu-top-header__link_catalog")) {
      menuCatalogOpen(event);
   }
   if (elementClick.closest(".menu-catalog__back")) {
      menuCatalogOpen(event);
   }
   if (elementClick.closest(".sub-menu-catalog__back")) {
      subMenuCatalogOpen(event);
      document.querySelector("._sub-menu-active") ? document.querySelector("._sub-menu-active").classList.remove('_sub-menu-active') : null;
      document.querySelector("._sub-menu-open") ? document.querySelector("._sub-menu-open").classList.remove('_sub-menu-open') : null;
   }
}
/**
 * this function hides or shows the menu-catalog which is inside the burger menu when it's opened
 * @param {event} event is the object that we pass to the function when the menu is clicked 
 */
function menuCatalogOpen(event) {
   document.documentElement.classList.toggle("catalog-open");
   event.preventDefault();
}
function subMenuCatalogOpen(event) {
   document.documentElement.classList.toggle("sub-menu-open");
   event.preventDefault();
}
const menuBlocks = document.querySelectorAll(".sub-menu-catalog__block");
if (menuBlocks.length) {
   menuBlocks.forEach((menuBlock) => {
      const menuBlockItems = menuBlock.querySelectorAll(".sub-menu-catalog__category").length;
      menuBlock.classList.add(`sub-menu-catalog__block_${menuBlockItems}`);
   });
}
/**
 * this function add eventListener on element with class="icon-menu" and show/hide
 * main menu
 */
const menuBurger = document.querySelector(".icon-menu");
document.addEventListener("click", (event) => {
   if (event.target.classList.contains("icon-menu")) {
      document.childNodes[1].classList.toggle("menu-open");
      if (document.documentElement.classList.contains("catalog-open")) {
         menuCatalogOpen(event);
      }
      if (document.documentElement.classList.contains("sub-menu-open")) {
         subMenuCatalogOpen(event);
      }
   } else {
      if (event.target.classList.contains("icon-menu")) {
         document.childNodes[1].classList.remove("menu-open");
      }
   }
});
