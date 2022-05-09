export default function creatButton(objKey,num) {

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

  