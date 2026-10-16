# Evangadi Forum Backend

The backend API for the Evangadi Forum application, built with Node.js, Express, and MySQL. It provides endpoints for user authentication, questions, and answers.

## Technologies Used

- Node.js
- Express.js
- MySQL with mysql2
- JSON Web Tokens (JWT)
- bcrypt
- dotenv
- CORS

## Features

- User registration and login
- Password hashing
- JWT-based authentication
- Authenticated user verification
- Create and retrieve questions
- Retrieve a single question
- Create and retrieve answers for questions

## Getting Started

### Prerequisites

- Node.js and npm
- MySQL

### Installation

1. Clone the repository:

   ```bash
   git clone YOUR_BACKEND_REPOSITORY_URL
   ```

2. Navigate into the project directory:

   ```bash
   cd YOUR_BACKEND_DIRECTORY
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root and configure the required environment variables.

5. Start the server:

   ```bash
   node --watch app.js
   ```

The server listens on port `5500` by default.

## Environment Variables

The application requires the following environment variables:

| Variable | Description |
|---|---|
| `DB_USER` | MySQL database username |
| `DB_DATABASE` | Name of the MySQL database |
| `DB_PASSWORD` | MySQL database password |
| `JWT_SECRET` | Secret used for signing and verifying JWTs |

Make sure your MySQL database is running and configured before starting the server.

## API Endpoints

All endpoints use the `/api` prefix.

### Users

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/api/users/register` | Register a new user | Not required by route middleware |
| POST | `/api/users/login` | Log in | Not required by route middleware |
| GET | `/api/users/check` | Verify the current user | Required |

### Questions

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/questions` | Create a question |
| GET | `/api/questions` | Retrieve all questions |
| GET | `/api/questions/:question_id` | Retrieve a specific question |

All question endpoints require authentication.

### Answers

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/answers` | Create an answer |
| GET | `/api/answers/:question_id` | Retrieve answers for a question |

All answer endpoints require authentication.

