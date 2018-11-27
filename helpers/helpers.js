export const prettyNumber = (number)=>{
    thousand_separator = ' ';
    var	reverse   = number.toString().split('').reverse().join(''),
    thousands = reverse.match(/\d{1,3}/g);
    result 	  = thousands.join(thousand_separator).split('').reverse().join('');
    return result
}