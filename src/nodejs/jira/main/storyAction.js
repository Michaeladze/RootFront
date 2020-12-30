const inquirer = require('inquirer');
const child_process = require('child_process');
const menuData1 = ['Создать ветку', 'Показать описание задачи', 'Назначить на меня', 'Закрыть задачу в jira', '<----- Назад'];
const lib = require('./../create');


function storyAction(answers) {

    inquirer
        .prompt([{
            type: 'list',
            message: `Что делаем с задачей ${answers.value}?`,
            name: 'id',
            choices: [].concat(menuData1)
        }
        ])
        .then(a => {

            switch (a.id) {
                case menuData1[0]:
                    console.log(`Ветка feature/${answers.value} успешно создана`);
                    child_process.exec(`git checkout -b feature/${answers.value} develop `);
                    child_process.exec(`git push --set-upstream origin HEAD`);
                    child_process.exec(`git pull origin develop`);
                    break;
                case menuData1[1]:
                    console.log(`*************************************************************
*************************************************************
          ${answers.description}
*************************************************************
*************************************************************`);
                    storyAction(answers);
                    break;
                case menuData1[2]:
                    lib.requests.assigneeTaskTo(answers.value,()=>storyAction(answers));


                    break;
                case menuData1[3]:
                    lib.methods.requestClosetask(answers.value);
                    break;
                case menuData1[4]:
                    console.clear();
                    lib.methods.getTasks();
                    break;
            }

        });
}
//--------------------------
exports.storyAction = storyAction;
