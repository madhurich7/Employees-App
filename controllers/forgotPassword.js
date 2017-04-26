var mongoose = require('mongoose');
var Employee = require('../models/employee');
var async = require('async');
var nodemailer = require('nodemailer');
var crypto = require('crypto');

module.exports.forgotPassword = function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var ptoken = buf.toString('hex');
        done(err, ptoken);
      });
    },
    function(ptoken, done) {
      Employee.findOne({ email: req.body.email }, function(err, employee) {
        if (!employee) {
          //req.flash('error', 'No account with that email address exists.');
          console.log('employee doesn\'t exists with the email provided' );
          //return res.redirect('/forgot');
        }

        employee.resetPasswordToken = ptoken;
        employee.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        employee.save(function(err) {
          done(err, ptoken, employee);
        });
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
        subject: 'Node.js Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '#/api/reset/' + ptoken + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        //req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        console.log('email sent');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    //res.redirect('/forgot');
  });
};