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
