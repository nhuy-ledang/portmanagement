const LogModel = require("../models/log");
const {DateTime}  = require('luxon');
module.exports = (req, res, next) => {
    var created = new Date().toLocaleString();
    const LogData = new LogModel({
        created: created,
        username: req.username,
        api: req.originalUrl,
        data: JSON.stringify(req.body)
      });
    LogData.save({
        alo: console.log("Save Done")
      });
    next();
}