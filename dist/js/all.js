//polyfill for IE11
if ('NodeList' in window && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
} //tabs navigation


document.querySelectorAll('.tab-item').forEach(element => {
  element.addEventListener('click', event => {
    document.querySelectorAll('.tabs-content').forEach(elem => {
      elem.style.display = 'none';
    });
    document.querySelectorAll('.tab-item').forEach(e => {
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
const firstFormFields = document.querySelectorAll('.delivery-form_required');
const secondFormFields = document.querySelectorAll('.pickup-form_radio-required');
const firstForm = document.querySelector('.delivery-form');
const secondForm = document.querySelector('.pickup-form');
const errorRadio = document.getElementById('error-radio'); //first form validation

firstForm.addEventListener('submit', e => {
  e.preventDefault();
  firstFormFields.forEach(el => firstFormCheck(el));
});
firstFormFields.forEach(el => {
  el.onblur = () => firstFormCheck(el);

  el.onfocus = () => {
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
    let regExp = /\+7\(\d{3}\) \d{3}-\d{2}-\d{2}/;

    if (!regExp.test(field.value)) {
      field.classList.add('error');
      field.nextElementSibling.innerHTML = 'Неверно введен номер телефона';
      field.nextElementSibling.style.visibility = 'visible';
    } else {
      field.classList.remove('error');
      field.nextElementSibling.style.visibility = 'hidden';
    }
  } else if (field.classList[1] === 'person') {
    let regExp = /^[а-яё -]+$/i;

    if (!regExp.test(field.value)) {
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
} //second form validation


secondFormFields.forEach(el => {
  el.addEventListener('click', () => {
    errorRadio.style.visibility = 'hidden';
  });
});
secondForm.addEventListener('submit', e => {
  e.preventDefault();
  let checked = false;

  for (let i = 0; i < secondFormFields.length; i++) {
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
