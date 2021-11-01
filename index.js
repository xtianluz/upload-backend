const express = require('express')
const app = express()

let users = [
    {
        id: 1,
        username: 'xtian',
        password: 'asdf'
    },
    {
        id: 2,
        username: 'sliverback',
        password: '123'
    }
]

app.get('/',(req, res) => {
    res.send('<h1>Coming soon...</h1>')
})

app.get('/api/users', (req, res) => {
    res.json(users)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)