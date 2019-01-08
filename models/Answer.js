const { Schema, Types, model } = require('mongoose');

const AnswerSchema = new Schema(
	{
		content: String,
		authorId: { type: Types.ObjectId, ref: 'User' }
	},
	{ timestamps: true }
);

module.exports = model('Answer', AnswerSchema);
