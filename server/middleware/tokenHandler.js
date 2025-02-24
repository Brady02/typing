const jwt = require('jsonwebtoken');
const express = require('express');

const validateToken (async (req,res,next) => {
	let token; 
	let authHeader = req.headers.Authorization || req.headers.authorization;
	if (authHeader && authHeader.startsWith('Bearer')) {
		token = authHeader.split(' ')[1];
		jwt.verify(token, process.env.ACCESSTOKENSECRET, (err, decoded) => {
			if (err) {
				res.status(401).json({message: 'Not Authorized'});
			}
			req.user = decoded.user;
			next();
		});
		if (!token) {
			res.status(401).json({message: 'Not Authorized or Invalid Token'});
		}
	}
});
