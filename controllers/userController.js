const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const registerValidator = require('../validators/registerValidator');
const loginValidator = require('../validators/loginValidator');
const { catchError } = require('../utils/error');
const { PENDING, ACTIVE } = require('../utils/acountStatus');
const verificationTemplate = require('../emailTemplates/verificationTemplate');
const wellcomeTemplate = require('../emailTemplates/wellcomeTemplate');
const generateEmailOption = require('../utils/generateEmailOption');
const transpoter = require('../nodemailer');

// Register Controller to  Register user
const register = async (req, res) => {
	const { name, email, password, confirmPassword } = req.body;

	const result = registerValidator({
		name,
		email,
		password,
		confirmPassword
	});

	if (!result.isValid) return res.status(400).json(result.error);

	try {
		const findUser = await User.findOne({ email });
		if (findUser) {
			return res.status(400).json({
				message: 'Email Already Has Taken'
			});
		}

		const hashPassword = await bcrypt.hash(password, 11);
		const activeToken = await jwt.sign(
			{ name, email },
			process.env.SECRET_KEY,
			{
				expiresIn: '1d'
			}
		);

		const user = new User({
			name,
			email,
			password: hashPassword,
			acountStatus: PENDING,
			isActivated: false,
			activeToken
		});

		const newUser = await user.save();

		const template = verificationTemplate({
			name: newUser.name,
			link: `${process.env.ACTIVE_LINK}${newUser.activeToken}`
		});

		const mailOption = generateEmailOption({
			to: newUser.email,
			subject: 'Activate Your Account',
			template
		});

		transpoter.sendMail(mailOption, (err, info) => {
			if (err) return catchError(err);
			res.status(200).json({
				message: 'Check Your Email To Verify',

				user: {
					_id: newUser._id,
					name: newUser.name,
					email: newUser.email
				}
			});
			console.log(info);
		});
	} catch (error) {
		return catchError(res, error);
	}
};

// Activated Account Controller to  Active Account
const activatedAccount = async (req, res) => {
	const token = req.params.token;
	const decode = jwt.verify(token, process.env.SECRET_KEY);
	if (!decode) {
		return catchError(res, 'Invalid Token');
	}

	try {
		const user = await User.findOne({ email: decode.email });

		if (!user) {
			return catchError(res, 'Invalid Token');
		}

		if (user.isActivated) {
			return catchError(res, 'Already Activited');
		}

		if (user.activeToken === token) {
			const updateUser = await User.findOneAndUpdate(
				{ email: decode.email },
				{
					$set: {
						acountStatus: ACTIVE,
						isActivated: true,
						activeToken: ''
					}
				}
			);

			const template = wellcomeTemplate({
				name: updateUser.name,
				link: `${process.env.ACTIVE_LINK}`
			});
			const mailOption = generateEmailOption({
				to: updateUser.email,
				subject: 'Wellcome To Sajol',
				template
			});

			transpoter.sendMail(mailOption, (err, info) => {
				if (err) return catchError(err);

				console.log(JSON.stringify(info));
				res.status(200).json({
					message: 'Account Activated',
					user: { _id: updateUser._id, email: updateUser.email }
				});
			});
		}
	} catch (error) {
		catchError(res, error);
	}
};

// Log in Controller to Log in
const login = async (req, res) => {
	const { email, password } = req.body;

	const result = loginValidator({ email, password });
	if (!result.isValid) return res.status(400).json(result.error);

	try {
		const user = await User.findOne({ email });
		if (!user) return res.status(404).json({ message: 'User Not Found' });

		const isPasswordMatch = await bcrypt.compare(password, user.password);
		if (!isPasswordMatch)
			return res.status(400).json({ message: 'Invalid Token' });

		const token = jwt.sign(
			{
				_id: user._id,
				name: user.name,
				email: user.email
			},
			process.env.SECRET_KEY,
			{ expiresIn: '1d' }
		);

		res.status(200).json({
			message: 'Log in Successfuly!',
			token: `Bearer ${token}`
		});
	} catch (error) {
		catchError(error);
	}

	res.json({ message: 'Log in Sucssesfuly!' });
};

// Delete User Controller to   Delete User
const deleteUser = async (req, res) => {
	const { id } = req.params;
	try {
		await User.findByIdAndDelete(id);
		res.json({
			message: 'User  Delete Sucssesfully!'
		});
	} catch (error) {
		catchError(error);
	}
};

// Get All Users Controller to Get All Users
const getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json({ users });
	} catch (error) {
		catchError(res, error);
	}
};

module.exports = {
	register,
	activatedAccount,
	login,
	getAllUsers,
	deleteUser
};
