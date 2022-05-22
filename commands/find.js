const fs = require('fs');
const path = require('path');
const {ext} = require('../config');
const chalk = require('chalk');

// 
function find_template(template_dir=""){
    const home = path.resolve(process.cwd(), template_dir)
    const files = fs.readdirSync(home);
    const template_files = [];

    files.forEach(function(file){
        const current_dir = path.join(home, file);
        if(fs.statSync(current_dir).isDirectory()){
            // do nothing for directories
        }else{
            if(current_dir.substr(-1 * (ext.length + 1)).toLowerCase() == `.${ext}`){
                template_files.push(file)
            }
        }
    })

    if(template_files.length < 1){
        console.log(
            chalk.yellow.bold("No template file found in the current directory")
        );
    }else if(template_files.length > 1){
        console.log(
            chalk.red.bold("You can only have one template file. Combine templates into one.")
        )
    }else{
        console.log(
            chalk.greenBright("Template file found: ")
        );
        console.log(
            chalk.cyanBright.bold(template_files[0])
        );
    }
}

module.exports = {
    find_template
}