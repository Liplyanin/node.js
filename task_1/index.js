#!/usr/bin/env node
const func = require('./encription')
const fs = require('fs');

const { Command } = require('commander');
const program = new Command();

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const allWorkInTerminal = (n, actionType) => {
    rl.question('input: ', (str) => {
        return console.log('output:', func.shifr(str, n, actionType)), allWorkInTerminal(n, actionType);
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
        rl.close();
    } else if ((actionType === 'encode' || actionType === 'decode') && +shiftValue) {

        if (program._optionValues.input && program._optionValues.output) {
            const inputPath = program._optionValues.input;
            const outputPath = program._optionValues.output;

            const inputTxt = fs.readFileSync(`./${inputPath}`, 'utf8').toString();
            const data = func.shifr(inputTxt, shiftValue, actionType);
            fs.appendFile(`./${outputPath}`, `${data} \n `, (err) => {
                if (err) console.log(err);
            });
            rl.close();
        } else if (program._optionValues.input) {
            const inputPath = program._optionValues.input;
            const inputTxt = fs.readFileSync(`./${inputPath}`, 'utf8').toString();
            const data = func.shifr(inputTxt, shiftValue, actionType);
            console.log(data)
            rl.close();

        } else if (program._optionValues.output) {
            const outputPath = program._optionValues.output;
            const funk = () =>{
                rl.question('input: ', (str) => {
                    const data =  func.shifr(str, shiftValue, actionType)
                    fs.appendFile(`./${outputPath}`, `${data} \n `, (err) => {
                        if (err) console.log(err);
                    }), funk();
                });
            }
            funk()


        } else {
            allWorkInTerminal(shiftValue, actionType)
        }

    } else if (! +shiftValue) {
        console.error(`error: option '-s, --shift <n>' argument should be a positive Number!`);
        rl.close();
    } else {
        console.error(`error: option '-a, --action <type>' argument should be only: 'encode' or 'decode' property!`);
        rl.close();
    }
}
catch (e) {
    console.error(e);
    rl.close();
}


