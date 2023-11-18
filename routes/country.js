const router = require('express').Router();
let Country = require('../models/country.model');

router.route('/').get((req, res) => {
    Country.find()
      .then(country => res.json(country))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/add').post((req, res) => {
    const Name = req.body.Name;
    const Description = req.body.Description;
  
  const newCountry = new Country({
    Name,
    Description,
  });
  newCountry.save()
  .then(() => res.json('Country added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Country.findById(req.params.id)
      .then(country => res.json(country))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/:id').delete((req, res) => {
    Country.findByIdAndDelete(req.params.id)
      .then(() => res.json('Country deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/update/:id').put((req, res) => {
    Country.findById(req.params.id)
      .then(country => {
        country.Name = req.body.Name;
        country.Description = req.body.Description;
       
  
        country.save()
          .then(() => res.json('Country updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  module.exports = router;


  
