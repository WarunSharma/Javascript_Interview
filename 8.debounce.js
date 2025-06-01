function debounce(fn, delay) {
    let timerId;
    return function(...args) {
        clearTimeout(timerId);
        timerId = setTimeout(()=>{
            fn.apply(this,...args);
        }, delay);
    }
}

const debouncedFn = debounce(()=>{
    console.log("Fn called")
}, 2000);

debouncedFn();

setTimeout(debouncedFn, 4000);

/*

If asked to support immediate mode (i.e., call the function on the leading edge instead of the trailing edge), you can mention this optional enhancement:

function debounce(fn, delay, immediate = false) {
    let timerId;
    return function(...args) {
        const callNow = immediate && !timerId;
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            timerId = null;
            if (!immediate) fn.apply(this, args);
        }, delay);
        if (callNow) fn.apply(this, args);
    }
}

*/