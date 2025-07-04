const mongoose = require('mongoose')

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI)
		console.log('Connected to database ok')
	} catch (error) {
		console.error(error)
	}
}

module.exports = { dbConnection }
