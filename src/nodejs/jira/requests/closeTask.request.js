
const request = require('request');
/*создание пр*/
function closeTask(taskId, comment = '', callback=()=>{}) {
    const data = {
        method: 'POST',
        url: `https://sbtatlas.sigma.sbrf.ru/jira/rest/api/2/issue/${taskId}/transitions`,
        strictSSL: false,
        auth: {
            username: global.auth.USERNAME,
            password: global.auth.PASSWORD
        },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: `{"transition": {"id": "${5}"}, "update": {
        "comment": [
            {
                "add": {
                    "body": "${comment}"
                }
            }
        ]
    }}`
    };
    request(data, function (error) {
        if (error) throw new Error(error);
        callback()
    });
}
//--------------------------
exports.closeTask = closeTask;
