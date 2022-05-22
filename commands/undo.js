const path = require('path')
const fs  = require('fs')
const chalk = require('chalk')

const { retrieveCreatedItem } = require('../utils')

// 
function undo_template(){
    const foldersPath = path.resolve(process.cwd())
    const createdFiles = retrieveCreatedItem(foldersPath) || [];
    
    try{
        createdFiles.forEach(function(file){
            const fullPath = path.resolve(process.cwd(), file.parent, file.name)
            fs.rmSync(fullPath, {recursive: true})
        })
        console.log(
            chalk.greenBright.bold("Successfully removed generated file(s) and folder(s)")
        );
    }catch(error){
        console.log(
            chalk.redBright(error.message)
        )
    }
}


module.exports = {
    undo_template
}