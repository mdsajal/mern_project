const generateEmailOption = ({ to, subject, template }) => {
	return {
		from: '"md sajol" <mdshajol659@gmail.com>',
		to,
		subject,
		html: template
	};
};

module.exports = generateEmailOption;
