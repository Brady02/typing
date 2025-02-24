const express = require('express')
const bcrypt = require("bcrypt");
const router = express.Router()
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel')
const validateToken = require('../middleware/tokenHandler')

//Get all users
//Private
router.get('/', validateToken, async (req, res) => {
    try {
        const users = await UserModel.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//Create new user
//Public
router.post('/register', async (req, res) => {
    const {userName, email, password} = req.body;
    if (!userName || !email || !password) {
        res.status(400).json({message: "All fields are required"})
    } else if (await UserModel.findOne({email})) {
        res.status(400).json({message: 'Email already in use'})
    } else {
        const hashedPass = await bcrypt.hash(password, 10);
        try {
            const newUser = await UserModel.create({
                userName,
                email,
                password: hashedPass,
            });
            res.status(201).json({_id: newUser.id, userName: newUser.userName})
        } catch (err) {
            res.status(400).json({message: err.message})
        }
    }
})

//Login existing user
//Public
router.post('/login', async (req, res) => {
	const {email, password} = req.body;
	if ( !email || !password) {
		res.status(400).json({message: 'ALL fields are required'});
	} else {
		const user = await findOne({email});
		if (user && (await bcrypt.compare(password, user.password))) {
			const token = jwt.sign({
				user: {
					username: user.userName,
					email: user.email,
					id: user.id,
				},
			},
				process.env.ACCESSTOKENSECRET,
				{expiresIn: '1m'}
			);
			res.status(201).json({token});
		} else {
			res.status(401).json({message: 'Incorrect Email or Password'});
		}
	}
});

module.exports = router
