#! /usr/bin/env node

const { program } = require('commander');
const {ext} = require('./config');

const { find_template } = require('./commands/find');
const { create_template } = require('./commands/create');
const { remove_template } = require('./commands/remove');
const { build_template } = require('./commands/build');
const { undo_template } = require('./commands/undo');

program
    .command("find [template_dir]")
    .description("Search for an existing template file in the current directory. Optionally specify a directory to search in.")
    .action(find_template);

program
    .command("create [template_name]")
    .description(`Creates a template file with the .${ext} extension. You can optionally create the template file with a name (named template file) by entering a name (without the .${ext}).\nNote that when you create a named template file, you must use the "-t" option when running the build command, specifying the full name of the template file.`)
    .action(create_template);

program
    .command("remove")
    .description(`Removes all .${ext} template file(s) in the current working directory.`)
    .action(remove_template);

program
    .command("build")
    .description("Build the boilerplate for your project in the current working directory as specified in template.")
    .option("-t, --template <template_dir>", "Specify the location of the template file if it doesn't exist in the current working directory.")
    .option("-o, --output <output_dir>", "Specify an output directory for the boilerplate.")
    .action(build_template);

program
    .command("undo")
    .description("Removes folder(s) and file(s) created after running build command.\nTo perform this action, navigate to the directory within which the file(s) and folder(s) were generated.")
    .action(undo_template)


program.parse()