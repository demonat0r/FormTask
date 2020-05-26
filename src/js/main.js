//polyfill for IE11
 if ('NodeList' in window && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

//tabs navigation
document.querySelectorAll('.tab-item').forEach( element => {
    
    element.addEventListener('click', (event) => {
        document.querySelectorAll('.tabs-content').forEach( elem => {
            elem.style.display = 'none';
        })

        document.querySelectorAll('.tab-item').forEach( e => {
            e.classList.remove('active')
        })
        
        event.currentTarget.classList.add('active');
        document.getElementById(element.name).style.display = 'block'
    })
})


$("#phone").click(function() {
    $(this).setCursorPosition(3);
  }).mask("+7(999) 999-99-99");


$.fn.setCursorPosition = function(pos) {
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