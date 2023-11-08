const bodyParser = require("body-parser");
const PortModel = require("../models/port");
const RightModel = require("../models/right");
const LayoutModel = require("../models/layout");
const SwitchModel = require("../models/switch");
const UserModel = require("../models/user");

module.exports = {
	listPort: function(req, res, next){
		if(req.query.filter=='true'){
			const result = [];
			return res.send("ok");
		}
		else{
			PortModel.find({}, '-_id -__v -switch').populate([{path:"user", select:"username email"},{path:"right", select:"right"},{path:"layout", select:"layoutname"}]).then(function(port){
				console.log(port);
				return res.send(port);
			})
		}
	},

	addPort: function(req, res, next){
		const {
			portid,
			portname,
			rightid,
			layoutid,
			switchid
		} = req.body;
		RightModel.findOne({ id:rightid }).then(function(right){
			LayoutModel.findOne({ id: layoutid }).then(function(layout){
				SwitchModel.findOne({ id: switchid}).then(function(switch_info){
					UserModel.findOne({ username: "Nobody"}).then(function(user){
						const PortData = new PortModel({
							portid: portid,
							portname: portname,
							right: right._id,
							layout: layout._id,
							switch: switch_info._id,
							user: user._id,
							status: "DOWN"
						})
						PortData.save({
							alo: console.log(PortData)
						})
						layout.portlist.push(PortData._id);
						layout.save();
						console.log(layout)
					})
				})
			})	
		})	
		return res.send("Add port succeed");
	},

	editPort: function(req, res, next){
		const{
			portname,
			layoutname,
			username,
			status
		} = req.body;
		LayoutModel.findOne({ layoutname: layoutname }).then(function(layout){
			UserModel.findOne({ username: username }).then(function(user){
				PortModel.findOne({ portname:portname }).then(function(port){
					port.right = user.right._id;
					port.layout = layout._id;
					port.user = user._id;
					port.status = status;
					port.save();
				})
			})
		})
		return res.send("Edit port done");
	},

	deletePort: function(req, res, next){
		PortModel.deleteOne({
			portid: req.body.portid
		}).then(function(port){
			return res.send("Port removed")
		})
	}
}