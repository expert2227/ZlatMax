'use strict';
// this block code checks and adds eventListeners on object with className = '.phones-body__other-phones'
const phoneArrow = document.querySelector('.phones-body-arrow');
const phoneBlock = document.querySelector('.phones-body__other-phones');

document.addEventListener("click", (e) => {
    if (e.target.classList.contains('phones-body-arrow')) {
        phoneBlock.classList.toggle('phones-body__active');
        //console.log(phoneBlock.classList);
    }else {
        phoneBlock.classList.remove('phones-body__active');
    }
});