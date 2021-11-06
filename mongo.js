const mongoose = require('mongoose')
require('dotenv').config();

const mongoUsername = process.env.MONGO_USERNAME
const mongoPwd = process.env.MONGO_PASSWORD
const clusterUrl = "localhost:27017/myFirstDB"

const uri = `mongodb://${mongoUsername}:${mongoPwd}@${clusterUrl}`
// const uri = 'mongodb://myUserAdmin:admin123@localhost:27017/myFirstDB'

mongoose.connect(uri)
.then(() => {
    console.log('Mongodb connected...')
})

const userSchema = new mongoose.Schema({
    firstname: String,
});

const users = mongoose.model('users', userSchema)

const username = new users({
    firstname: 'nicolleen'
})

// username.save().then((result) => {
//     console.log('username saved!');
//     mongoose.connection.close()
// })

users.find({})
.then(res => {
    res.forEach(items => {
        console.log(items)
    })
    mongoose.connection.close()
})