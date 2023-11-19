const router = require('express').Router();
let UserInfo = require('../models/userinfo.model');
const jwt = require('jsonwebtoken');                     //  jwt
let jwtauth = require('../token/jwt');


const secretKey = process.env.secretKey;
// const secretKey = 'a9F!2bE&1cD@3';
// // Middleware to check for a valid token
// const authenticate = (req, res, next) => {
//     const token = req.header('Authorization');
//     console.log('Received Token:', token);
//     if (!token) {
//         return res.status(401).json({ error: 'Access denied. No token provided.' });
//     }
//     try {
//         const decoded = jwt.verify(token.replace('Bearer ', ''), secretKey);
//         req.user = decoded;
//         console.log('Token is valid:', decoded);
//         next();
//     } catch (ex) {
//         console.error('Invalid token:', ex);
//         res.status(400).json({ error: 'Invalid token.' });
//     }
// };



// Public endpoint for user authentication
router.post('/login', (req, res) => {
    const { Username, Password } = req.body;

    UserInfo.findOne({ Username, Password })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = jwtauth.jwt.sign({ _id: user._id, username: user.Username }, secretKey);

            console.log('Send Token:', token);
            res.json({ token });
        })
        .catch(err => res.status(400).json({ error: 'Error during login', details: err.message }));

});

// Protected endpoint with token authentication
router.route('/userlist').get(jwtauth.authenticate, (req, res) => {
  UserInfo.find()
      .then(users => {
          if (users.length === 0) {
              return res.status(404).json({ message: 'No users found.' });
          }
          res.json(users);
      })
      .catch(err => res.status(500).json({ error: 'Error fetching user list.', details: err.message }));
});


router.route('/').get((req, res) => {
    UserInfo.find()
      .then(user => res.json(user))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/add').post((req, res) => {
    const Username = req.body.Username;
    const Password = req.body.Password;
  
  const newUserinfo = new UserInfo({
    Username,
    Password,
  });
  newUserinfo.save()
  .then(() => res.json('User added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    UserInfo.findById(req.params.id)
      .then(user => res.json(user))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/:id').delete((req, res) => {
    UserInfo.findByIdAndDelete(req.params.id)
      .then(() => res.json('User deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/update/:id').put((req, res) => {
    UserInfo.findById(req.params.id)
      .then(user => {
        user.Username = req.body.Username;
        user.Password = req.body.Password;
       
        user.save()
          .then(() => res.json('User updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  module.exports = router;


  
