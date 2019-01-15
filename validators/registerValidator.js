const validator = require('validator');
const registerValidator = user => {
	const { name, email, password, confirmPassword } = user;
	const error = {};

	if (!name) {
		error.name = 'Please Provide Your Name';
	}
	if (!email) {
		error.email = 'Please Provide Your Email';
	} else if (!validator.isEmail(email)) {
		error.email = 'Your Email is Not Valid';
	}

	if (!password) {
		error.password = 'Please Provide a Password';
	} else if (password.length < 6) {
		error.password = 'Password Must be Greater or Equal 6 Charecters';
	}

	if (!confirmPassword) {
		error.confirmPassword = 'Please Confirm Your Password';
	} else if (password !== confirmPassword) {
		error.confirmPassword = "Password Dosen/'t Match";
	}

	return {
		error,
		isValid: Object.keys(error).length === 0
	};
};

module.exports = registerValidator;
