export default function calculator (text: string[]) : string {
    try{
        const index = text.indexOf('(')
        const lastIndex = text.lastIndexOf(')')
        if (index != -1){
            if(lastIndex == -1) return "Unavalible statement. Please check correctness or use /info"
            text.splice(index, lastIndex - index + 1, calculator(text.slice(index+1, lastIndex)))
        }
        while (text.indexOf('√') != -1){
            let result: any = parser(text, text.indexOf('√'), false)
            if (!result) return "Unavalible statement. Please check correctness or use /info"
            const long: number = result.length + 1
            text.splice(text.indexOf('√'), long, Math.sqrt(+(+result.toFixed(6))).toString())
        }
        while (text.indexOf('!') != -1){
            let result: any = parser(text, text.indexOf('!'), false)
            if (!result) return "Unavalible statement. Please check correctness or use /info"
            const long: number = result.length + 1
            const factorial = (digit: bigint): bigint =>{
                return (digit != 1n)? digit * factorial(digit-1n) : 1n
            }
            text.splice(text.indexOf('√'), long, factorial(BigInt(result)).toString())
        }
        while (text.indexOf('**') != -1){
            let [first, second, long] = parser(text, text.indexOf('**')+1, true)
            if (!first) return "Unavalible statement. Please check correctness or use /info"
            if ((+first) ** +second > 200000000000000000000) text = text.splice(index - first.length, long+2, String(BigInt(first) ** BigInt(second)))
            else text.splice(text.indexOf('**') - first.length, long+2, String((+first)**second))
        }
        while (text.indexOf('^') != -1){
            let [first, second, long]: any = parser(text, text.indexOf('^'), true)
            if (!first) return "Unavalible statement. Please check correctness or use /info"
            if ((+first) ** +second > 1000000000000000) text = text.splice(index - first.length, long+1, String(BigInt(first) ** BigInt(second)))
            else text.splice(text.indexOf('^') - first.length, long+1, String((+first)**+second))
        }
        for (let i:number = 0; i<text.length; i++){
            if (text[i] == '*'){
                let [first, second, long] = parser(text, text.indexOf('*'), true)
                if (!first) return "Unavalible statement. Please check correctness or use /info" 
                if ((+first) * +second > 10000000000000000) text = text.splice(index - first.length, long+1, String(BigInt(first) * BigInt(second)))
                else text.splice(text.indexOf('*') - first.length, long+2, String((+first)*second))
                i=0
            } else if (text[i] == '/'){
                let [first, second, long] = parser(text, text.indexOf('*'), true)
                if (!first) return "Unavalible statement. Please check correctness or use /info"
                if ((+first) / +second > 10000000000000000) text = text.splice(index - first.length, long+1, String(BigInt(first) / BigInt(second)))
                else text.splice(text.indexOf('/')-first.length, long+1, String((+first)/second))
                i=0
            } else if (text[i] == '%'){
                let [first, second, long] = parser(text, text.indexOf('%'), true)
                if (!first) return "Unavalible statement. Please check correctness or use /info"
                text.splice(text.indexOf('%'), long+1, String((+first)%second))
                i=0
            }
        }
        for (let i:number = 0; i<text.length; i++){
            if (text[i] == '+'){
                let [first, second, long] = parser(text, text.indexOf('+'), true)
                if (!first) return "Unavalible statement. Please check correctness or use /info"
                if ((+first) + +second > 20000000000000000) text = text.splice(index - first.length, long+1, String(BigInt(first) + BigInt(second)))
                else text.splice(text.indexOf('+')-first.length, long+1, String((+first)+ +second)) 
                i=0
            } else if(text[i] == '-'){
                let [first, second, long] = parser(text, text.indexOf('-'), true)
                if (!first ) return "Unavalible statement. Please check correctness or use /info"
                if ((+first) - +second > 20000000000000000) text = text.splice(index - first.length, long+1, String(BigInt(first) - BigInt(second)))
                else text.splice(text.indexOf('-')-first.length, long+1, String((+first)-second))
                i=0
            }
        }
        if (isNaN(+(text.join('')))) return "Unavalible statement. Please check correctness or use /info"
        return text.join('')
    } catch(e){
        return "Unavalible statement. Please check correctness or use /info"
    }
}

function parser (text: string[], index: number, both: boolean): any{
    index++
    if (both){        
        let newIndex = index - 2
        let first: string = parseFloat(text.slice(index).join('')).toString()
        let second: string = parseFloat(text.slice(0, newIndex+1).reverse().join('')).toString()
        if (isNaN(+first) || isNaN(+second)) return false
        return [second, first, second.length + first.length] 
    } else{
        const result = parseFloat(text.slice(index).join('')).toString() 
        return (isNaN(+result))? false: result
    }
}