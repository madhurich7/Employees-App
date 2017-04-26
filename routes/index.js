var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlEmployee = require('../controllers/getEmployees');
var ctrlPassword = require('../controllers/forgotPassword');
var ctrlResetPassword = require('../controllers/resetPassword');
var ctrlCreateNew = require('../controllers/createNewEmployee');
var ctrlResetNew = require('../controllers/resetPasswordNew');
var ctrlReqNew = require('../controllers/reqNewEmployee');

var Employee = require('../models/employee');

//middleware to look into all employees only to logged in admins.
router.use('/employees', auth,  function(req, res, next){
  console.log('must be executed whenever get-employees');
  if(req.payload._id && (req.payload.roles[1] === "dbAdmin")){
    next();
  }else{
    res.status(403).send('you are not an admin');
   
  }  
});

//authorising only admins to create a new employee
router.use('/newEmployee', auth,  function(req, res, next){
  console.log('must be executed whenever post request is made to create a new emp');
  if(req.payload.roles[1] === "dbAdmin"){
    res.status(200).send('you have sent an email to the new employee created');
    next();
  }else{
   res.status(403).send('you are not an admin to create a new employee');
  }  
});

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//post email to get reset email
router.post('/forgot', ctrlPassword.forgotPassword);

//post new passwords
router.post('/reset/:ptoken', ctrlResetPassword.resetPassword);

//authorization to create a new employee only to admins
router.post('/newEmployee', ctrlCreateNew.createNewEmployee);

//to update password for the new employee created by admin
router.post('/reset/newEmployee/:ptoken', ctrlResetNew.resetPasswordNew);

//post employee request details
router.post('/req/newEmployee', ctrlReqNew.reqNewEmployee);

//authorization to get all employees to only admins
router.get('/employees', ctrlEmployee.employeeRead);

router.get('/employees/:id', function(req, res, next) {
 Employee.getEmployeeById(req.params.id, function(err, employee){
 	if(err){
 		console.log(err);
 	}
 	res.json(employee);
 });
});

router.get('/reset/:ptoken', function(req, res) {
  Employee.findOne({ resetPasswordToken: req.params.ptoken, resetPasswordExpires: { $gt: Date.now() } }, 
    function(err, employee) {
    if (!employee) {
      //req.flash('error', 'Password reset token is invalid or has expired.');
      console.log('sorry the token has expired');
      //return res.redirect('/forgot');
    }
    res.json(employee);
  });
});

//update possibility to only admins and logged in employee
router.put('/update', ctrlEmployee.updateAuth);

//delete employee
router.delete('/employee/:id', auth, function(req, res, next){

    if(!req.payload._id){
        res.status(401).json({
            'message': 'you are not supposed to delete'
        });
    }
    var id = req.params.id;

    //remove employee
    Employee.removeEmployee(id, function(err, employee){
        if(err){
            console.log(err);
        }
       
    });
});




module.exports = router;