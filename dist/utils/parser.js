"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (text) => {
    try {
        if (text[0] == '√') {
            return Math.sqrt(+(text.slice(1)));
        }
    }
    catch (e) {
        return "Unavalible statement. Please check correctness or use /info";
    }
    let first = '';
    let i = 0;
    while (true) {
        if (text[i] === ' ') {
            i++;
            continue;
        }
        if (isFinite(+text[i]))
            first += text[i];
        else
            break;
    }
    if (text[i + 1] == '/' || text[i + 1] == ' ' || text[i + 1] == '*') {
        var second = text.splice(i + 2, text.length);
    }
    else
        second = text.splice(i + 1, text.length);
    if (isNaN(+second))
        return "Unavalible statement. Please check correctness or use /info"
            + first
            + second;
    if (+first > 500000000000000000 || +second > 500000000000000000) {
        Math.round(first);
        Math.round(second);
    }
    second.toFixed(5);
    switch (text[i]) {
        case "+":
            return first + second;
        case "-":
            return first - second;
        case "*":
            if (text[i + 1] == "*") {
                if (first ** second > 200000000000000000000)
                    return String(BigInt(first) ** BigInt(second));
                else
                    return first ** second;
            }
            if (first * second > 200000000000000000000)
                return String(BigInt(first) * BigInt(second));
            else
                return first * second;
        case "/":
            if (second = 0)
                return "Can't divide by 0";
            if (text[i + 1] == "/") {
                return Math.floor(first / second);
            }
            else
                return first / second;
        case "%":
            return first % second;
    }
};
