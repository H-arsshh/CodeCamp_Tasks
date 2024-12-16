function convertToRoman(num) {
  function getNumeral(digit, lowStr, midStr, nextStr) {
    switch (true) {
      case digit <= 3:
        return lowStr.repeat(digit);
      case digit === 4:
        return lowStr + midStr;
      case digit <= 8: 
        return midStr + lowStr.repeat(digit - 5);
      default: 
        return lowStr + nextStr
    }
  }

  let str = ""

 
  str += "M".repeat(Math.floor(num/1000));
  num %= 1000;

  
  str += getNumeral(Math.floor(num/100), 'C', 'D', 'M')
  num %= 100;

 
  str += getNumeral(Math.floor(num/10), 'X', 'L', 'C')
  num %= 10;

 
  str += getNumeral(num, 'I', 'V', 'X')

  return str;
}

convertToRoman(36);