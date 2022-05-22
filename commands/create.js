const fs = require('fs');
const path = require('path');
const {ext} = require('../config');
const chalk = require('chalk');


function create_template(template_name=""){
    const home = path.resolve(process.cwd());
    const files = fs.readdirSync(home);
    let template_exist;

    files.find(function(file){
        const current_dir = path.join(home, file);
        if(fs.statSync(current_dir).isFile()){
            if(current_dir.substr(-1 * (ext.length + 1)).toLowerCase() == `.${ext}`){
                template_exist = true;
                return true;
            }
        }
    })

    if(template_exist){
        console.log(
            chalk.yellow(`A template file already exists in this directory`)
        )
    }else{
        fs.writeFileSync(`${template_name}.${ext}`, "")
        console.log(
            chalk.greenBright("Template file successfully created")
        )
        console.log(
            chalk.cyanBright.bold(`${template_name}.${ext}`)
        )
    }
}

module.exports = {
    create_template
}