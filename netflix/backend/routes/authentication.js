const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {body, validationResult} = require('express-validator');


//create a user using: POST "/api/authentication/createuser". doesnt require authorization
router.post('/createuser', [ // this is an array part of the arguments

    body('name', 'Enter a valid name').isLength({min: 3}), // min length
    body('email', 'Enter a valid email').isEmail(), // checking if its an actual email, the second line shows when incorrect
    body('password', 'Password must be at least 5 characters').isLength({min: 5}),

    ], async (req, res)=>
    {   
        // req = request
        // res = response
        const errors = validationResult(req);

        if (!errors.isEmpty()) // checking if the input is correct according to the checks given in the array
        {
            return res.status(400).json({errors: errors.array()});
        }

        User.create ({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
        })
        .then(user => res.json(user))
        .catch(err => {console.log(err)
            res.json({error: 'Please enter a unique value for email'})}) // then and catch work like try, catch
        
})

module.exports = router;