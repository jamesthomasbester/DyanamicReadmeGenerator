const fs = require('fs');
const readline = require('readline');
var count = 0;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
const answers =[]

const questions = [
    'Name: ',
    'Description: ',
    'Installation: ',
    'Deployment: ',
    'Contributing: ',
    'Framework: ',
    'Prequisites: ',
    'Contact: '
]

try{
    var readme = fs.readFileSync('README.md', {encoding: 'utf8'});
    readline.question('README was already found, do you want to overwrite it? ', answer =>{
        if(answer == "yes" || "Yes" || "Y" || "y"){
            console.log("Okay overwriting README.md")
           userInput()
        }else if(answer == "no" || "No" || "N" || "n"){
            console.log("Okay closing console...")
            return;
        }
        readline.close();
    })  
}catch{
    console.log("creating README.md")
  userInput()
}

function userInput(){
    rl.question(questions[count], answer =>{
        if(count < questions.length){
            count++;
            answers.push(answer);
            userInput()
        }else{
            rl.close();
            console.log(answers);
            formater()
        }
    })
}

function formater(){

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
    var runLocally = (code, options) =>{
        return(
            ``
        )
    }
    var deployment = (deployment, options) =>{
        return(
            `## Deployment \n\`\`\`bash
            ${deployment}\n\`\`\`\n}`
        )
    }
    var screenshot = (path, options) => {
        return(
            `## Screenshots 
        \n${path.forEach(element => {
            return `![App Screenshot](element)\n`
        })})`
        )
    }
    var documentation = (doc, link, option) =>{
        return(
            `
            `
        )
    }

    let data = title(answers[0], answers[1]) + installation(answers[2]) + deployment(answers[3]);

    console.log(data);
    fs.writeFileSync('README.md', data);
}

