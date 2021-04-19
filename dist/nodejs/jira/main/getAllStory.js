"use strict";
var inquirer = require('inquirer');
var lib = require('./../create');
//--------------------------------------------------------------
var menu = ["[FE]", "[BackEnd]", "[QA]", "[DI]", "All"];
function resultGetTasks(data) {
    var USEREALNAME = ' на вас нет задач';
    var USERNAME = global.auth.USERNAME;
    var r = data.map(function (i, idx) {
        (!i.fields.assignee) && (i.fields.assignee = {
            displayName: 'не присвоен',
            name: ''
        });
        (USERNAME === i.fields.assignee.name) && (USEREALNAME = i.fields.assignee.displayName);
        delete i.expand;
        delete i.self;
        delete i.id;
        i.name = (idx + 1) + ")" + i.key + "/" + i.fields.summary + " ";
        i.name = (i.name + ' '.repeat(1000)).slice(0, 130);
        i.name += "" + ((USERNAME === i.fields.assignee.name) ? '!!!Я!!!!' : i.fields.assignee.displayName);
        i.value = i.key;
        i.description = i.fields.description;
        delete i.key;
        i.created = new Date(i.fields.created);
        delete i.fields;
        return i;
    }).sort(function (a, b) { return (a.value > b.value ? -1 : 1); });
    inquirer
        .prompt([{
            type: 'list',
            message: 'Select1 toppings',
            name: 'id',
            choices: [
                new inquirer.Separator(" = \u0417\u0410\u0414\u0410\u0427\u0418 ( " + USEREALNAME + ") = ")
            ].concat(r).concat(['<----- Назад'])
        }
    ])
        .then(function (answers) {
        var tst = r.find(function (i) { return i.value === answers.id; });
        tst ? lib.methods.storyAction(tst) : lib.methods.selectTask();
    });
}
function getTasks(all) {
    if (all === void 0) { all = false; }
    console.clear();
    if (all) {
        inquirer
            .prompt([{
                type: 'list',
                message: 'Select1 toppings',
                name: 'id',
                choices: menu
            }
        ])
            .then(function (answers) {
            lib.methods.getStory(answers.id, resultGetTasks);
        });
    }
    else {
        lib.methods.getStory("All", resultGetTasks);
    }
}
exports.getTasks = getTasks;
