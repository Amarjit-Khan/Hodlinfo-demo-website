const mongoose = require('mongoose')
const mongoURL = "mongodb://127.0.0.1:27017/hodlinfo"

const connectToMongo = async() => {
    try {
        await mongoose.connect(mongoURL);
    } catch(error) {
        console.log(error);
    }
}
module.exports = connectToMongo;