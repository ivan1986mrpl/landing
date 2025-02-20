'use strict';

function popups() {
    const popupLinks = document.querySelectorAll('.popup-link');
      
    if (popupLinks.length > 0) {
        for (let index = 0; index < popupLinks.length; index++) {
            const popupLink = popupLinks[index];
            popupLink.addEventListener('click', function(e) {
                e.preventDefault();
                const popupName = popupLink.getAttribute('href').replace('#', '');//убираем хеш и получаем чистое имя
                const currentPopup = document.getElementById(popupName);
                popupOpen(currentPopup);
            });
        }
    } 

    const popupCloseIcon = document.querySelectorAll('.close-popup');
    if (popupCloseIcon.length > 0) {
        for (let index = 0; index < popupCloseIcon.length; index++) {
            const el = popupCloseIcon[index];
            el.addEventListener('click', function(e) {
                e.preventDefault();
                //popupCloseIcon(el.closest('.popup'));
                popupClose(el.closest('.popup'));//закрываем ближайшего родителя кнопки close-popup
            });
        }
    }

    function popupOpen(currentPopup) {
        if (currentPopup && bodyLockStatus) {
            const popupActive = document.querySelector('.popup.open');
            if (popupActive) {
                popupClose(popupActive, false);
            } else {
                bodyLock();
            }
            currentPopup.classList.add('open');
            currentPopup.addEventListener('click', (e) => {
                if (!e.target.closest('.popup__content')) {//все, кроме темной области (если нет в родителях popup__content)
                    popupClose(e.target.closest('.popup'));
                }
            });
        }
    }

    function popupClose(popupActive, doUnlock = true) {//doUnlock = true === чтобы не рахблокировался скролл, если открываем попап сразу после другого попапа
        if (bodyLockStatus) {
            popupActive.classList.remove('open');
            if (doUnlock) {
                bodyUnlock();
            }
        }
    } 

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
            const popupActive = document.querySelector('.popup.open');
            popupClose(popupActive);
        }
    });
}
popups();


//==============
const body = document.querySelector('body'),
      lockPadding = document.querySelectorAll('.lock-padding');
let bodyLockStatus = true;

function bodyLock(delay = 500) {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    
    if (lockPadding.length > 0) {
        for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i];
            el.style.paddingRight = lockPaddingValue;   
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');
    
    bodyLockStatus = false;
    setTimeout(function() {
        bodyLockStatus = true;
    }, delay);
}

function bodyUnlock(delay = 500) {
    setTimeout(function() {
        if (lockPadding.length > 0) {
            for (let i = 0; i < lockPadding.length; i++) {
                const el = lockPadding[i];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, delay);

    bodyLockStatus = false;
    setTimeout(function() {
        bodyLockStatus = true;
    }, bodyLockStatus);
}

