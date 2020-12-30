const child_process = require('child_process');
const lib= require('./../create')

const {log} = require("./../utils/log");
const request = require('request');
/*создание пр*/
function createPr( callback=()=>{}) {
    const data =  {
        method: 'POST',
        url: lib.utils.currentRepoLink(),
        strictSSL: false,
        auth: {
            username: global.auth.USERNAME,
            password:global.auth. PASSWORD
        },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: `{
    "title": "${lib.utils.currentBrunch(true)}",
    "description": "",
    "state": "OPEN",
    "open": true,
    "closed": false,
    "fromRef": {
        "id": "${lib.utils.currentBrunch(true)}"
    },
    "toRef": {
        "id": "develop"
    }
    
}`
    };

    child_process.execSync('git pull origin develop');
 const tmp=   child_process.execSync('git status -s').toString().trim().split('\n').filter(i=>!~i.indexOf('??')).filter(i=>!i.indexOf('.'));

 if(tmp.length){
     log('error',`Не закомиченные файлы`)
     console.log(tmp);
     console.log("");
     callback();
 }else{
     request(data, function (error,response) {
         if (error) throw new Error(error);
        log("info"," Pull request  успешно создан");

         callback();
     });
 }


}
//--------------------------
exports.createPr = createPr;
