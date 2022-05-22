const readline = require('readline')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const conf = require('conf')
const store = new conf()
const { ext } = require('./config')

// Keeps a history of all folder(s) and file(s) created. Used for undoing build
function saveCreatedItem({key, value}){
    store.set(key, value)
    return true;
}

// Retrieve list of files and folders created in order to perform undo operation
function retrieveCreatedItem(key){
    const folderList = store.get(key);
    if(!folderList){
        console.log(
            chalk.yellowBright.bold("Unknown folder. Navigate to folder containing generated file(s) and folder(s)")
        );
        process.exit(1)
    }else{
        return folderList;
    }
}

// Clear the list of files and folders created after successful undo
function clearCreatedItem(key){
    store.delete(key)
}


// Checks to ensure inputed template file exists and is of the right extension
function checkTemplate(template_file){
    if(template_file.split('.').slice(-1)[0] !== `${ext}`){
        console.log(
            chalk.redBright("Template is not a"),
            chalk.redBright.bold(`.${ext}`),
            chalk.redBright("file type")
        );
        process.exit(1);
    }

    if(!fs.existsSync(template_file)){
        console.log(
            chalk.redBright("You have no Template at: "),
            chalk.cyanBright.bold(template_file)
        );
        console.log(
            "run", chalk.blueBright.bold('egusi create'), "to create one"
        );
        process.exit(1);
    }
}



//
function userPrompt(message){
    let response = false;
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    rl.question(message, function(input){
        if (input.match(/^y(es)?$/i)) response = true;
    })
    return response;
}

module.exports = {
    userPrompt,
    saveCreatedItem,
    retrieveCreatedItem,
    clearCreatedItem,
    checkTemplate,
}