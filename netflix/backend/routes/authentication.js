const User = require('../models/User');

const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getuser = require('../middleware/getuser');
const authorized = require('../middleware/authorization');

const JWT_SECRET = 'Abeerisanokaycoder'; 





// ROUTE 1: create user: POST "/api/authentication/createuser"
router.post('/createuser', [ 

    body('name', 'Enter a valid name').isLength({min: 3}), 
    body('email', 'Enter a valid email').isEmail(), 
    body('password', 'Password must be at least 5 characters').isLength({min: 5}),

    ], async (req, res)=>
    {  
        const errors = validationResult(req);

        if (!errors.isEmpty()) 
        {
            return res.status(400).json({errors: errors.array()});
        }

        try
        {
            // check whether the email exists already
            let user = await User.findOne({email: req.body.email});
            if (user)
            {
                return res.status(400).json({error: "Sorry, a user with this email already exists"})
            }

            const salt = await bcrypt.genSalt(10);
            const sec_pass = await bcrypt.hash(req.body.password, salt);

            // creates a new user
            user = await User.create ({
                name: req.body.name,
                password: sec_pass,
                email: req.body.email,
                type: req.body.type || 'viewer'
            });

            const data = {
                user: {
                    id: user.id,
                    type: user.type
                }
            }
            const auth_token = jwt.sign(data, JWT_SECRET);
            res.json({auth_token})
        }
        catch (error)
        {
            console.log(error.message);
            res.status(500).send("some error occured");
        }
})






// ROUTE 2: authenticate user : POST "/api/authentication/login"
router.post('/login', [ 
    body('email', 'Enter a valid email').isEmail(), 
    body('password', 'Password cannot be blank').exists(), 
    ], async (req, res)=>
    {
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
        {
            return res.status(400).json({errors: errors.array()});
        }
        
        const {email, password} = req.body;
        try
        {
            let user = await User.findOne({email});
            if (!user)
            {
                return res.status(400).json({error: "Please login with correct credentials"});
            }

            const password_compare = await bcrypt.compare(password, user.password);
            if (!password_compare)
            {
                return res.status(400).json({error: "Please login with correct credentials"});
            }

            const payload = {
                user: {
                    id: user.id,
                    type: user.type
                }
            }
            const auth_token = jwt.sign(payload, JWT_SECRET);
            res.json({auth_token});

        }
        catch (error)
        {
            console.log(error.message);
            res.status(500).send("Internal server error");
        }

})







// ROUTE 3: Get user details: POST "/api/authentication/getuser"
router.post('/getuser', getuser, async (req, res) => {
    try
    {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password"); // selects everything except the password
        res.send({user})
    }
    catch (error)
    {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
})
module.exports = router;