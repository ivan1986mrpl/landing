export let bodyLockStatus = true;
export const bodyLock = (delay = 500) => {
  if (!bodyLockStatus) {
    return;
  }

  const body = document.body;
  const wrapper = document.querySelector('.wrapper');
  const lockPaddingValue =
    window.innerWidth -
    (wrapper ? wrapper.offsetWidth : body.offsetWidth) +
    'px';
  const lockPadding = document.querySelectorAll('[data-lp]');

  lockPadding.forEach((el) => (el.style.paddingRight = lockPaddingValue));
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');

  bodyLockStatus = false;
  setTimeout(() => (bodyLockStatus = true), delay);
};

export const bodyUnlock = (delay = 500) => {
  if (!bodyLockStatus) {
    return;
  }

  const body = document.body;
  const lockPadding = document.querySelectorAll('[data-lp]');

  setTimeout(() => {
    lockPadding.forEach((el) => (el.style.paddingRight = ''));
    body.style.paddingRight = '';
    body.classList.remove('lock');
  }, delay);

  bodyLockStatus = false;
  setTimeout(() => (bodyLockStatus = true), delay);
};

export const bodyLockToggle = (delay = 500) => {
  if (document.body.classList.contains('lock')) {
    bodyUnlock(delay);
  } else {
    bodyLock(delay);
  }
};
