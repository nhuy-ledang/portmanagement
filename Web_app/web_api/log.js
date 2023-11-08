const LogModel = require("../models/log");
module.exports = {
  listLog: function(req, res, next){
    LogModel.find({},'-_id -data -__v').then(function(log){
      return res.send(log);
    })
  },
}