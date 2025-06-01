function throttle(fn, delay) {
    let isThrottled = false;
    
    return function (...args) {
        if (!isThrottled) {
            fn.apply(this, args); // Call immediately
            isThrottled = true;
            setTimeout(() => {
                isThrottled = false;
            }, delay);
        }
    };
}

const func = throttle((...args) => {
    console.log(args)
}, 1000);

func(1, 2, 3, 4);

for(let i = 0; i < 4; ++i) {
    setTimeout(()=> {
    func(5, 6);
}, i * 1000);
}

/*

https://www.freecodecamp.org/news/throttling-in-javascript/

*/