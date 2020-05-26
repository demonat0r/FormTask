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
      e.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
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
    preset: 'islands#blueShoppingIcon'
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

  if ($(window).width() < 768) {
    myMap.behaviors.disable('scrollZoom');
  }
}
"use strict";

var firstFormFields = document.querySelectorAll('.required');
var secondFormFields = document.querySelectorAll('.radio-required');
var firstForm = document.querySelector('.first_tab_form');
var secondForm = document.querySelector('.second_tab_form');
firstForm.addEventListener('submit', function (e) {
  e.preventDefault();
  firstFormFields.forEach(function (el) {
    return firstFormCheck(el);
  });
});
firstFormFields.forEach(function (el) {
  el.onblur = function () {
    return firstFormCheck(el);
  };

  el.onfocus = function () {
    el.nextElementSibling.style.visibility = 'hidden';
    el.classList.remove('error');
  };
});

function firstFormCheck(field) {
  if (field.value === '') {
    field.classList.add('error');
    field.nextElementSibling.innerHTML = 'Это поле обязательно для заполнения';
    field.nextElementSibling.style.visibility = 'visible';
  } else if (field.classList[1] === 'tel') {
    var regExp = /\+7\(\d{3}\) \d{3}-\d{2}-\d{2}/;

    if (!regExp.test(field.value)) {
      field.classList.add('error');
      field.nextElementSibling.innerHTML = 'Неверно введен номер телефона';
      field.nextElementSibling.style.visibility = 'visible';
    } else {
      field.classList.remove('error');
      field.nextElementSibling.style.visibility = 'hidden';
    }
  } else if (field.classList[1] === 'person') {
    var _regExp = /^[а-яё -]+$/i;

    if (!_regExp.test(field.value)) {
      field.classList.add('error');
      field.nextElementSibling.innerHTML = 'Только кириллица, пробел и тире';
      field.nextElementSibling.style.visibility = 'visible';
    } else {
      field.classList.remove('error');
      field.nextElementSibling.style.visibility = 'hidden';
    }
  } else {
    field.nextElementSibling.style.visibility = 'hidden';
    field.classList.remove('error');
  }
}

secondFormFields.forEach(function (el) {
  el.addEventListener('click', function () {
    document.getElementById('error-radio').style.visibility = 'hidden';
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
    document.getElementById('error-radio').innerHTML = 'Выберите один из вариантов';
    document.getElementById('error-radio').style.visibility = 'visible';
  } else document.getElementById('error-radio').style.visibility = 'hidden';
});
//# sourceMappingURL=all.js.map
