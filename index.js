const express = require('express')
const app = express()
const multer = require('multer')

//express.static make the folder path '/uploads'+filename available in the browser
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
    limits: {
        fileSize: 1024 * 1024 * 6,
    },
    fileFilter: fileFilter
}).single('img');

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

// simplest form here
// app.post('/uploads', upload.single("img"), (req, res) => {
//     console.log(req.file)
//     res.send('Upload successful!')

// })


//complex form
app.post('/uploads', function (req, res) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.log(err)
        res.send(err)
      } else if (err) {
        // An unknown error occurred when uploading.
        res.send('Unknown error!')
      }
  
      // Everything went fine.
      res.send('Upload successful!')
      console.log(req.file)
    })
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