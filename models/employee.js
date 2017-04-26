 var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var employeeSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String,
  salt: String,
  roles: Array,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  resetPasswordTokenNewEmp: String,
  resetPasswordTokenNewEmpExpires: Date,
  dl: Number
});

employeeSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

employeeSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

employeeSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    roles: this.roles,
    exp: parseInt(expiry.getTime()/ 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

var Employee = module.exports = mongoose.model('Employee', employeeSchema);


module.exports.getEmployees = function(callback){
  Employee.find(callback);
};

//to get employee by Id
module.exports.getEmployeeById = function(id, callback){
  Employee.findById(id, callback);
};

//to update am employee
module.exports.updateEmployee = function(id, data, callback){
  var name = data.name;
  var email = data.email;
  
  var query = {_id: id};
  Employee.findById(id, function(err, employee){
    if(!employee){
      return next(new Error('Couldnot not load employee'));
    }
    else{
      //to update
      employee.name = name;
      employee.email = email;

      employee.save(callback);
    }
  });
};

//remove employee
module.exports.removeEmployee = function(id, callback){
  Employee.find({_id: id}).remove(callback);
};