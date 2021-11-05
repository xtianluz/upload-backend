const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/myFirstDB')
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

username.save().then((result) => {
    console.log('username saved!');
    mongoose.connection.close()
})

// users.find({})
// .then(res => {
//     res.forEach(items => {
//         console.log(items)
//     })
//     mongoose.connection.close()
// })