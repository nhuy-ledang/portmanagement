const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const AdminModel = require("../models/admin");
const {DateTime}  = require('luxon');


const jwt = require("jsonwebtoken");
const url = require("url")

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const salt = bcrypt.genSaltSync(12);
module.exports = {
  listAdmin: function(req, res, next){
    AdminModel.find({},'-_id id adminname email fullname').then(function(admin){
      console.log(admin);
      return res.send(admin);
    })
  },
  addAdmin: function(req, res, next){
      const {
        adminname,
        password,
        email,
        fullname,
        confirmpassword
      } = req.body;
      var created = DateTime.now().toString();
      AdminModel.findOne({
        adminname: adminname
      })
        .then(function(admin) {
          if (admin) {
            console.log("Admin already");
            return res.send("Admin already");
          }
          if (adminname == "" || password == "") {
            console.log("Invailid adminname or password");
            return res.send("Invailid adminname or password");
          }
          if (password != confirmpassword) {
            console.log("Confirmpassword does not match");
            return res.send("Confirmpassword does not match");
          }
          const hash = bcrypt.hash(password, salt);
          console.log(hash);
          return bcrypt
            .hash(password, salt)
            .then(function(hashpassword) {
              const AdminData = new AdminModel({
                adminname: adminname,
                password: hashpassword,
                email: email,
                fullname: fullname,
                created: created
              });
              AdminData.save({
                alo: console.log("Save Done")
              });
              return res.send("Add admin succeed");
            });
        })
        .catch(function(err) {
          res.send("error: " + err);
        });
    },
  login: function(req, res, next) {
      const {
          adminname,
          password
      } = req.body;
      AdminModel.findOne({
          adminname: adminname
      }).then(function(admin) {
        if (adminname == "" || password == "") {
          return res.send("Invailid adminname or password");
        }
        if (!admin) {
          return res.send("Wrong adminname or password");
        }
        bcrypt.compare(password, admin.password, function(err, result) {
        if (result) {
             const token = jwt.sign(
              {
                adminname: admin.adminname,
                email: admin.email,
              },
              process.env.JWT_SECRET_KEY,
              { 
                expiresIn: '10h' // Thời gian sống của token: 1 giờ
              },
            );
            return res.send({"token": token})
        } 
        else {
          return res.send("Wrong adminname or password")
        }
        }
        )});
  },
  editAdmin: function(req,res, next){
    const{
      adminname,
      email,
      fullname
    } = req.body;
    AdminModel.findOne({
      adminname: adminname
    }).then(function(admin){
      var created = DateTime.now().toString();
      if (email == "" || fullname == "") {
          return res.send("Invailid input");
      }
      admin.email = email;
      admin.fullname = fullname;
      admin.created = created;
      admin.save();
      return res.send("Edit admin done")
    })
  },
  deleteAdmin: function(req,res, next){
    const{
      adminname,
    } = req.body;
    AdminModel.deleteOne({
      adminname: adminname
    }).then(function(admin){
      return res.send("Admin removed")
    })
  }
  
}
