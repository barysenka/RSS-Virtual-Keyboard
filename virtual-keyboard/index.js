

import objKey from './lang.js';
import creatButton from './createButton.js';

const body = document.querySelector('body');



const wrapKeyboard = document.createElement('div');
wrapKeyboard.className = 'wrap-keyboard';
body.append(wrapKeyboard);

const title = document.createElement('h1');
title.className = 'title';
title.innerText = 'RSS Virtual Keyboard'
wrapKeyboard.append(title);

const textareaBody = document.createElement('textarea');
textareaBody.className = 'textarea-body';
wrapKeyboard.append(textareaBody);

const bodyKeyboard = document.createElement('div');
bodyKeyboard.className = 'body-keyboard';
wrapKeyboard.append(bodyKeyboard);

const language = document.createElement('p');
language.className = 'language';
language.innerText = 'Для переключения языка комбинация: левыe ctrl + alt';
wrapKeyboard.append(language);

const description = document.createElement('p');
description.className = 'description';
description.innerText = 'Клавиатура создана в операционной системе Windows';
wrapKeyboard.append(description);

for(let i = 0; i<5; i++){
    const keyboardRow = document.createElement('div');
    keyboardRow.className = 'keyboard-row';
    bodyKeyboard.append(keyboardRow);
    if(i === 0){
        for(let num = 1; num <= 14; num++){
            keyboardRow.append(creatButton(objKey,num))
           }
    }
    if(i === 1){
        for(let num = 15; num <= 28; num++){
            keyboardRow.append(creatButton(objKey,num))
           }
    }
    if(i === 2){
        for(let num = 29; num <= 41; num++){
            keyboardRow.append(creatButton(objKey,num))
           }
    }
    if(i === 3){
        for(let num = 42; num <= 54; num++){
            keyboardRow.append(creatButton(objKey,num))
           }
    }
    if(i === 4){
        for(let num = 55; num <= 63; num++){
            keyboardRow.append(creatButton(objKey,num))
           }
    }
}

textareaBody.focus();

//смена языка в локалсторедж
let langLocal = 'eng';
window.addEventListener('beforeunload', setLocalStorage)
window.addEventListener('load', getLocalStorage)


function setLocalStorage() {
    localStorage.setItem('lang', langLocal);
  }

  function getLocalStorage() {
    if(localStorage.getItem('lang')) {
      let lang = localStorage.getItem('lang');
      getTranslate(lang)
    }
  }


 


  function searchButton(obj, num) {
      
        for (let key in obj) {
            obj[key]
            if (obj[key].name == num){
                return obj[key].caseDown
            }
    }
  }


const caseDown = document.querySelectorAll('.caseDown')
const caseUp = document.querySelectorAll('.caseUp')
const capsLock = document.querySelectorAll('.capsLock')
const capsLockShift = document.querySelectorAll('.capsLockShift')
const keyRu = document.querySelectorAll('.key-ru')
const keyEng = document.querySelectorAll('.key-eng')



  function getTranslate(lang){
      if (lang == 'eng'){
        keyRu.forEach((el)=>{
            el.classList.add('hidden')
            el.firstChild.classList.add('hidden')
        }) 
        keyEng.forEach((el)=>{
            el.classList.remove('hidden')
            el.firstChild.classList.remove('hidden')
        })
    }else{
        console.log(lang)
        keyEng.forEach((el)=>{
            el.classList.add('hidden')
            el.firstChild.classList.add('hidden')
        })
            keyRu.forEach((el)=>{
                el.classList.remove('hidden')
                el.firstChild.classList.remove('hidden')
            })
          }
  }

 
  textareaBody.addEventListener('input',()=>{
      console.log(textareaBody.value)
  })


  const keyboardKeys  = document.querySelectorAll('.keyboard-key');
  const KeyArray = ['ShiftRight','ShiftLeft', 'ControlRight', 'ControlLeft', 'CapsLock','MetaLeft', 'Tab', 'AltRight','AltLeft', 'Enter', 'Backspace', 'Space']
  




  document.addEventListener('keydown',(event)=>{
   
      if ((event.key == 'Alt') && (event.ctrlKey || event.metaKey) ){
      
        keyRu.forEach((el)=>{
        if (el.classList.contains('hidden')){
            langLocal = 'ru'
            setLocalStorage();
        }else{
            langLocal = 'eng'
            setLocalStorage();
        }
            el.classList.toggle('hidden')
            el.firstChild.classList.toggle('hidden')
        })
        keyEng.forEach((el)=>{
            el.classList.toggle('hidden')
            el.firstChild.classList.toggle('hidden')
        })
    }
  })
  document.addEventListener('keyup',(event)=>{
   
    // if (event.code == 'ControlLeft' && event.code == 'AltLeft' ){
    //     console.log(event.code)
    // }
    let lng  = localStorage.getItem('lang');
    searchButton(objKey[lng], event.code)
    console.log(event.code)
})

//   textareaBody.innerText = `${a}`;





 class ShiftKeys {

    onDown() {

        if (langLocal == 'ru'){
            keyRu.forEach((el)=>{
                el.firstChild.classList.add('hidden')
            })
        }
        if (langLocal == 'eng'){
            keyEng.forEach((el)=>{
                el.firstChild.classList.add('hidden')
            })
        }
            caseUp.forEach((el)=>{
                 el.classList.remove('hidden')
            })
      }
 

      onUp() {
        if (langLocal == 'ru'){
            keyRu.forEach((el)=>{
                el.firstChild.classList.remove('hidden')
            })
        }
        if (langLocal == 'eng'){
            keyEng.forEach((el)=>{
                el.firstChild.classList.remove('hidden')
            })
        }
            caseUp.forEach((el)=>{
                 el.classList.add('hidden')
            })
      }

      onClick() {
        if (langLocal == 'ru'){
            keyRu.forEach((el)=>{
                el.firstChild.classList.toggle('hidden')
            })
        }
        if (langLocal == 'eng'){
            keyEng.forEach((el)=>{
                el.firstChild.classList.toggle('hidden')
            })
        }
            caseUp.forEach((el)=>{
                 el.classList.toggle('hidden')
            })
      }

}

let shifts = new ShiftKeys();
function searchActiveButton(names, event) {
    keyboardKeys.forEach((keyboardKey)=>{
      
        if (keyboardKey.dataset.key == names){
            
            if (event == 'keydown' ){
                keyboardKey.classList.add('active')
            }
            if (event == 'keyup'){
                keyboardKey.classList.remove('active')
            }
        }
    })
}

document.addEventListener('keydown', (event)=>{
   
      searchActiveButton(event.code, 'keydown')


       if (event.code == 'ShiftLeft' || event.code == 'ShiftRight' ){
            shifts.onDown()
       }
       if (event.code == 'CapsLock'){
        shifts.onClick()
   }
})

document.addEventListener('keyup', (event)=>{

    searchActiveButton(event.code, 'keyup')

    if (event.code == 'ShiftLeft' || event.code == 'ShiftRight' ){
         shifts.onUp()
    }
})

keyboardKeys.forEach((keyboardKey)=>{
    let  symbol;
    keyboardKey.addEventListener('click',(event)=>{
       symbol = event.currentTarget.dataset.key;
        let lng  = localStorage.getItem('lang');
        event.currentTarget.classList.remove('active')

        if (!KeyArray.includes(symbol)){
            textareaBody.value += searchButton(objKey[lng], symbol)
        }
        if (symbol == 'CapsLock'){
            shifts.onClick()
       }
      })
      keyboardKey.addEventListener('mouseup',(event)=>{
        symbol = event.currentTarget.dataset.key;
        event.currentTarget.classList.add('active')
        if (symbol == 'ShiftLeft' || symbol == 'ShiftRight' ){
             shifts.onUp()
        }
    })
    keyboardKey.addEventListener('mousedown',(event)=>{
        symbol = event.currentTarget.dataset.key;
        event.currentTarget.classList.add('active')
        if (symbol == 'ShiftLeft' || symbol == 'ShiftRight' ){
             shifts.onDown()
        }
    })
 })

