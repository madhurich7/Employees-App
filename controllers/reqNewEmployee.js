var mongoose = require('mongoose');
var Employee = require('../models/employee');
var async = require('async');
var nodemailer = require('nodemailer');
var crypto = require('crypto');

module.exports.reqNewEmployee = function(req, res, next){

 async.waterfall([
    function(done) {
      var smtpTransport = nodemailer.createTransport('SMTP', {
        service: 'SendGrid',
        auth: {
          user: 'madhuri19',
          pass: 'Madhuri@123'
        }
      });
      var mailOptions = {
        to: 'madhurichinthakindi332@gmail.com',
        from: req.body.email,
        subject: 'Request for Registration of employee',
        text: 'A new Employee wants to create an account with the following details' +'\n\n' +
        'Name: ' + req.body.name + '\n\n' + 'Email: ' + req.body.email + '\n\n' + 
        'DL Number: ' + req.body.dl
    };
      smtpTransport.sendMail(mailOptions, function(err) {
        //req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        console.log('email sent to Admin');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    //res.redirect('/forgot');
  });
    
};