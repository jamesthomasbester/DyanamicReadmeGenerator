// dependencies
const inquirer = require('inquirer');
const fs = require('fs');
//A class to keep all the data consistant
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
    //formating the data from the questions into a format the we can use with .md
    FileBuilder(){
        this.title = `# ${this.title}\n`;
        this.screenshot = this.screenshot.map( element => `\n![App Screenshot](${element})\n`);
        if(this.ToC == 'yes'){
            this.ToC = ('\n## Table of Contents\n[Installation](#Installation)\n[Usage](#Usage)\n[licensing](#licensing)\n[contributing](#contributing)\n[tests](#tests)\n[questions](#questions)');
        }else{
            this.ToC = `\n`
        }
        
        this.installation = this.installation.map((element, index) => {
            if(index % 2 == 0){
                return ` ${element}\n`
            }else {
                return `\n\`\`\`bash  \n${element}\n\`\`\` `
            }
        })
        this.installation.unshift('\n## Installation\n');
        this.usage = this.usage.map((element, index) => {
            if(index % 2 == 0){
                return `\n${element}\n`
            }else {
                return `\n\`\`\`bash  \n${element}\n\`\`\` `
            }
        })
        this.usage.unshift('\n## Usage\n');
        this.license = this.license.map((element, index) => {
            if(index % 2 == 0){
                return `(${element})`
            }else {
                return `[${element}]\n`
            }
        })
        this.license.unshift('\n## Licensing\n');
        this.contributing = (`\n## Contributing\n${this.contributing}`);
        this.tests = this.tests.map((element, index) => {
            if(index % 2 == 0){
                return `${element}\n`
            }else {
                return `\n\`\`\`bash  \n${element}\n\`\`\``
            }
        });
        this.tests.unshift('\n## Tests\n');
        this.questions.unshift('\n## Questions\n');
        let fileContent = "";

        //joing all the strings
        fileContent = this.title + this.description + this.screenshot + this.ToC + this.installation + this.usage + this.license + this.contributing + this.tests + this.questions;
        fileContent.toString().replace(',', '');
        //writing data to file
        fs.writeFileSync('README.md', fileContent);
    }
}
//an array with all the questions
const questions = [
    `What is the Title of the project: `,
    `A description of thie project:`,
    `Path or url to a screenshot:`,
    `Table of Contents yes or no':`,
    `Installation description then bash install command seperated by commar ',':`,
    `Usage description then command seperated by commar ',':`,
    `Licensing for the project split license name then link by commar',':`,
    `State if you are open to contributions and what your requirements are for accepting them:`,
    `Any documentation regarding tests description then command split by commar:`,
    `Where to dirrect any questions or feedback add the email seperately via commar:`

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
        //asking the questions using count as the index of the question array to ask
        if(count < questions.length){
            inquirer.prompt([
                {
                    name: 'question',
                    message: questions[count]
                }
            ])
            .then( answer =>{
                //based on the index we are selecting which case to use to save data
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
                        document.ToC = answer.question;
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
                        document.contributing = answer.question;
                        break;
                    case 8:
                        document.tests = answer.question.split(',');
                        break;
                    case 9:
                        document.questions = answer.question.split(',');
                        break;
                }
                count++;
                //looping back the start of the function to ask next question
                askQuesions()
            })
        }else{
            console.log(document);
            //when count is equal to the question array length we move onto formatting the data.
            document.FileBuilder();
            console.log(document)
        }  
    }
}
//starting the script by calling the main function
input();
