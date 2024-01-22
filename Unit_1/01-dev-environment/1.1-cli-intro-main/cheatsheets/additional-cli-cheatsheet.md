# Terminal Cheatsheet

* Instructive videos: [WDI Terminal](https://www.youtube.com/playlist?list=PLdnONIhPScSToZztXRHyKZTQEsE30luMx)

## Basic Commands

| Command | Action |
| ----------- | ---------- |
| **pwd** | print working directory |
| **ls** | list content of current directory |
| **ls -a** | list content of current directory, including hidden files |
| **ls -l** | list content of current directory with extra details |
| **man** | manual |
| **cd child-directory** | change directory |
| **cd ..** | parent directory |
| **cd** ~ | home directory |
| **mkdir** [_name_] | create a directory |
| **touch** [_name.ext_] | create a file - will not overwrite a file if it exists |
| **open** [_name.ext_] | opens file |
| **clear** | empties terminal screen |
| **cat** [_name.ext_] | displays content of file in bash (terminal) |
| **mv** [-options] [_path/to/file_] [_path/to/directory_] | move file to specified location|
| **mv** [-options] [_path/to/file_] [_new name_] | renames file or directory |
| **cp** [_path/to/file_] [_path/to/directory_] | copies files to specified directory or file name |
| **cp -r** [_path/to/file_] [_path/to/directory_] | copies files and folders to specified directory or file name |
| **rm** [_path/to/file_] | removes file PERMANENTLY! |
| **rm -r** [_path/to/directory_]| removes directory PERMANENTLY! |
| **rmdir** |  removes empty directory PERMANENTLY! |
| [_name of program_] [_arguments_] | start a program (example: atom [_path/to/file_]), node [_path/to/file_] ...) |
| **Ctrl + C** | abort a program that is currently active in the terminal |
| **Ctrl + A** | jump to beginning of line |
| **Ctrl + E** | jump to end of line |
| **Ctrl + K** | clear the screen |
| **tab** | autocomplete |
| **arrow up** | fill line with previously entered command |
| **arrow left/right** | jump to next/previous word |
| **q** | end view of text in terminal (with some programs/views) |
| **history** |  see a list of previously typed commands |



## Git Commands

| Command | Action |
| ----------- | ---------- |
| **git status** | get current status for repo |
| **git init** | initialize a current folder as a repo, i.e. start tracking changes |
| **git clone** [_link_] | makes copied remote repo a new local repo |
| **git add** [_path/to/file_] | stage file |
| **git commit -m** [_"message"_] | commit changes and include a message describing commit |
| **git log** | display timeline |
| **git diff** [_path/to/file_] | show tracked but unstaged changes |
| **git push origin master** | send changes to remote repository (push to gitHub) |
| **git pull upstream master** | get latest changes from a remote repository |

## NPM Commands

| Command | Action |
| ----------- | ---------- |
| **npm init** | initialize a directory with package.json file for saving dependencies |
| **npm install** [_package-name_] | install a package |
| **npm i** [_package-name_] | install a package |
| **npm install** [_package-name_] **--save** | install a package and keep a record of it in package.json . `--save` is not needed/the default in versions 5.0.0 of NPM and up|
| **npm install** [_package-name_] **-g** | install a package as a global terminal command. You may need your administer password/ us `sudo` to compete a global install |
| **npm install** | read package.json and install all listed dependencies |

For reference: [List of bash commands via University of Washington's System and Software Tools course](http://courses.cs.washington.edu/courses/cse391/17wi/bash.html)
