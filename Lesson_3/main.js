document.addEventListener('DOMContentLoaded', init);

function init() {
    "use strict";
    const btnVFirst = document.querySelector('#replaceFirst');
    const textarea = document.querySelector('#text');
    const output = document.querySelector('.output');
    
    btnVFirst.addEventListener('click', replaceFirst);
   
    function replaceFirst(ev) {
        const reg = /\B'(.+?)'\B/gmi
        output.innerText = textarea.value.replace(reg, '"$1"');
    }
}


