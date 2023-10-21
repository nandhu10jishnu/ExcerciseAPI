const router = require('express').Router();
let Designation = require('../models/designation');

router.route('/').get((req, res) => {
  Designation.find()
    .then(designation => res.json(designation))
    .catch(err => res.status(400).json('Error: ' + err));
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