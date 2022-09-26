export function calculate(text: string, start: number = 0, end: number = text.length-1) : any{
    if (text.indexOf('(') != -1) return calculate(text, text.indexOf('(')+1, text.lastIndexOf(')')-1)

}