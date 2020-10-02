#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const func = (n) => {
      rl.question('input: ', (str) => {
          return console.log('output: ', shifr(str, n)), func(n);
        });
  }


program
    .storeOptionsAsProperties(false)
    .option('-a,--action <type>')         // -a, --action : кодирование / декодирование действия
    .option('-s, --shift <n>')     // -s, --shift : сдвиг


// -i, --input : входной файл
// -o, --output : выходной файл


program.parse(process.argv);
const actionType = program._optionValues.action;
const shiftValue = program._optionValues.shift;

try {
    if (!actionType && !shiftValue) {
        throw new Error()
    } else if (actionType === 'encode' || actionType === 'decode') {
        if (+shiftValue) {
            console.log(program._optionValues);
            func(shiftValue)
        } else {
            console.error(`error: option '-s, --shift <n>' argument should be a Number!`);
        }

        // console.log(program.opts());
    } else {
        console.error(`error: option '-a, --action <type>' argument should be only: 'encode' or 'decode' property!`);
    }
}
catch {
    console.error(`error: '-a,--action <type>' and '-s, --shift <n>' parameters with arguments are required!`);
}


// console.log(program.action())



function shifr ( str, n )  {
    const alfUp = ['A','B','C','D','E','F','G','H','I','J','K','L','M',
        'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    const alfLower = ['a','b','c','d','e','f','g','h','i','j','k','l',
        'm','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  
    let result = ''; 
    for (let i = 0; i < str.length; i++) {
      const el = str[i];
      let index = alfUp.indexOf(el);
      let arrOfLaters = alfUp;
      
      if(index === -1){
          index = alfLower.indexOf(el);    
          arrOfLaters = alfLower;
      }
      if (index === -1){
          result += el;
          continue;
      }
      let j = +n;
  
      function getNewIndex (){
        if(j > 25){
            j -= 26;
            return getNewIndex()
        }else if( j < 0){
            j += 26;
            return getNewIndex()
        }else{
            let newIndex = index + j;
            newIndex > 25 ? newIndex -= 26 : newIndex;
            return newIndex;
        }
      }
      const newIndex = getNewIndex();
      result += arrOfLaters[newIndex];
    }
    return result;
}