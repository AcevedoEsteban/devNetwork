const mongoURI =
	'mongodb+srv://STEVEN123:Uptownc4@devconnector.oouv6.mongodb.net/MERN?retryWrites=true&w=majority';

const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log('mongoDb connected...');
	} catch (err) {
		console.error(err.message);
		//exit process with failure
		process.exit(1);
	}
};
module.exports = connectDB;
