export default (text: any) =>{
    let first: string =''
    let i: number = 0
    while (true){
        if (text[i] === ' '){
            i++
            continue
        }
        if (isFinite(+text[i])) first += text[i]
        else break
    }
    if (text[i+1] == '/' || text[i+1] == ' ' || text[i+1] == '*'){
        var second = text.splice(i+2, text.length)
    } else second = text.splice(i+1, text.length)
    if (isNaN(+second)) return "Unavalible statement. Please check correctness or use /info"
    switch(text[i]){
        case "+":
            return String(BigInt(first) + BigInt(second))
        case "-":
            return String(BigInt(first) - BigInt(second))
        case "*":
            if (second[0] == "*") return String(BigInt(first) ** BigInt(second.splice(1)))
            return String(BigInt(first) * BigInt(second))
        case "/":
            if (second[0] == "/") return String(BigInt(first) ** BigInt(second.splice(1)))
            return String(BigInt(first) + BigInt(second))
        case "%":
            break
        case "√":
            break
    }
}