const {login} = require('./main/login');
const {selectTask} = require('./main/selectTask');
const {getTasks} = require('./main/getAllStory');
const {storyAction} = require('./main/storyAction');
const {requestClosetask} = require('./main/closeTask');

const {getStory} = require('./requests/getStory.request');
const {closeTask} = require('./requests/closeTask.request');
const {assigneeTaskTo} = require('./requests/assigneeTask.request');
const {createPr} = require('./requests/pr.request');
const {currentBrunch, currentRepoLink} = require('./utils/helpers');



const {spendTime} = require("./requests/spendTime.request");


exports.methods = {
    login,
    selectTask,
    getTasks,
    storyAction,
    getStory,
    requestClosetask
};
exports.requests = {
    closeTask,
    createPr,
    assigneeTaskTo,
    spendTime
};

exports.utils = {
    currentBrunch,
    currentRepoLink
};
console.clear();

//  1) логинимся
login(() => selectTask());


