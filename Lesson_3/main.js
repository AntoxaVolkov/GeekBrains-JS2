document.addEventListener('DOMContentLoaded', init);

function init() {
    "use strict";
    const btnVFirst = document.querySelector('#replaceFirst');
    const btnVSecond = document.querySelector('#replaceSecond');
    const textarea = document.querySelector('#text');
    const output = document.querySelector('.output');
    
    btnVFirst.addEventListener('click', replaceFirst);

    btnVSecond.addEventListener('click', replaceSecond);
   
    
    function replaceFirst(ev) {
        const reg = /\B'(.+?)'\B/gmi
        output.innerText = textarea.value.replace(reg, '"$1"');
    }

    function replaceSecond(ev) {
        const reg = /([^a-zA-Zа-яА-ЯёЁ]|^)'(.+?)'([^a-zA-Zа-яА-ЯёЁ]|$)/gmi
        output.innerText = textarea.value.replace(reg, '$1"$2"$3');
    }
}


