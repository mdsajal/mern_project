const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const app = express();
require('dotenv').config();

// Middleware
app.use(cors());
app.use(morgan());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', require('./routes/userRoutes'));
const transpoter = nodemailer.createTransport({
	service: 'gmail',
	secure: false,
	port: 25,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD
	},
	tls: false
});

const helperOption = {
	from: '"md sajol" <mdshajol659@gmail.com>',
	to: process.env.EMAIL_USER,
	subject: 'Node mailer test123',
	html: `
	<h1>Hey Md sajol you got an email from mdshajol659@gmail.com</h1>
	`
};

transpoter.sendMail(helperOption, (error, info) => {
	if (error) {
		console.log(error);
	}

	console.log('The email was sent!');
	console.log(info);
});

app.listen(process.env.PORT, () => {
	console.log(`App is running on port ${process.env.PORT}`);
	mongoose.connect(
		process.env.HOST,
		{ useNewUrlParser: true },
		() => console.log('App is connected ...')
	);
});
