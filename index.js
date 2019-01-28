#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const { exec } = require('child_process');

let results = {};
let pjson = {};


function fileExists(fileName) {
    try {
        return fs.statSync(fileName).isFile();
    } catch (err) {
        return false;
    }
}

function runScripts(script) {
    exec(pjson.scripts[script], (err, stdout, stderr) => {
        if (err) {
            console.log(chalk.red(`Não passou no ${script}`));
            return;
        }
        console.log(chalk.green(`Passou no ${script}`));
    });
}

clear();
console.log(
    chalk.yellow(
        figlet.textSync('teste-cli', { horizontalLayout: 'full' })
    )
);

if (fileExists('package.json')) {
    console.log(chalk.green('Found package.json!'));

    pjson = JSON.parse(fs.readFileSync('package.json'));
    
    let scripts = Object.keys(pjson.scripts)
    console.log(chalk.blue(`Current scripts configured on project: ${scripts}`));   

    scripts.forEach(runScripts);
}
