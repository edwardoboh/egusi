const fs = require('fs');
const path = require('path');
const {ext} = require('../config');
const chalk = require('chalk');


function remove_template(){
    const home = path.resolve(process.cwd());
    const files = fs.readdirSync(home);
    let template_exist;

    files.forEach(function(file){
        const current_dir = path.join(home, file);
        if(fs.statSync(current_dir).isFile()){
            if(current_dir.substr(-1 * (ext.length + 1)).toLowerCase() == `.${ext}`){
                template_exist = true;
                fs.unlinkSync(current_dir)
            }
        }
    })

    if(template_exist){
        console.log(
            chalk.greenBright(`Successfully removed all template file(s) in current working directory`)
        )
    }else{
        console.log(
            `No template file(s) found in current working directory`
        )
    }
}

module.exports = {
    remove_template
}