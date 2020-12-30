const inquirer = require('inquirer');
const lib = require('./../create');
const {log} = require('./../utils/log');

//--------------------------
global.REQ = '';
const menuData = ['Мои задачи', 'Мои задачи в текущем спринте', 'Все задачи в текущем спринте', 'Закрыть текущую задачу', 'Забацать PullRequest', 'ВЫЙТИ'];


function selectTask() {
    inquirer
        .prompt([{
            type: 'list',
            message: 'Выберете действие(отображаются ТОЛЬКО поздадачи):',
            name: 'id',
            choices: [].concat(menuData)
        }
        ]).then(answers => {
        switch (answers.id) {
            case menuData[0]:

                global.REQ = 'assignee=currentuser() AND project=IRAPM AND resolution=Unresolved AND status not in (Closed , resolved)';

                lib.methods.getTasks();
                break;
            case menuData[1]:
                global.REQ = 'assignee=currentuser() AND project=IRAPM AND resolution=Unresolved AND status not in (Closed , resolved) AND (Sprint  in (openSprints()) )';
                lib.methods.getTasks();
                break;
            case menuData[2]:
                global.REQ = 'project=IRAPM AND resolution=Unresolved AND status not in (Closed , resolved) AND (Sprint  in (openSprints()) )';
                lib.methods.getTasks(true);
                break;
            case menuData[3]:
                lib.utils.currentBrunch() ?
                    lib.methods.requestClosetask(lib.utils.currentBrunch()) :
                    log('error', `
                    ${lib.utils.currentBrunch()}
                    !!!!!!!!!!!!! Не верный формат ветки в гите !!!!!!!!!!!!!!!!!!!`, lib.methods.selectTask);
                break;
            case menuData[4]:
                lib.utils.currentBrunch() ?
                    lib.requests.createPr(lib.methods.selectTask) :
                    log('error', '!!!!!!!!!!!!! Не верный формат ветки в гите !!!!!!!!!!!!!!!!!!!', lib.methods.selectTask);
                break;
            case menuData[5]:
                break;
        }
    });
};

//--------------------------


exports.selectTask = selectTask;
