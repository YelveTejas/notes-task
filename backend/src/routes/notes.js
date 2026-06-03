const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");
const { trusted } = require("mongoose");

const validateNote = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title must not be empty")
    .isLength({ max: 200 })
    .withMessage("Title too long"),
];

router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ updatedAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || !query.trim()) {
      const notes = await Note.find().sort({ updatedAt: -1 });
      return res.json(notes);
    }

    const notes = await Note.find(
      {
        $text: { $search: q },
      },
      {
        score: { $meta: "textScore" },
      },
    ).sort({ score: { $meta: "textScore" } });

    res.json(notes);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.get('/:id',async(req,res)=>{
    try{
    const note = await Note.findById(req.params.id)
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note)
    }catch(error){
     res.status(500).json({ message: error.message });
    }
})


router.post('/',validateNote,async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, content } = req.body;
    const note = new Note({ title, content });
    try {
     const note =  await Note.create({
       title:req.body.title,
       content:req.body.content
     })

     res.status(201).json({
       message:'Note Created',
       note:note
     })
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
})

router.put("/:id", validateNote, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array(),
    });
  }

  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});


router.delete('/:id',async(req,res)=>{
    try{
    const note = await Note.findByIdAndDelete(req.params.id)
    if(!note) return res.status(404).json({ message:'Note not found'})
    res.json({messagr:'Note Deleted'})    
    }catch(error){
  res.status(400).json({ message: error.message });
    }
})


module.exports = router;