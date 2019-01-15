const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const common = {
	type: String,
	required: true,
	trim: true
};

const UserSchema = new Schema({
	name: {
		...common
	},
	email: {
		...common
	},
	password: {
		...common
	},
	acountStatus: String,
	isActivated: Boolean,
	activeToken: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
