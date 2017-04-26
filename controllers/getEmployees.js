var mongoose = require('mongoose');
var Employee = require('../models/employee');

module.exports.employeeRead = function(req, res, next) {

   Employee.getEmployees(function(err, employees){
          if(err){
            console.log(err);
          }
          res.json(employees);
        });
};

module.exports.updateAuth = function(req, res, next){
/*  if(!req.payload._id){
     res.status(401).json({
      "message" : "Update can be done only by users and admins"
    });
  }*/
   // console.log("admin to update");
  
      var id = req.body.id;

     var data = {
      name: req.body.name,
      email: req.body.email

     };

     //to update employee
     Employee.updateEmployee(id, data, function(err, employee){
      if(err){
        console.log(err);
      }

     });   
};