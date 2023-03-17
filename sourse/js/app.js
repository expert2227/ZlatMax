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

/**
 * this function gets objects from event and opens or closes the submenu
 */
document.addEventListener("click", documentActions);

function documentActions(event) {
  const elementClick = event.target;
  if (elementClick.closest("[data-parent]")) {
    event.preventDefault();
    const parentId = elementClick.dataset.parent
      ? elementClick.dataset.parent
      : null;
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
    } else {
      console.log("нет такого элемента");
    }
  }
};


const menuBlocks = document.querySelectorAll(".sub-menu-catalog__block");
if(menuBlocks.length) {
  menuBlocks.forEach(menuBlock => {
    const menuBlockItems = menuBlock.querySelectorAll(".sub-menu-catalog__category").length;
    menuBlock.classList.add(`sub-menu-catalog__block_${menuBlockItems}`);
  }
)};
