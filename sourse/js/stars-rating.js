"use strict";
const ratings = document.querySelectorAll(".rating");
if (ratings.length > 0) {
   initRatings();
}

// main function
function initRatings() {
   let ratingActive, ratingValue;
   for (let index = 0; index < ratings.length; index++) {
      const rating = ratings[index];
      initRating(rating);
   }
   function initRating(rating) {
      initRatingVars(rating);
      setRatingActiveWidth();
      if (rating.classList.contains("rating_set")) {
         setRating(rating);
      }
   }
   // this function initialization vars, which created before
   function initRatingVars(rating) {
      ratingActive = rating.querySelector(".rating__active");
      ratingValue = rating.querySelector(".rating__value");
   }
   function setRatingActiveWidth(index = ratingValue.innerHTML) {
      const ratingActiveWidth = index / 0.05;
      ratingActive.style.width = `${ratingActiveWidth}%`;
   }
   function setRating(rating) {
      const ratingItems = rating.querySelectorAll(".rating__item");
      for (let index = 0; index < ratingItems.length; index++) {
         const ratingItem = ratingItems[index];
         ratingItem.addEventListener("mouseenter", function (e) {
            initRatingVars(rating);
            setRatingActiveWidth(ratingItem.value);
         });
         ratingItem.addEventListener("mouseleave", function (e) {
            setRatingActiveWidth();
         });
         ratingItem.addEventListener("click", function (e) {
            initRatingVars(rating);
            // если мы хотим чтобы рейтинг отправлял результат работы на сервер то нужно добавить
            // data-ajax="false" в блок с классами .rating .rating_set
            if (rating.dataset.ajax) {
               //отправить на сервер
               setRatingValue(ratingItem.value, rating);
            } else {
               //отобразить указанную оценку
               ratingValue.innerHTML = index + 1;
               setRatingActiveWidth();
            }
         });
      }
   }
   async function setRatingValue(value, rating) {
      if (!rating.classList.contains("rating_sending")) {
         rating.classList.add("rating_sending");
         //отправка данных(value) на сервер
         let response = await fetch("rating.json", {
            method: "GET",

            //body: JSON.stringify({ userRating: value }),
            //headers: { "content-type": "application/json" },
         });
         if (response.ok) {
            const result = await response.json();
            //получаем новый рейтинг
            const newRating = result.newRating;
            //вывод нового среднего результата
            ratingValue.innerHTML = newRating;
            //обновление актинвых звезд
            setRatingActiveWidth();

            rating.classList.remove("rating_sending");
         } else {
            alert("Ошибка!");
            rating.classList.remove("rating_sending");
         }
      }
   }
   //console.log(ratings);
}

/**
 * теперь приступим к созданию функции которая позволит нам при клике на элемент устанавливать
 * новое значение рейтинга которое мы выбрали сами. на ratingItem.addEventListener("click", function(e) {initRatingVars(rating);})
 * так же мы будем подключать возможность отправки рейтинга на сервер
 * чтобы, это будет своего рода имитация, но она будет работать при наличии настоящено сервера
 *
 */
