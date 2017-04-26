var mongoose = require('mongoose');
var Employee = require('../models/employee');
var async = require('async');
var nodemailer = require('nodemailer');
var crypto = require('crypto');

module.exports.createNewEmployee = function(req, res, next){

  		  async.waterfall([
    		function(done) {
      		crypto.randomBytes(20, function(err, buf) {
	        var ptoken = buf.toString('hex');
	        done(err, ptoken);
      });
    },
    function(ptoken, done) {
    	  var employee = new Employee();

		  employee.name = req.body.name;
		  employee.email = req.body.email;

		  employee.resetPasswordTokenNewEmp = ptoken;
          employee.resetPasswordTokenNewEmpExpires = Date.now() + 3600000; // 1 hour

		  employee.setPassword(req.body.password);

		  employee.save(function(err) {
		  done(err, ptoken, employee);
		  console.log('employee is saved into the databse');
  		});
    },
    function(ptoken, employee, done) {
      var smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'SendGrid',
        auth: {
          user: 'madhuri19',
          pass: 'Madhuri@123'
        }
      });
      var mailOptions = {
        to: employee.email,
        from: 'madhurichinthakindi332@gmail.com',
        subject: 'Your Temporary account has been created',
        text: 'As per your request your Admin has created an account for you with a temporary password.\n\n' +
          'Please click on the following link, or paste this into your browser and reset your account with a new password:\n\n' +
          'http://' + req.headers.host + '#/api/reset/newEmployee/' + ptoken + '\n\n' +
          'Name: ' + req.body.name +'\n\n'+
          'Email: ' + req.body.email +'\n\n'+

          'If you did not request this, please ignore this email and your account will be removed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        //req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        console.log('email sent to new employee created');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    //res.redirect('/forgot');
  });
	

};