const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { URI, PORT } = require('./config/config');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, () => {
	console.log(`App is running on port ${PORT}`);
	mongoose.connect(
		URI,
		{ useNewUrlParser: true },
		() => console.log('App is connected ...')
	);
});
