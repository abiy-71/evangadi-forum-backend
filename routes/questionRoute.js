const express = require('express');
const router = express.Router();
const { createQuestion, getAllQuestions, getSingleQuestion } = require('../controller/questionController');


router.post("/", createQuestion);
router.get("/", getAllQuestions);
router.get("/:question_id", getSingleQuestion);


module.exports = router