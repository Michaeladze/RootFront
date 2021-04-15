"use strict";
var login = require('./main/login').login;
var selectTask = require('./main/selectTask').selectTask;
var getTasks = require('./main/getAllStory').getTasks;
var storyAction = require('./main/storyAction').storyAction;
var requestClosetask = require('./main/closeTask').requestClosetask;
var getStory = require('./requests/getStory.request').getStory;
var closeTask = require('./requests/closeTask.request').closeTask;
var assigneeTaskTo = require('./requests/assigneeTask.request').assigneeTaskTo;
var createPr = require('./requests/pr.request').createPr;
var _a = require('./utils/helpers'), currentBrunch = _a.currentBrunch, currentRepoLink = _a.currentRepoLink;
var spendTime = require("./requests/spendTime.request").spendTime;
exports.methods = {
    login: login,
    selectTask: selectTask,
    getTasks: getTasks,
    storyAction: storyAction,
    getStory: getStory,
    requestClosetask: requestClosetask
};
exports.requests = {
    closeTask: closeTask,
    createPr: createPr,
    assigneeTaskTo: assigneeTaskTo,
    spendTime: spendTime
};
exports.utils = {
    currentBrunch: currentBrunch,
    currentRepoLink: currentRepoLink
};
console.clear();
//  1) логинимся
login(function () { return selectTask(); });
