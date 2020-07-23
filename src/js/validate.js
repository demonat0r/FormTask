const firstFormFields = document.querySelectorAll('.delivery-form__input');
const firstFormMessages = document.querySelectorAll('.delivery-form__error-msg');
const firstFormImages = document.querySelectorAll('.delivery-form__error-img')
const secondFormFields = document.querySelectorAll('.pickup-form__radio');
const firstForm = document.querySelector('.delivery-form');
const secondForm = document.querySelector('.pickup-form');
const errorRadio = document.getElementById('error-radio');


//first form validation
firstForm.addEventListener('submit', e => {
    e.preventDefault(); 

    firstFormFields.forEach( (el, index) => firstFormCheck(el, index));
});

firstFormFields.forEach( (el, index) => {
    el.onblur = () => firstFormCheck(el, index)
    el.onfocus = () => removeErrorItems(index)
})

function setErrorItems(index, msg) {
    firstFormMessages[index].innerHTML = msg
    firstFormMessages[index].classList.add('visible')
    firstFormImages[index].classList.add('visible')
}

function removeErrorItems(index) {
    firstFormMessages[index].classList.remove('visible')
    firstFormImages[index].classList.remove('visible')
}

function firstFormCheck(field, i) {
    if (field.value === '') {
        setErrorItems(i, 'Это поле обязательно для заполнения')
    }
    else if (field.classList[1] === 'tel') {
        let regExp = /\+7\(\d{3}\) \d{3}-\d{2}-\d{2}/

        if (!regExp.test(field.value)) {
            setErrorItems(i, 'Неверно введен номер телефона')
        }
        else {
            removeErrorItems(i)
        } 
    }
    else if (field.classList[1] === 'person') {
        let regExp = /^[а-яё -]+$/i

        if (!regExp.test(field.value)) {
            setErrorItems(i, 'Только кириллица, пробел и тире')
        }
        else {
            removeErrorItems(i)
        }
    }
    else {
        removeErrorItems(i) 
    }
}


//second form validation
secondFormFields.forEach( el => {
    el.addEventListener('click', () => {
        errorRadio.style.visibility = 'hidden'
    })
})

secondForm.addEventListener('submit', e => {
    e.preventDefault(); 

    let checked = false;


    for (let i = 0; i < secondFormFields.length; i++) {
        if (secondFormFields[i].checked) {
            checked = true
        }
    }

    if (!checked) {
        errorRadio.innerHTML = 'Выберите один из вариантов'
        errorRadio.style.visibility = 'visible'
    } 
    else 
        errorRadio.style.visibility = 'hidden'
});

