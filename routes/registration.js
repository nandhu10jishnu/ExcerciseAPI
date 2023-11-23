const router = require('express').Router();
let Registration = require('../models/registration.model');
let jwtauth = require('../token/jwt');  

router.route('/').get(jwtauth.authenticate,(req, res) => {               //jwt
    Registration.find()
      .then(registration => res.json(registration))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
    
router.route('/add').post(jwtauth.authenticate,(req, res) => {
  const StudentName = req.body.StudentName;
  const FatherName = req.body.FatherName;
  const MotherName = req.body.MotherName;
  const Gender = req.body.Gender;
  const Email = req.body.Email;
  const Telephone = Number(req.body.Telephone);
  const DateOfBirth = Date.parse(req.body.DateOfBirth);
  const Level = req.body.Level;

  const newRegistration = new Registration({
    StudentName,
    FatherName,
    MotherName,
    Gender,
    Email,
    Telephone,
    DateOfBirth,
    Level

  });

  newRegistration.save()
  .then(() => res.json('Registration added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get(jwtauth.authenticate,(req, res) => {
  Registration.findById(req.params.id)
      .then(registration => res.json(registration))
      .catch(err => res.status(400).json('Error: ' + err));
  });


  router.route('/:id').delete(jwtauth.authenticate,(req, res) => {
    Registration.findByIdAndDelete(req.params.id)
      .then(() => res.json('Country deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/update/:id').put(jwtauth.authenticate,(req, res) => {
    Registration.findById(req.params.id)
    .then(registration => {
        registration.StudentName = req.body.StudentName;
        registration.FatherName = req.body.FatherName;
        registration.MotherName = req.body.MotherName;
        registration.Gender = req.body.Gender;
        registration.Email = req.body.Email;
        registration.Telephone = Number(req.body.Telephone);
        registration.DateOfBirth = Date.parse(req.body.DateOfBirth);
        registration.Level = req.body.Level;

        registration.save()
        .then(() => res.json('Registration updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;