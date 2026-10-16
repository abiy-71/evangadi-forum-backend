const { randomUUID } = require('crypto');
const dbConnection = require('../config/dbConfig');


const createQuestion = async (req, res) => {
    const questionId = randomUUID();
    const { title, description } = req.body;
    const { userid } = req.user;

    if(!title || !description) {
        return res.status(400).json({
          error: "Bad Request",
          message: "Please provide all required fields",
        });
    }

    try {
        const sql = `INSERT INTO questions(title,description,questionid,userid ) VALUES (?,?,?,?)`;
        const values = [title,description,questionId,userid]

        await dbConnection.query(sql,values);
        
        return res.status(201).json({
          message: "Question created successfully",
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
          error: "Internal Server Error",
          message: "An unexpected error occurred.",
        });
    }
};

const getAllQuestions = async (req, res) => {

    try {
        const sql = `SELECT
                         q.question_id,
                         q.title,
                         q.description,
                         q.tag,
                         u.user_name,
                         q.created_at
                     FROM questions AS q JOIN users AS u ON q.user_id = u.user_id
                     ORDER BY q.created_at DESC`;
    

        const [questions] = await dbConnection.query(sql);

        return res.status(200).json({
            questions
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
          error: "Internal Server Error",
          message: "An unexpected error occurred.",
        });
    }
};

const getSingleQuestion = async (req, res) => {
    const { question_id } = req.params;

    try {
        const sql = `SELECT
                     q.question_id,
                     q.title,
                     q.description,
                     q.user_id,
                     u.user_name, 
                     q.created_at
                 FROM questions AS q
                 JOIN users AS u 
                    ON q.user_id = u.user_id
                 WHERE q.question_id = ?`;
        const values = [question_id];

        const [question] = await dbConnection.query(sql, values);
        
        if(question.length === 0) {
            return res.status(404).json({
              error: "Not Found",
              message: "The requested question could not be found.",
            });
        }

        return res.status(200).json({
            question: question[0]
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
          error: "Internal Server Error",
          message: "An unexpected error occurred.",
        });
    }

    
};

module.exports = {
    createQuestion,
    getAllQuestions,
    getSingleQuestion
}