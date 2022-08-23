const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(
            process.env.DB_CONNECTION
        )
        console.log('CONNECTED TO DB')
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB