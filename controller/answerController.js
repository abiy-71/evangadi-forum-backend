const dbConnection = require('../config/dbConfig');

const createAnswer = async (req, res) => {
    const { questionid, answer } = req.body;
    const { userid } = req.user;


    if(!answer) {
        return res.status(400).json({
          error: "Bad Request",
          message: "Please provide answer",
        });
    }

    try {

        const sql = `INSERT INTO answers(user_id,question_id,answer) VALUES(?,?,?)`;
        const values = [userid,questionid,answer];

        await dbConnection.query(sql,values);

        return res.status(201).json({
          message: "Answer posted successfully",
        });
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
          error: "Internal Server Error",
          message: "An unexpected error occurred.",
        });
    }
};

const getAnswer = async (req, res) => {
    const { question_id } = req.params;

    try {
        const sql = `SELECT
                         a.answer_id,
                         a.answer,
                         u.user_name,
                         a.created_at
                     FROM answers AS a JOIN users AS u
                        ON a.user_id = u.user_id
                     WHERE a.question_id = ?`;
        const values = [question_id];

        const [answers] = await dbConnection.query(sql, values);
        
        if(answers.length === 0) {
            return res.status(404).json({
              error: "Not Found",
              message: "The requested question could not be found.",
            });
        }


        return res.status(200).json({
            answers
        });

    } catch (error) {
         console.log(error.message);
         return res.status(500).json({
           error: "Internal Server Error",
           message: "An unexpected error occurred.",
         });
    }
};

module.exports = {
    createAnswer,
    getAnswer
};