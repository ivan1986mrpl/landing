
function lockScroll() {
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
}

lockScroll();