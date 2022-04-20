const fs = require('fs');
const readline = require('readline');
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
    `       
            |      1. What is the Title of the project: `,
    `       
            |      2. A description of thie project: `,
    `       
            |      3. Path or url to a screenshot: `,
    `       
            |      4. Link to a live demo of the project: `,
    `       
            |      5. Bash command to install project: `,
    `
            |      6. Any documentation name and link split by commar: `,
    `
            |      7. Any features that you want to highlight`,
    `
            |      8. Deployment (terminal syntax used): `,
    `
            |      9. Where should any feedback be directed: `,
    `       
            |      10. Any Acknowledgements name and link split by commar: `
];

const question = (input) =>{
    let data;
    rl.question(input, answer => data = answer)
    rl.close();
    return data;
}

console.log(Object.entries(answers))

const main = {
    init: () => {

        rl.question(
            `
            -------------------README.md Generator-------------------\n
            |        Please select an option from the below         |\n
            |      1. create README.md based on pre-made template   |\n
            |      2. create your own README.md template            |\n
            ---------------------------------------------------------\n
            input: `,
            answer => {
                if(answer == '1'){
                    main.fileCheck(1);
                }else if( answer == '2'){
                    main.fileCheck(2);
                }
            }
        )
    },
    fileCheck: (option) => {
        try{
            fs.readFileSync('README.md', {encoding: 'utf8'});
            rl.question(`
            | README was already found, do you want to overwrite it? |\n
            (yes or no): `, answer =>{
                if(answer == "yes" || "y"){
                    console.log(`
            | Okay overwriting README.md`);
                    if(option == '1'){
                        main.premade()
                    }else{
                        main.custom()
                    }
                }else if(answer == "no" || "n"){
                    console.log(`
            | Okay closing console...`);
                    return;  
                }
            })  
        }catch{
            console.log("creating README.md");
            if(option == '1'){
                console.log('premade')
                main.premade()
            }else{
                console.log('custom')
                main.custom()
            }
        }
    },
    premade: () => {
        let count = 0;
        function loop() {
            if(count < questions.length){
                rl.question(questions[count], answer => {
                    count++;
                    format.push(answer);
                    loop();
                })
            }else{
                main.formater();
                main.writer(template)
            }
        }
        loop();
    },
    custom: () => {

    },
    formater: () => {
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
                `## Features \n
                ${input} \n`
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
         + features(format[6]) + deployment(format[7]) +feedback(format[8]);
    
    },
    writer: (option) => {
        fs.writeFileSync('README.md', option)
    }

}

main.init()






// try{
//     fs.readFileSync('README.md', {encoding: 'utf8'});
//     ral.question('README was already found, do you want to overwrite it? ', answer =>{
//         if(answer == "yes" || "Yes" || "Y" || "y"){
//             console.log("Okay overwriting README.md");
//             userInput();
//         }else if(answer == "no" || "No" || "N" || "n"){
//             console.log("Okay closing console...");
//             rl.close();
//             return;  
//         }
//     })  
// }catch{
//     console.log("creating README.md")
//     userInput()
// }



// function userInput(){
//     rl.question('do you want to use the default template?', answer =>{
//         if(answer == "yes"){
//             dataColecter();
//         }else{
//             rl.question(`the options are name (1), Description()`, answer =>{
//                 dataColecter();
//             })
//         }
//     });
//     function dataColecter(){
//         rl.question(questions[count], answer =>{
//             if(count < questions.length){
//                 count++;
//                 answers.push(answer);
//                 dataColecter()
//             }else{
//                 rl.close();
//                 console.log(answers);
//                 formater()
//             }
//         })
//     }
// }

// function formater(){

    // var title = (title, description, option) =>{
    //     return(
    //     `# ${title}
    //     \n${description}\n`);
    // }
    // var demo = (demo, options) => {
    //     return(`## Demo \n${demo}`)
    // }
    // var installation = (installation, option) =>{
    //     return(
    //     `## Installation \n\`\`\`bash
    //     ${installation}\n\`\`\`\n`);
    // }
    // var runLocally = (code, options) =>{
    //     return(
    //         ``
    //     )
    // }
    // var deployment = (deployment, options) =>{
    //     return(
    //         `## Deployment \n\`\`\`bash
    //         ${deployment}\n\`\`\`\n`
    //     )
    // }
    // var screenshot = (path, options) => {
    //     return(
    //         `## Screenshots 
    //     \n${path.forEach(element => {
    //         return `![App Screenshot](${element})\n`
    //     })})`
    //     )
    // }
    // var documentation = (doc, link, option) =>{
    //     return(
    //         `[${doc}](${link})`
    //     )
    // }

    // let data = title(answers[0], answers[1]) + screenshot() + installation(answers[2]) + deployment(answers[3]) + documentation();

//     console.log(data);
//     fs.writeFileSync('README.md', data);
// }

