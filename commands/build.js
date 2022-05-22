const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const { ext } = require('../config');
const { saveCreatedItem, checkTemplate } = require('../utils')

// 
const tree = {};

// Get the depth of a file
function getDepth(file){
    let file_depth = (file.match(/\//g) || []).length
    let max_depth = parseInt(Object.keys(tree).slice(-1)[0])

    if(!tree[file_depth]){
        if(file_depth > max_depth + 1){
            file_depth = max_depth + 1;
            tree[file_depth] = [];
        }else{
            tree[file_depth] = [];
        }
    }
    return file_depth;
}

// Get the parent of a particular file
function getParent(file_depth){
    let name, parent, type;
    const parentTree = tree[`${file_depth - 1}`];

    if (parentTree){
        let parentT;
        for (let i=parentTree.length - 1; i>=0; i--){
            if(parentTree[i].type == "folder"){
                parentT = parentTree[i];
                break;
            }
        }
        if(parentT){
            let {name: n, parent: p, type: t} = parentT;
            name = n, parent = p, type = t;
        }else{
            const [_, otherParent] = getParent(file_depth - 1)
            if(otherParent){
                let {name: n, parent: p, type: t} = otherParent;
                name = n, parent = p, type = t;
            }else{
                return [null, null];
            }
        }
    }else{
        return [null, null]
    }
    return [parentTree, {name, parent, type}]
}

// Get the type of a file from it's name
function getType(file){
    return file.trim().endsWith(":") ? "folder" : "file";
}

// 
function getName(file){
    if(getType(file) == "folder"){
        return file.replace(/\//g, "").trim().slice(0, -1)
    }
    return file.replace(/\//g, "").trim();
}

// add new items to the tree variable. sorted by depth
function populateTree({files, parent}){

    for(let i = 0; i < files.length; i++){
        if(!files[i].trim()) continue;
        const file_depth = getDepth(files[i])

        const [pt, nParent] = getParent(file_depth)
        tree[file_depth].push({
            name: getName(files[i]),
            type: getType(files[i]),
            parent: pt ? `${nParent.parent}/${nParent.name}` : parent})
    }
}


// parse content of template file into a graph and stores in the tree variable above
function parseTemplateFile(template_file){
    try{
        const data = fs.readFileSync(template_file, 'utf8');
        const lines = data.split('\n');
    
        populateTree({parent: ".", files: lines});
    }catch(error){
        console.log(
            chalk.redBright(error.message)
        )
    }
}


// create all file(s) and folder(s) from name specified in template
function createFileFolder(output_dir){
    try{
        if(!fs.existsSync(output_dir)){
            fs.mkdirSync(output_dir, { recursive: true })
        }
        const treeValues = Object.values(tree)
        treeValues.forEach(function(depth){
            depth.forEach(function(depthFile){
                let fullName = path.resolve(output_dir, depthFile.parent, depthFile.name)
                try{
                    if(depthFile.type == "folder"){
                        fs.mkdirSync(fullName);
                    }else{
                        fs.writeFileSync(fullName, "");
                    }
                }catch(error){
                    console.log(
                        chalk.redBright(error.message)
                    );
                }
            })
        })
        saveCreatedItem({key: output_dir, value: treeValues[0]})
    }catch(error){
        console.log(
            chalk.redBright(error.message)
        )
    }
}


// main function called from the terminal
async function build_template({output=".", template=`.${ext}`}){
    const home = process.cwd();
    const template_file = path.resolve(home, template);
    const output_dir = path.resolve(home, output);

    checkTemplate(template_file)
    parseTemplateFile(template_file);
    createFileFolder(output_dir)
}

module.exports = {
    build_template
}