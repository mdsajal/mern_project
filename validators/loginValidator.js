const validator = require('validator');

const loginValidator = user => {
	const error = {};

	if (!user.email) {
		error.email = 'Please Provide  Your Valid Email!';
	} else if (!validator.isEmail(user.email)) {
		error.email = 'Please Provide  Your Valid Email!';
	}

	if (!user.password) {
		error.password = 'Please Provide  Your Password!';
	}

	return {
		error,
		isValid: Object.keys(error).length === 0
	};
};

module.exports = loginValidator;
