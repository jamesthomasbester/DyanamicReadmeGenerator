const fs = require('fs');
const readline = require('readline');
const inquirer = require('inquirer');
const { writer } = require('repl');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const answers = {
    title: '1',
    description: '2',
    screenshot: '',
    demo: '',
    installation: '',
    documentation: '',
    features: '',
    deployment: '',
    Feedback: '',
    acknowledgements: '',

};

const format = [

];

var template;

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

const main = {
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
                // rl.question(questions[count], answer => {
                //     count++;
                //     format.push(answer);
                //     loop();
                // })
            }else{
                main.formater();
                main.writer(template)
            }
        }
        loop();
    },
    custom: () => {
        console.log(`\n 
            | listed below are the questions and the order           | `)
        questions.forEach(element =>{
            console.log(` 
            ${element.trim()}`)
        })
        rl.question(`
            | Return the order that you want the README.md           |
            | (e.g: 1,2,5,7,3,4) leave out numbers you dont want     |\n`, answer =>{
                formater(answer.split(','));
            })
    },
    formater: (order) => {
        var title = (title, description, option) =>{
            return(
            `# ${title}
            \n${description}\n`);
        }
        var demo = (demo, options) => {
            return(`## Demo \n${demo}`)
        }
        var installation = (installation, option) =>{
            return(
            `## Installation \n\`\`\`bash
            ${installation}\n\`\`\`\n`);
        }
        var features = (input, options) =>{
            return(
                `## Features 
                \n${input} \n`
            )
        }
        var deployment = (input, options) =>{
            return(
                `## Deployment \n\`\`\`bash
                ${input}\n\`\`\`\n`
            )
        }
        var screenshot = (path, options) => {
            return(
                `## Screenshots 
            \n![App Screenshot](${path})\n`
            )
        }
        var documentation = (link, option) =>{
            return(
                `## Documentation 
                \n[doc](${link})\n`
            )
        }
        var feedback = (input) =>{
            return(
                `## Feedback 
                \n${input}`
            )
        }
        template = title(format[0], format[1]) + screenshot(format[2])
         + demo(format[3]) + installation(format[4]) + documentation(format[5]) 
         + features(format[6]) + deployment(format[7]) + feedback(format[8]);
         main.writer(template);
    },
    writer: (option) => {
        console.log(option)
        fs.writeFileSync('README.md', option);
    }
}

main.init()
