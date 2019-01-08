const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { URI, PORT } = require('./config/config');

const app = express();
// Middleware
app.use(cors());
app.use(morgan());
github659;
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
