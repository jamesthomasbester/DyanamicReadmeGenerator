const inquirer = require('inquirer');
const fs = require('fs');


class ReadMe{
    constructor({title, description, screenshot, ToC, installation, usage, license, contributing, tests, questions}){
        this.title = title;
        this.description = description;
        this.screenshot = screenshot;
        this.ToC = ToC;
        this.installation = installation;
        this.usage = usage;
        this.license = license;
        this.contributing = contributing;
        this.tests = tests;
        this.questions = questions;
    }

    FileBuilder(){
        this.title = `# ${this.title}`;
        this.screenshot = this.screenshot.map( element => `![App Screenshot](${element})`);
        this.ToC = this.ToC.map( (element, index) => `${index} - ${element}`);
        this.installation = this.installation.map((element, index) => {
            if(index % 2 == 0){
                return ` ${element}`
            }else {
                return ` \`\`\`bash  \n${element} `
            }
        })
        
    }
}

const questions = [
    `What is the Title of the project: `,
    `A description of thie project:`,
    `Path or url to a screenshot:`,
    `Table of Contents split by a commar ',':`,
    `Installation description then bash install command seperated by commar ',':`,
    `Usage language then command seperated by commar ',':`,
    `Licensing for the project if multiple split by commar ',':`,
    `State if you are open to contributions and what your requirements are for accepting them:`,
    `Any documentation regarding tests split by commar:`,
    `Where to dirrect any questions or feedback:`

];

function input(){
    const document = new ReadMe({})
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
            askQuesions()
        }else if(answer.intro == "View current README.md") {
            console.log(fs.readFileSync('README.md', {encoding: 'utf8'}));
        }else if(answer.intro == "Quit"){
            
        }else{
            console.error('An Error occured closing terminal.');
            process.exit();
        }
    })
    let count = 0;
    function askQuesions(){
        if(count < questions.length){
            inquirer.prompt([
                {
                    name: 'question',
                    message: questions[count]
                }
            ])
            .then( answer =>{
                switch(count){
                    case 0:
                        document.title = answer.question;
                        break;
                    case 1:
                        document.description = answer.question;
                        break;
                    case 2:
                        document.screenshot = answer.question.split(',');
                        break;
                    case 3:
                        document.ToC = answer.question.split(',');
                        break;
                    case 4:
                        document.installation = answer.question.split(',');
                        break;
                    case 5:
                        document.usage = answer.question.split(',');
                        break;
                    case 6:
                        document.license = answer.question.split(',');
                        break;
                    case 7:
                        document.contributing = answer.question.split(',');
                        break;
                    case 8:
                        document.tests = answer.question.split(',');
                        break;
                    case 9:
                        document.questions = answer.question.split(',');
                        break;
                }
                count++;
                askQuesions()
            })
        }else{
            console.log(document);
            document.FileBuilder();
            console.log(document)
            
        }
        
    }
    
    
}

input();