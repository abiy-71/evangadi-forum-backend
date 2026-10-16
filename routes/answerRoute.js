const express = require('express');
const router = express.Router();
const { createAnswer, getAnswer } = require('../controller/answerController');

router.post('/', createAnswer);
router.get('/:question_id', getAnswer)

module.exports = router