"use strict";

//polyfill for IE11
if ('NodeList' in window && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
} //tabs navigation


document.querySelectorAll('.tab-item').forEach(function (element) {
  element.addEventListener('click', function (event) {
    document.querySelectorAll('.tabs-content').forEach(function (elem) {
      elem.style.display = 'none';
    });
    document.querySelectorAll('.tab-item').forEach(function (e) {
      e.classList.remove('tab-item_active');
    });
    event.currentTarget.classList.add('tab-item_active');
    document.getElementById(element.name).style.display = 'block';
  });
});
$("#phone").click(function () {
  $(this).setCursorPosition(3);
}).mask("+7(999) 999-99-99");

$.fn.setCursorPosition = function (pos) {
  if ($(this).get(0).setSelectionRange) {
    $(this).get(0).setSelectionRange(pos, pos);
  } else if ($(this).get(0).createTextRange) {
    var range = $(this).get(0).createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
};
"use strict";

ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map("map", {
    center: [55.76, 37.64],
    zoom: 10
  });
  var coords = [[55.75, 37.50], [55.32216911184813, 38.67462917402046]];
  var myCollection = new ymaps.GeoObjectCollection({}, {
    iconLayout: 'default#image',
    iconImageHref: '../img/pin.svg',
    iconImageSize: [33, 40],
    iconImageOffset: [-3, -42]
  });

  for (var i = 0; i < coords.length; i++) {
    myCollection.add(new ymaps.Placemark(coords[i]));
  }

  myMap.geoObjects.add(myCollection);
  var centerAndZoom = ymaps.util.bounds.getCenterAndZoom(myCollection.getBounds(), [$(window).width(), $("#map").height()], myMap.options.get('projection'));
  myMap.setCenter(centerAndZoom.center, centerAndZoom.zoom);
  myMap.controls.remove('searchControl');
  myMap.controls.remove('trafficControl');
  myMap.controls.remove('typeSelector');
  myMap.controls.remove('fullscreenControl');
  myMap.controls.remove('rulerControl');
  $(window).resize(function () {
    if ($(window).width() < 768) {
      myMap.behaviors.disable('scrollZoom');
    } else {
      myMap.behaviors.enable('scrollZoom');
    }
  });
}
"use strict";

var firstFormFields = document.querySelectorAll('.delivery-form__input');
var firstFormMessages = document.querySelectorAll('.delivery-form__error-msg');
var firstFormImages = document.querySelectorAll('.delivery-form__error-img');
var secondFormFields = document.querySelectorAll('.pickup-form__radio');
var firstForm = document.querySelector('.delivery-form');
var secondForm = document.querySelector('.pickup-form');
var errorRadio = document.getElementById('error-radio'); //first form validation

firstForm.addEventListener('submit', function (e) {
  e.preventDefault();
  firstFormFields.forEach(function (el, index) {
    return firstFormCheck(el, index);
  });
});
firstFormFields.forEach(function (el, index) {
  el.onblur = function () {
    return firstFormCheck(el, index);
  };

  el.onfocus = function () {
    return removeErrorItems(index);
  };
});

function setErrorItems(index, msg) {
  firstFormMessages[index].innerHTML = msg;
  firstFormMessages[index].classList.add('visible');
  firstFormImages[index].classList.add('visible');
}

function removeErrorItems(index) {
  firstFormMessages[index].classList.remove('visible');
  firstFormImages[index].classList.remove('visible');
}

function firstFormCheck(field, i) {
  if (field.value === '') {
    setErrorItems(i, 'Это поле обязательно для заполнения');
  } else if (field.classList[1] === 'tel') {
    var regExp = /\+7\(\d{3}\) \d{3}-\d{2}-\d{2}/;

    if (!regExp.test(field.value)) {
      setErrorItems(i, 'Неверно введен номер телефона');
    } else {
      removeErrorItems(i);
    }
  } else if (field.classList[1] === 'person') {
    var _regExp = /^[а-яё -]+$/i;

    if (!_regExp.test(field.value)) {
      setErrorItems(i, 'Только кириллица, пробел и тире');
    } else {
      removeErrorItems(i);
    }
  } else {
    removeErrorItems(i);
  }
} //second form validation


secondFormFields.forEach(function (el) {
  el.addEventListener('click', function () {
    errorRadio.style.visibility = 'hidden';
  });
});
secondForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var checked = false;

  for (var i = 0; i < secondFormFields.length; i++) {
    if (secondFormFields[i].checked) {
      checked = true;
    }
  }

  if (!checked) {
    errorRadio.innerHTML = 'Выберите один из вариантов';
    errorRadio.style.visibility = 'visible';
  } else errorRadio.style.visibility = 'hidden';
});
//# sourceMappingURL=all.js.map
