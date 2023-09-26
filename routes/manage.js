const express = require('express');
const router = express.Router();
const multer = require('multer');
const Book = require('../models/Book'); 
const Borrow = require('../models/Borrow')
const jwt = require('jsonwebtoken');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Store uploaded files in the "uploads" directory
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `${timestamp}-${file.originalname}`);
  },
});

const upload = multer({ storage });


router.post('/addbook', upload.single('file'), async (req, res) => {
  console.log(req.body)
  console.log(req.file.filename)
  const b = await Book.create({
    title: req.body.title,
    desc: req.body.desc,
    imageurl: req.file.filename
  })

  res.json({ success: true })
})

router.get('/allbooks', async (req, res) => {
  const books = await Book.find();

  res.json({ data: books })

})

router.get('/removebook/:id', async (req, res) => {
  let dell = await  Book.findByIdAndDelete(req.params.id); 
  res.json({success :true})
})

router.post('/updatebook' , async(req,res)=>{
    const {id , title , desc } = req.body; 
    let up = await Book.findByIdAndUpdate(id, { title: title , desc : desc }); 

    res.json({book : up  })

})

router.post ('/borrow' , async(req,res)=>{
  const {id ,token} = req.body ; 
  console.log(id , token)
  let data =  await jwt.verify(token, 'secret123'); 
  let up = await  Book.findByIdAndUpdate(id, {status : "Borrow"})
  
  const B = await Borrow.create({
    uemail : data.user.email,
    bid : id 
  })

  res.json({datat : data})
})

router.post('/return' , async(req,res)=>{
  const {id ,token} = req.body ; 
  console.log(id , token)
  let data = await jwt.verify(token , 'secret123'); 
  let up = await Book.findByIdAndUpdate(id  , {status : "Available"}); 
  let d =  await  Borrow.deleteOne({ bid : id  , uemail : data.user.email});
  await  delete d ; 
  res.json({success : true})
})


module.exports = router; 
        