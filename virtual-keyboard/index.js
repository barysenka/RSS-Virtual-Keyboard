

import objKey from './lang.js';

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
 

  function creatButton(objKey,num) {

    if (!Object.keys(objKey).length) return;

    const keyboardKey  = document.createElement('div');
    keyboardKey.className = 'keyboard-key';
   
    for (let key in objKey.eng) {
          
        if ( key == num){ 
           
    keyboardKey.setAttribute(`data-key`, `${objKey.eng[key].name}`); 
        }
    }
    for (let lang in objKey) {
   
        const keyLang = document.createElement('span')
        keyLang.className = `key-${lang}`;
        
        for (let key in objKey[lang]) {
          
           if ( key == num){     
           
        const caseDown = document.createElement('span')
        caseDown.className = `caseDown hidden`;
        caseDown.innerText = `${objKey[lang][key].caseDown}`;

        const caseUp = document.createElement('span')
        caseUp.className = `caseUp hidden`;
        caseUp.innerText = `${objKey[lang][key].caseUp}`;

        const capsLock = document.createElement('span')
        capsLock.className = `capsLock hidden`;
        capsLock.innerText = `${objKey[lang][key].caseUp}`;

        const capsLockShift = document.createElement('span')
        capsLockShift.className = `capsLockShift hidden`;
        capsLockShift.innerText = `${objKey[lang][key].caseDown}`;

       
        keyLang.append(caseDown);
        keyLang.append(caseUp);
        keyLang.append(capsLock);
        keyLang.append(capsLockShift);
           }
        }
      keyboardKey.append(keyLang);
    }
    return keyboardKey;
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
  
 keyboardKeys.forEach((keyboardKey)=>{
    keyboardKey.addEventListener('click',(event)=>{
      
        let lng  = localStorage.getItem('lang');
        if ((event.currentTarget.dataset.key == 'Shift') && (event.currentTarget.dataset.key) ){
            console.log(event.currentTarget.dataset.key)
        }
        textareaBody.value += searchButton(objKey[lng], event.currentTarget.dataset.key)
      
      })
 })


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



//шифт подсветка клавиш

class ShiftKey {
    handleEvent(event) {
        if (event.code == 'ShiftLeft' || event.code == 'ShiftRight'){
        let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
      this[method](event);
        }
    }
    onKeydown() {

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

      onKeyup() {
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

}

let shift = new ShiftKey();
document.addEventListener('keydown', shift)
document.addEventListener('keyup', shift)