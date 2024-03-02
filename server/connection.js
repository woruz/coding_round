const mongoose = require('mongoose')



const connect_db = () => {
    mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log("DB is connected")
    }).catch(err => {
        console.log("Something went wrong")
    })
}

module.exports = {connect_db}