const express = require('express')
const router = express.Router()
const UserModel = require('../models/userModel')

router.get('/', async (req, res) => {
    try {
        const users = await UserModel.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/', async (req, res) => {
    const user = new User({
        userName: req.body.userName,
        password: req.body.password
    })
    try {
        const newUser = await UserModel.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

module.exports = router
