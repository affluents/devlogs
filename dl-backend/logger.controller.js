const saveDoc = require('./database.controller').saveDoc;
const getDocs = require('./database.controller').getDocs;

function saveLog(logObj) {
    const obj = {};
    obj.title = logObj.title;
    obj.exc = logObj.exc;
    obj.severity = logObj.severity;
    var d = new Date();
    obj.date = d;
    saveDoc(obj);
}

function getLogs(callback) {
    getDocs("logs", callback);
}

module.exports = {
    saveLog: saveLog,
    getLogs: getLogs
}