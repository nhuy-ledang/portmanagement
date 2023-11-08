const bodyParser = require("body-parser");
const SchedulerModel = require("../models/scheduler");
const PortModel = require("../models/port");
const {DateTime}  = require('luxon');
const cron = require('node-cron');

const scanAPI = "http://"+process.env.SERVER_IP+":"+process.env.SERVER_PORT+"/api/scheduler"
function scan(){
	var myHeaders = new Headers();
	myHeaders.append("Authorization", process.env.LOCAL_TOKEN);
	myHeaders.append("Content-Type", "application/json");
	var requestOptions = {
	  method: 'GET',
	  headers: myHeaders,
	  redirect: 'follow'
	};
	fetch(scanAPI, requestOptions)
}
const task = cron.schedule('* * * * *', ()=>{
	const time = DateTime.local().toLocaleString(DateTime.DATETIME_FULL);
	console.log(time);
	SchedulerModel.find({
		datetime: time
	}).then(function(scheduler){
		scheduler.forEach( scheduler =>{
		})
		console.log(scheduler)
		SchedulerModel.deleteMany({
			datetime: time
		}).then(function(){
			console.log("Deleted")
			scan();
		})
	})
	
},{
	scheduled:false
})
module.exports = {

	listScheduler: function(req, res, next){
		SchedulerModel.find({},'-_id').populate({path:'port', select:'-_id layout portname user', 
			populate: {path:'user', select:'username'}, 
			populate: {path:'layout', select:'layoutname'}})
		.then(function(scheduler){
			// console.log(scheduler);
			if(!scheduler.length){
				console.log("Stop cron")
				task.stop();
			}
			return res.send(scheduler);
		})
	},

	addScheduler: function(req, res, next){
		const {
		    datetime,
		    portname,
		    status
		  } = req.body;
		var nextid = 0;
		SchedulerModel.findOne({}, { id: 1 }).sort({ id: -1 }).then(function(id){
			if(id){
				nextid = id.id + 1;
			}
			else{
				nextid = 1;
			}
			PortModel.findOne({ portname:portname }).then(function(port){
				port.status = status;
				port.save();
				const SchedulerData = new SchedulerModel({
					id: nextid,
					datetime: DateTime.local().toLocaleString(DateTime.DATETIME_FULL),
				    port: port._id
				});
				SchedulerData.save({
				alo: console.log("User save done")
				})
				task.start();
				return res.send("Add scheduler succeed");
			})
		})
	},

	deleteScheduler: async function(req, res, next){
		SchedulerModel.deleteOne({
			id: req.body.id
		}).then(function(){
			SchedulerModel.find({}).then(function(scheduler){
				console.log(scheduler)
				if(!scheduler.length){
					console.log("Stop cron")
					task.stop();
				}
				return res.send("Scheduler removed")
			})
		})
	}
}