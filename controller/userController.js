const dbConnection = require('../config/dbConfig');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    const { username, firstname, lastname, email, password } = req.body;

    if(!username || !firstname || !lastname || !email || !password) {
        return res.status(400).json({
                error: "Bad Request",
                message: "Please provide all required fields"
        });
    }

    try {

        const [user] = await dbConnection.query(`SELECT user_name,user_id FROM users WHERE user_name = ? or email = ?`, [username, email]);
        
        if(user.length > 0) {
            return res.status(409).json({
              error: "Conflict",
              message: "User already existed",
            });
        }

        if(password.length < 8) {
            return res.status(400).json({
              error: "Bad Request",
              message: "Password must be at least 8 characters",
            });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `  
          INSERT INTO users(user_name, firstname, lastname, email, password)
          VALUES(?,?,?,?,?)
           `
        const values = [username,firstname,lastname,email,hashedPassword]
        const result = await dbConnection.query(sql,values);
        

        return res.status(201).json({
          message: "User registered successfully",
        });
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
          error: "Internal Server Error",
          message: "An unexpected error occurred.",
        });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({
          error: "Bad Request",
          message: "Please provide all required fields",
        });
    }

    try {
        const [user] = await dbConnection.query(`SELECT user_id,user_name,password FROM users WHERE email = ?`, [email]);

        if(user.length == 0) {
            res.status(401).json({
              error: "Unauthorized",
              message: "Invalid username or password",
            });
        }

        const isMatch = await bcrypt.compare(password,user[0].password);

        if(!isMatch) {
            return res.status(401).json({
              error: "Unauthorized",
              message: "Invalid username or password",
            });
        }

        const username = user[0].user_name;
        const userid = user[0].user_id;


        const token =  jwt.sign({ username, userid },process.env.JWT_SECRET, { expiresIn: '1d'});


        return res.status(200).json({
            message: "login successfull",
            token,
            username
        });

        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
          error: "Internal Server Error",
          message: "An unexpected error occurred.",
        });
    }
};

const checkUser = async (req, res) => {

    const { username, userid } = req.user;
    res.status(200).json({
        message: "Valid user",
        username,
        userid
    })
};

module.exports = {
    registerUser,
    loginUser,
    checkUser
};
