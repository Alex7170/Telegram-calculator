export default (text: any): any =>{
    try{
        if (text[0] =='√'){
            return Math.sqrt(+(text.slice(1)))
        }
    } catch(e){
        return "Unavalible statement. Please check correctness or use /info"
    }
    text = text.split(' ').join('')
    let first: any = parseFloat(text).toString()
    let i: number = first.length
    if (text[i+1] == '/' || text[i+1] == '*'){
        var second = text.slice(i+2)
    } else second = text.slice(i+1)
    if (isNaN(+second)) return "Unavalible statement. Please check correctness or use /info"
    first = +first
    second = +second
    second.toFixed(5)
    if (first > 500000000000000000 || second > 500000000000000000){
        Math.round(first)
        Math.round(second)
    }
    switch(text[i]){
        case "+":
            return first + second
        case "-":
            return first - second
        case "*":
            if (text[i+1] == "*"){
                if (first**second > 200000000000000000000) return String(BigInt(first) ** BigInt(second))
                else return first**second
            }
            if (first*second > 200000000000000000000) return String(BigInt(first) * BigInt(second))
            else return first*second
        case "/":
            if (second = 0) return "Can't divide by 0"
            if (text[i+1] == "/"){
                return Math.floor(first/second)
            } else return first / second
        case "%":
            return first%second
    }
    return "Unavalible statement. Please check correctness or use /info"
}