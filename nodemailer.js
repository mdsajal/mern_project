const nodemailer = require('nodemailer');

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

module.exports = transpoter;
// const helperOption = {
// 	from: '"md sajol" <mdshajol659@gmail.com>',
// 	to: process.env.EMAIL_USER,
// 	subject: 'Node mailer test123',
// 	html: `
// 	<h1>Hey Md sajol you got an email from mdshajol659@gmail.com</h1>
// 	`
// };

// transpoter.sendMail(helperOption, (error, info) => {
// 	if (error) {
// 		console.log(error);
// 	}

// 	console.log('The email was sent!');
// 	console.log(info);
// });
