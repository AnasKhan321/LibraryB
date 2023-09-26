const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    let success = false;
    let user = await User.findOne({ email: email })
    if (user) {
        res.json({ success: success, error: "Your email is already Register Login or Register with other email " });

    }
    else if (password.length < 8) {
        res.json({ success: success, error: "Password Must Contain 8 letters " });
    }

    else {
        let salt = await bcrypt.genSaltSync(10);
        let hash = await bcrypt.hashSync(password, salt);
        const newUser = await User.create({
            username: username,
            email: email,
            password: hash
        })
        const data = {
            user: {
                id: newUser.id,
                email: newUser.email
            }
        }
        success = true;
        var token = jwt.sign(data, 'secret123');

        res.json({ success: success, token: token })
    }

})


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    let success = false;
    let user = await User.findOne({ email: email })
    if (user) {
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (passwordCompare) {
            const data = {
                user: {
                    id: user.id,
                    email: user.email
                }
            }
            success = true;
            var token = jwt.sign(data, 'secret123');
            res.json({ success: success, token: token })
        }

        else {
            res.json({ success: success, error: "Invalid Email or Password " })
        }

    }
    else {
        res.json({ success: success, error: "No user Exsists with this email Id " })
    }

})

router.post('/getuser', (req, res) => {
    const { email } = req.body;
    let finduser = await = User.findOne({ email: email })
    if (finduser) {
        const data = {
            user: {
                id: finduser.id,
                email: finduser.email
            }
        }
        success = true;
        var token = jwt.sign(data, 'secret123');
        res.json({ success: true, token: token })
    }
    else {
        res.json({ success: false, error: "the user not exsists " })
    }

})

module.exports = router; 