# Egusi

CLI tool to help you easily set up a folder(s) and file(s) structure for your project.

## Installation

```bash
npm install egusi
```

## Quick Start

You create a text file with the `.egusi` extension (the template file) specifying the hierarchy of the file(s) and folder(s) for your project. Egusi reads and parses the content of this template file and create the file(s) and folder(s) for you.

Egusi displays helpful error messages for unrecognised options. Always refer to the inbuilt help menu if not clear on available options and commands.

## Usage

### **Commands**

1. Find Template file

```shell
egusi find [template_dir]
```

This command searches for an existing template file in the current directory. You can specify a directory to search in, relative to the current path.

2. Create a Template file

```shell
egusi create [template_name]
```

Creates a template file with the **_.egusi_** extension. You can optionally create the template file with a name by entering a name (without the .egusi)

3. Remove Template file

```shell
egusi remove
```

Removes all **_.egusi_** template file(s) in the current working directory.

4. Build from Template file

```shell
egusi build
```

Build the boilerplate for your project in the current working directory as specified in template.

Options:

- Specify the location of the template file if it doesn't exist in the current working directory.

  > -t, --template

```shell
egusi build -t <template_dir>
```

- Specify an output directory for the boilerplate.

  > -o, --output

```shell
egusi build --output <output_dir>
```

OR

```shell
egusi build -t <template_dir> --output <output_dir>
```

> **Note:** Egusi will automatically create the output directory if it doesn't exist.

### **Creating the Template file**

The template file from which **egusi** parses the file(s) and folder(s) names to be created is simply a text file with a _.egusi_ file extension. An example template file is shown below:

```egusi
doe:
pi:
xmas:
/app:
/louie.txt
/pit:
//example.txt
//source:
///app.ts
partridges:
/count:
/location:
turtledoves:
```

#### **File(s) and Folder(s) Hierarchy**

In Egusi, we specify file(s) and folder(s) hierarchy using the concept of depth. This depth is specified by the number of forward slash ( **/** ) preceeding the file/folder name on a particular line.

Folder(s) and File(s) directly created in the output directory (the current working directory or the specified output) have a depth of zero and therefore have no **/** preceeding their file names.

Subfolders of these "depth zero" folder(s) have a depth of one and is therefore preceeded with a single **/**. Other subfolders of these folders have double forward slash **//** and so on.

> **Note:**
> As you already know, files cannot have "subfiles" or "subfolders" within them. Hence, a file of depth **n** should not have a file/folder of depth **n+1** directly beneath it. If a sub is placed directly under a file, Egusi automatically searches for the nearest parent folder in the hierarchy and places this sub (the subfile or subfolder) inside it.

For example, the template file below will create the "pit" folder inside of the "app" folder since a folder cannot exist within the "louie.txt" file and the "app" folder is the nearest parent in the hierarchy.

```egusi
xmas:
/app:
/louie.txt
//pit:
partridges:
```

> **Note:**
> As you know, while navigating filesystems, we can only move **n+1** or **n-1** at a time, where **n** is the depth of the current directory. We cannot navigate inside an empty directory by moving **n+2**. Instead, we first create a folder within the current directory and then move **n+1** into the new directory before performing another action.

**TLDR:** The direct parent of any file/folder must be of depth **n-1**, where **n** is the depth of the file/folder.

In essence, we therefore cannot have a folder structure as shown in the template file below:

```egusi
doe:
pi:
//bin:
////source:
partridges:
turtledoves:
```

Egusi will automatically convert the folder structure above into:

```egusi
doe:
pi:
/bin:
//source:
partridges:
turtledoves:
```

placing folder "bin" inside the nearest parent (which is folder "pi") and placing folder "source" inside its nearest parent (which is folder "bin").

Note that specifying the structure below, will result in a modified template similar to that shown above.

```egusi
doe:
pi:
//bin:
partridges:
////source:
turtledoves:
```

This is because, the nearest parent of folder "source" is still "bin" and not "partridges".

> To avoid any confusion with these scenarios, only move n+1 or n-1 in the filesystem

#### **Folder Naming**

To create a folder from the template, write it's name followed by a colon ( **:** ) withouth whitespace between name and column.

#### **File Naming**

To create a file from the template, write it's full name(including the extension) **without** adding a colon ( **:** ) to the end of the name and line.

## FAQ

### **Why wasn't JSON file types used to define template?**

Making use of the standard format of a JSON file type would require that every created folder has either a file or folder within it as we cannot have keys without values in JSON.

### **Can the template be a regular text file?**

Future release would have functionality to allow users specify any text file type.

## Coming Updates

- Ability to populate created files with data from template.
- Populate created files from external data source.
- Ability to specify delimiter used for resolving file/folder depth.
- Entering comments in template file.

Don't Forget to leave a star\* on GitHub
