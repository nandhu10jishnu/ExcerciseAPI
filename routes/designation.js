const router = require('express').Router();
let Designation = require('../models/designation');
let jwtauth = require('../token/jwt');


router.route('/').get(jwtauth.authenticate, (req, res) => {
  Designation.find()
      .then(designation => {
          if (designation.length === 0) {
              return res.status(404).json({ message: 'No designation found.' });
          }
          res.json(designation);
      })
      .catch(err => res.status(500).json({ error: 'Error fetching designation list.', details: err.message }));
});


    
router.route('/add').post((req, res) => {
  const Name = req.body.Name;
  const Description = req.body.Description;
  const Active = Boolean(req.body.Active);
  

  const newDesignation = new Designation({
    Name,
    Description,
    Active,
  });

  newDesignation.save()
  .then(() => res.json('Designation added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Designation.findById(req.params.id)
    .then(designation => res.json(designation))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Designation.findByIdAndDelete(req.params.id)
    .then(() => res.json('Designation deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').put((req, res) => {
  Designation.findById(req.params.id)
    .then(designation => {
      designation.Name = req.body.Name;
      designation.Description = req.body.Description;
      designation.Active = Boolean(req.body.Active);

      designation.save()
        .then(() => res.json('Designation updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;