const request = require('request');
const {log} = require('./../utils/log');
function assigneeTaskTo(task, callback = () => {
}, user = global.auth.USERNAME) {
    const data = {
        method: 'PUT',
        url: `https://sbtatlas.sigma.sbrf.ru/jira/rest/api/2/issue/${task}/assignee`,
        strictSSL: false,
        auth: {
            username: global.auth.USERNAME,
            password: global.auth.PASSWORD
        },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: `{
"name":"${user}"
}`
    };


    request(data, function (error) {
        if (error) throw new Error(error);
        log("info"," задача успешно назначена на вас");
        callback();
    });


}

//--------------------------
exports.assigneeTaskTo = assigneeTaskTo;
