const firstFormFields = document.querySelectorAll('.delivery-form_required');
const secondFormFields = document.querySelectorAll('.pickup-form_radio-required')
const firstForm = document.querySelector('.delivery-form');
const secondForm = document.querySelector('.pickup-form');
const errorRadio = document.getElementById('error-radio');


//first form validation
firstForm.addEventListener('submit', e => {
    e.preventDefault(); 

    firstFormFields.forEach( el => firstFormCheck(el));
});

firstFormFields.forEach( el => {
    el.onblur = () => firstFormCheck(el)
    el.onfocus = () =>  { 
        el.nextElementSibling.style.visibility = 'hidden'
        el.classList.remove('error')
    }
})

function firstFormCheck(field) {
    if (field.value === '') {
        field.classList.add('error')
        field.nextElementSibling.innerHTML = 'Это поле обязательно для заполнения'
        field.nextElementSibling.style.visibility = 'visible'
    }
    else if (field.classList[1] === 'tel') {
        let regExp = /\+7\(\d{3}\) \d{3}-\d{2}-\d{2}/

        if (!regExp.test(field.value)) {
            field.classList.add('error')
            field.nextElementSibling.innerHTML = 'Неверно введен номер телефона'
            field.nextElementSibling.style.visibility = 'visible'
        }
        else {
            field.classList.remove('error')
            field.nextElementSibling.style.visibility = 'hidden'
        } 
    }
    else if (field.classList[1] === 'person') {
        let regExp = /^[а-яё -]+$/i

        if (!regExp.test(field.value)) {
            field.classList.add('error')
            field.nextElementSibling.innerHTML = 'Только кириллица, пробел и тире'
            field.nextElementSibling.style.visibility = 'visible'
        }
        else {
            field.classList.remove('error')
            field.nextElementSibling.style.visibility = 'hidden'
        }
    }
    else {
        field.nextElementSibling.style.visibility = 'hidden' 
        field.classList.remove('error')  
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

