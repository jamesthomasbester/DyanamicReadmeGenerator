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
    'Usage: ',
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
           generateREADME()
        }else if(answer == "no" || "No" || "N" || "n"){
            console.log("Okay closing console...")
            return;
        }
        readline.close();
    })  
}catch{
    console.log("creating README.md")
  generateREADME()
}

function generateREADME(){
    rl.question(questions[count], answer =>{
        if(count < questions.length){
            count++;
            answers.push(answer);
            generateREADME()
        }else{
            rl.close();
            console.log(answers);
            formater()
        }
    })
}

function formater(){
    var data = ""
    data = `#${answers[0]} \n newline hopefully ${answers[1]}`
    console.log(data);
    fs.writeFileSync('README.md', data);
}

