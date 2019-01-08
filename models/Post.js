const { Schema, Types, model } = require('mongoose');

const PostSchema = new Schema(
	{
		title: String,
		content: String,
		authorId: { type: Types.ObjectId, ref: 'User' },
		answersId: { type: Types.ObjectId, ref: 'User' },
		voteId: { type: Types.ObjectId, ref: 'Vote' }
	},
	{ timestamps: true }
);

module.exports = model('Post', PostSchema);
