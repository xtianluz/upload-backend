const express = require('express')
const app = express()
const multer = require('multer')

app.use('/uploads', express.static('uploads'))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const fileFilter = (req,file,cb) => {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
        cb(null, true)
    }   else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limites: {
        fileSize: 1024 * 1024 * 6,
    },
    fileFilter: fileFilter
});

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

app.post('/uploads', upload.single("img"), (req, res) => {
    console.log(req.file)
})

app.get('/',(req, res) => {
    res.send('<h1>Coming soon...</h1>')
})

app.get('/api/users', (req, res) => {
    res.json(users)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)