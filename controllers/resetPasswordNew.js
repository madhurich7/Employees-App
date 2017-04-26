var mongoose = require('mongoose');
var Employee = require('../models/employee');
var async = require('async');
var nodemailer = require('nodemailer');
var crypto = require('crypto');

module.exports.resetPasswordNew =  function(req, res) {
  async.waterfall([
    function(done) {
      Employee.findOne({ resetPasswordTokenNewEmp: req.params.ptoken, dl: req.body.dl},
       function(err, employee) {
        if (!employee) {
          //req.flash('error', 'Password reset token is invalid or has expired.');
          console.log('Password reset token has expired or the details entered are not valid');
          //return res.redirect('back');
        }

        employee.salt = crypto.randomBytes(16).toString('hex');
        employee.hash = crypto.pbkdf2Sync(req.body.confirmPassword, employee.salt, 1000, 64).toString('hex');
        employee.resetPasswordTokenNewEmp = undefined;
        employee.resetPasswordTokenNewEmpExpires = undefined;

        employee.save(function(err) {
       		 var token;
    		 token = employee.generateJwt();
    		 //res.redirect('/#/profile');//not working?
    		 console.log('token generated for new password change');
    		 done(err, employee);
        });
      });
    },
    function(employee, done) {
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
        subject: 'Your password has been changed for the account created by your admin',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + employee.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        //req.flash('success', 'Success! Your password has been changed.');
        console.log('Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    //res.redirect('/');
    if (err) return next(err);
  });
};