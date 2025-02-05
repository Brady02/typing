const express = require('express')
const bcrypt = require("bcrypt");
const router = express.Router()
const UserModel = require('../models/userModel')

//Get all users
router.get('/', async (req, res) => {
    try {
        const users = await UserModel.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//Create new user
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

module.exports = router
