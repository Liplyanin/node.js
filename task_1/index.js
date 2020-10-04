#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();
const fs = require('fs');

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const func = (n, actionType) => {
    rl.question('input: ', (str) => {
        return console.log('output:', shifr(str, n, actionType)), func(n, actionType);
    });
}


program
    .storeOptionsAsProperties(false)
    .option('-a,--action <type>')         // -a, --action : кодирование / декодирование действия
    .option('-s, --shift <n>')              // -s, --shift : сдвиг
    .option('-i, --input <fileName>')     // -i, --input : входной файл
    .option('-o, --output <fileName>')     // -o, --output : выходной файл

program.parse(process.argv);
const actionType = program._optionValues.action;
const shiftValue = program._optionValues.shift;

try {
    if (!actionType || !shiftValue) {
        console.error(`error: '-a,--action <type>' and '-s, --shift <n>' parameters with arguments are required!`);
    } else if ((actionType === 'encode' || actionType === 'decode') && +shiftValue) {

        if (program._optionValues.input && program._optionValues.output) {
            const inputPath = program._optionValues.input;
            const outputPath = program._optionValues.output;

            const inputTxt = fs.readFileSync(`./${inputPath}`, 'utf8').toString();
            const data = shifr(inputTxt, shiftValue, actionType);
            fs.appendFile(`./${outputPath}`, `${data} \n `, (err) => {
                if (err) console.log(err);
            });
            rl.close();
        } else if (program._optionValues.input) {
            const inputPath = program._optionValues.input;
            const inputTxt = fs.readFileSync(`./${inputPath}`, 'utf8').toString();
            const data = shifr(inputTxt, shiftValue, actionType);
            console.log(data)
            rl.close();

        } else if (program._optionValues.output) {
            const outputPath = program._optionValues.output;
            const funk = () =>{
                rl.question('input: ', (str) => {
                    const data =  shifr(str, shiftValue, actionType)
                    fs.appendFile(`./${outputPath}`, `${data} \n `, (err) => {
                        if (err) console.log(err);
                    }), funk();
                });
            }
            funk()


        } else {
            func(shiftValue, actionType)
        }

    } else if (! +shiftValue) {
        console.error(`error: option '-s, --shift <n>' argument should be a positive Number!`);
    } else {
        console.error(`error: option '-a, --action <type>' argument should be only: 'encode' or 'decode' property!`);
    }
}
catch (e) {
    console.error(e);
}



function shifr(str, n, type) {
    const alfUp = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const alfLower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
        'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    let result = '';
    for (let i = 0; i < str.length; i++) {
        const el = str[i];
        let index = alfUp.indexOf(el);
        let arrOfLaters = alfUp;

        if (index === -1) {
            index = alfLower.indexOf(el);
            arrOfLaters = alfLower;
        }
        if (index === -1) {
            result += el;
            continue;
        }
        let j = 0;
        if (type === 'encode') {
            j += +n
        } else if (type === 'decode') {
            j -= +n
        }

        function getNewIndex() {
            if (j > 25) {
                j -= 26;
                return getNewIndex()
            } else if (j < 0) {
                j += 26;
                return getNewIndex()
            } else {
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
