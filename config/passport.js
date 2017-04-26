var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    console.log('LocalStrategy');
    Employee.findOne({ email: username }, function (err, employee) {
      if (err) { return done(err); }
      // Return if user not found in database
      if (!employee) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // Return if password is wrong
      if (!employee.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      console.log('employee found');
      // If credentials are correct, return the user object
      return done(null, employee);
    });
  }
));

passport.serializeUser(function(employee, done) {
  done(null, employee.id);
  console.log("serial "+employee.id);
  
});

passport.deserializeUser(function(id, done) {
  Employee.getEmployeeById(id, function(err, employee) {
    done(err, employee);
    console.log("de-serial "+id);
  });
});