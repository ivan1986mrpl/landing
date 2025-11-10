export let bodyLockStatus = true;
export let bodyLockToggle = (delay = 500) => {
  if (document.documentElement.hasAttribute('data-scroll-lock')) {
    bodyUnlock(delay);
  } else {
    bodyLock(delay);
  }
};
export let bodyUnlock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll(
      '[data-right-padding]',
    );
    setTimeout(() => {
      lockPaddingElements.forEach((lockPaddingElement) => {
        lockPaddingElement.style.paddingRight = '';
      });
      document.body.style.paddingRight = '';
      document.documentElement.removeAttribute('data-scroll-lock');
    }, delay);
    bodyLockStatus = false;
    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
};
export let bodyLock = (delay = 500) => {
  if (bodyLockStatus) {
    const lockPaddingElements = document.querySelectorAll(
      '[data-right-padding]',
    );
    const lockPaddingValue =
      window.innerWidth - document.body.offsetWidth + 'px';
    lockPaddingElements.forEach((lockPaddingElement) => {
      lockPaddingElement.style.paddingRight = lockPaddingValue;
    });

    document.body.style.paddingRight = lockPaddingValue;
    document.documentElement.setAttribute('data-scroll-lock', '');

    bodyLockStatus = false;
    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
};
//=================
// Устанавливает значение CSS-переменной --lock-padding-right
// function setLockPadding(value) {
//   const lockPaddingElements = document.querySelectorAll('[data-right-padding]');

//   // Если value передан, записываем переменную
//   if (value !== null && value !== undefined) {
//     lockPaddingElements.forEach((el) => {
//       el.style.setProperty('--lock-padding-right', value);
//     });
//     document.body.style.setProperty('--lock-padding-right', value);
//   } else {
//     // Если value не указан, удаляем переменную
//     lockPaddingElements.forEach((el) => {
//       el.style.removeProperty('--lock-padding-right');
//     });
//     document.body.style.removeProperty('--lock-padding-right');
//   }
// }
