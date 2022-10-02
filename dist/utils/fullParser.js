"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculator(text) {
    try {
        const index = text.indexOf('(');
        const lastIndex = text.indexOf(')');
        if (index != -1) {
            text = text.splice(index, lastIndex - index + 1, calculator(text.slice(index + 1, lastIndex - 1)));
        }
        while (text.indexOf('√') != -1) {
            let result = parser(text, text.indexOf('√'), false);
            const long = result.length + 1;
            text = text.splice(text.indexOf('√'), long, Math.sqrt(+(+result.toFixed(6))).toString());
        }
        // do for bignumbers
        while (text.indexOf('!') != -1) {
            let result = parser(text, text.indexOf('!'), false);
            const long = result.length + 1;
            const factorial = (digit) => {
                return (digit != 1n) ? digit * factorial(digit - 1n) : 1n;
            };
            text = text.splice(text.indexOf('√'), long, factorial(BigInt(result)).toString());
        }
        while (text.indexOf('**') != -1) {
            let [first, second, long] = parser(text, text.indexOf('**') + 1, true);
            if ((+first) ** +second > 200000000000000000000)
                text = text.splice(index - first.length, long + 2, String(BigInt(first) ** BigInt(second)));
            else
                text = text.splice(index - first.length, long + 2, String((+first) ** second));
        }
        while (text.indexOf('^') != -1) {
            let [first, second, long] = parser(text, text.indexOf('^'), true);
            if ((+first) ** +second > 1000000000000000)
                text = text.splice(index - first.length, long + 1, String(BigInt(first) ** BigInt(second)));
            else
                text = text.splice(index - first.length, long + 1, String((+first) ** +second));
        }
        for (let i = 0; i < text.length; i++) {
            if (text[i] == '*') {
                let [first, second, long] = parser(text, text.indexOf('*'), true);
                if ((+first) * +second > 10000000000000000)
                    text = text.splice(index - first.length, long + 1, String(BigInt(first) * BigInt(second)));
                else
                    text = text.splice(index - first.length, long + 2, String((+first) * second));
                i = 0;
            }
            else if (text[i] == '/') {
                let [first, second, long] = parser(text, text.indexOf('*'), true);
                if ((+first) / +second > 10000000000000000)
                    text = text.splice(index - first.length, long + 1, String(BigInt(first) / BigInt(second)));
                else
                    text = text.splice(index - first.length, long + 1, String((+first) / second));
                i = 0;
            }
            else if (text[i] == '%') {
                let [first, second, long] = parser(text, text.indexOf('%'), true);
                text = text.splice(index - first.length, long + 1, String((+first) % second));
                i = 0;
            }
        }
        for (let i = 0; i < text.length; i++) {
            if (text[i] == '+') {
                let [first, second, long] = parser(text, text.indexOf('*'), true);
                if ((+first) + +second > 20000000000000000)
                    text = text.splice(index - first.length, long + 1, String(BigInt(first) + BigInt(second)));
                else
                    text = text.splice(index - first.length, long + 1, String((+first) + second));
                i = 0;
            }
            else if (text[i] == '-') {
                let [first, second, long] = parser(text, text.indexOf('-'), true);
                if ((+first) - +second > 20000000000000000)
                    text = text.splice(index - first.length, long + 1, String(BigInt(first) - BigInt(second)));
                else
                    text = text.splice(index - first.length, long + 1, String((+first) - second));
                i = 0;
            }
        }
        if (isNaN(+(text.join(''))))
            return "Unavalible statement. Please check correctness or use /info";
        return text.join('');
    }
    catch (e) {
        return "Unavalible statement. Please check correctness or use /info";
    }
}
exports.default = calculator;
function parser(text, index, both) {
    index++;
    if (both) {
        let newIndex = index - 2;
        let first = parseFloat(text.slice(index).join('')).toString();
        if (text[newIndex] == '*')
            newIndex--;
        let second = parseFloat(text.slice(0, newIndex + 1).reverse().join('')).toString();
        if (isNaN(+first) || isNaN(+second))
            return false;
        return [second, first, second + first];
    }
    else {
        const result = parseFloat(text.slice(index).join('')).toString();
        return (isNaN(+result)) ? false : result;
    }
}
