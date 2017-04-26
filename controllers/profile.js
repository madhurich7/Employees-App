var mongoose = require('mongoose');
var Employee = require('../models/employee');

module.exports.profileRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    Employee
      .findById(req.payload._id)
      .exec(function(err, employee) {
        res.status(200).json(employee);
      });
  }

};