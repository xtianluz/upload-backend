const express = require('express')
const app = express()
const multer = require('multer')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config();

app.use(cors())
app.use(express.json())

//express.static make the folder path '/uploads'+filename available in the browser
app.use('/uploads', express.static('uploads'))

//--------------------------------------------------mongoose block
mongoose.connect('mongodb://localhost:27017/myFirstDB')
.then(() => {
    console.log('Mongodb connected...')
})

const uriSchema = new mongoose.Schema({
    imageUri: String,
});

const seller = mongoose.model('seller', uriSchema)
//--------------------------------------------------mongoose block


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
    // preservePath: true,
    limits: {
        fileSize: 1024 * 1024 * 6,
    },
    fileFilter: fileFilter
}).single('image');



// simplest form here
// app.post('/uploads', upload.single("image"), (req, res) => {
//     console.log(req.file)
//     res.send('Upload successful!')

// })


/*IMAGE UPLOAD BLOCK*******************************************/
//complex form
app.post('/uploads', function (req, res) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.log(err)
        res.send(err)
      } else if (err) {
        res.send('Unknown error!')
      }
  
      // Everything went fine.
      const sellerUpload = new seller({
        imageUri: "http://localhost:5000/" + req.file.path.toString()
        })
      sellerUpload.save()
      .then((result) => {
          console.log('Seller upload saved!')
          mongoose.connection.close()
          console.log('Mongodb closed!')
      })
      res.send(req.file)
      console.log(req.file.path)
    })
})
/*IMAGE UPLOAD BLOCK*******************************************/

app.get('/',(req, res) => {
    res.send('<h1>Coming soon...</h1>')
})

app.get('/uploads', (req, res) => {
    seller.find({}).then(items => {
        res.json(items)
    })
})

const PORT = 5000
app.listen(PORT)
console.log(`Server running on port ${PORT}`)