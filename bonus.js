var romanToInt = function(s) {
    const romanMap = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    };

    s = s.replace("IV", "IIII")
         .replace("IX", "VIIII")
         .replace("XL", "XXXX")
         .replace("XC", "LXXXX")
         .replace("CD", "CCCC")
         .replace("CM", "DCCCC");

    let total = 0;
    for (let char of s) {
        total += romanMap[char];
    }

    return total;
};
