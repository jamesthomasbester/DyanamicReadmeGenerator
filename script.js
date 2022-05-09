//my imports to read file and to take user input
const fs = require('fs');
const inquirer = require('inquirer');
//empty array
const format = [

];
// string that will use later
var template;
//array of questions
const questions = [
    `What is the Title of the project: `,
    `A description of thie project:`,
    `Path or url to a screenshot:`,
    `Link to a live demo of the project: `,
    `Bash command to install project:`,
    `Any documentation name and link split by commar:`,
    ` Any features that you want to highlight`,
    `Deployment (terminal syntax used):`,
    `Where should any feedback be directed:`,
    `Any Acknowledgements name and link split by commar:`
];
//decided to make an object it as an object to clean up code, and for potentional future use
const main = {
    //initial input using inquirer to give multiple console options
    init: () => {
        console.log('-------------------README.md Generator-------------------')
        inquirer.prompt([
            {
                type: 'list',
                name: 'intro',
                message: 'do you want to create a readme or view readme',
                choices: ['Create README.md based on pre-made template', 'View current README.md', 'Quit']
            }
        ])
        .then( answer =>{
            if(answer.intro == "Create README.md based on pre-made template"){
                main.fileCheck(1);
            }else if(answer.intro == "View current README.md") {
                main.fileCheck(2);
            }else if(answer.intro == "Quit"){
                process.exit();
            }else{
                console.error('An Error occured closing terminal.');
                process.exit();
            }
        })
    },
    //checking if a readme file already exists with a try / catch
    fileCheck: (option) => {
        try{
            let file = fs.readFileSync('README.md', {encoding: 'utf8'});
            if(option == 1){
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'file',
                        message: 'README was already found, do you want to overwrite it?',
                        choices: ['Yes', 'No']
                    }
                ])
                .then( answer =>{
                    if(answer.file == 'Yes'){
                        console.log('Okay overwriting README.md');
                        main.premade();
                    }else if(answer.file == 'No'){
                        console.log('Okay closing terminal');
                        process.exit();
                    }
                })
            }
            else if(option == 2){
                console.log('\x1b[32m', file, '\x1b[0m');
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'noFile',
                        message: 'Do you want to make any changes to the README.md?',
                        choices: ['Yes', 'No']
                    }
                ])
                .then( answer =>{
                    if(answer.noFile == 'Yes'){
                        main.premade();
                    }else if(answer.noFile == 'No'){
                        console.log('Okay closing terminal')
                        process.exit();
                    }
                })
            }
        }catch{
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'noFile',
                    message: 'No README.md was found would you like to create one?',
                    choices: ['Yes', 'No']
                }
            ])
            .then( answer =>{
                if(answer.noFile == 'Yes'){
                    main.premade();
                }else if(answer.noFile == 'No'){
                    console.log('Okay closing terminal')
                    process.exit();
                }
            })
        }
    },
    // looping through the question array and printing to console for each
    premade: () => {
        let count = 0;
        function loop() {
            if(count < questions.length){
                inquirer.prompt([
                    {
                        name: 'question',
                        message: questions[count]
                    }
                ])
                .then( answer => {
                    count++;
                    format.push(answer.question);
                    loop();
                })
            }else{
                // when the loop has reached the length of the array we move to the next function
                main.formater();
                main.writer(template)
            }
        }
        loop();
    },
    // i was going to allow the user to create their own template, didn't have enough time.
    custom: () => {
        // TODO add custom code
    },
    //formating the input data so .md can read it
    formater: (order) => {
        var title = (title, description, option) =>{
            if(demo =="na" ){
                return
            }else{
                return(
                `# ${title}
                \n${description}\n`);
            }

        }
        var demo = (demo, options) => {
            if(demo =="na" ){
                return
            }else{
                return(`## Demo \n${demo}`)
            }
            
        }
        var installation = (installation, option) =>{
            if(demo =="na" ){
                return
            }else{
                return(
                `## Installation \n\`\`\`bash
                ${installation}\n\`\`\`\n`);
            }

        }
        var features = (input, options) =>{
            if(demo =="na" ){
                return
            }else{
                return(
                `## Features 
                \n${input} \n`
            )
            }

        }
        var deployment = (input, options) =>{
            if(demo =="na" ){
                return
            }else{
                return(
                `## Deployment \n\`\`\`bash
                ${input}\n\`\`\`\n`
            )
            }

        }
        var screenshot = (path, options) => {
            if(demo =="na" ){
                return
            }else{
                return(
                `## Screenshots 
                \n![App Screenshot](${path})\n`
            )
            }

        }
        var documentation = (link, name, option) =>{
            if(demo =="na" ){
                return
            }else{
                return(
                `## Documentation 
                \n[${link}](${link})\n`
            )
            }

        }
        var feedback = (input) =>{
            if(demo =="na" ){
                return
            }else{
                return(
                `## Feedback 
                \n${input}`
            )
            }

        }
        template = title(format[0], format[1]) + screenshot(format[2])
         + demo(format[3]) + installation(format[4]) + documentation(format[5]) 
         + features(format[6]) + deployment(format[7]) + feedback(format[8]);
         main.writer(template);
    },
    //finally writing the infomation given to file.
    writer: (option) => {
        console.log(option)
        fs.writeFileSync('README.md', option);
    }
}

//calling the main function to start it all
main.init()
