# EWS Auth Service

Authentication and user management service for the Electrician Work Service (EWS) platform.

## Features

- User authentication (login/register)
- Password reset functionality
- Profile management
- JWT-based authentication
- Blacklist token support
- Email notifications

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT for authentication
- Nodemailer for emails
- bcrypt for password hashing

## Setup

1. Clone the repository
2. Install dependencies: 
git clone https://github.com/yourusername/auth.ews.in.git
```sh
cd auth.ews.in
npm install
```

3. Create a `.env` file with:
```sh
PORT=6000
MONGODB_CONNECT_CLOUD=your_mongodb_url
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
FRONTEND_URL=your_frontend_url
```

4. Run the server:
```sh
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication
#### Register User
```
POST /users/api/v1/auth/register
Content-Type: application/json
Authrization : Bearer <token>
{
    "fullname.firstname": "string",
    "fullname.lastname": "string",
    "email": "string",
    "password": "string"
}

```
#### Login
```
POST /users/api/v1/auth/login
Content-Type: application/json

{
    "email": "string",
    "password": "string"
}
```


### User Management
- GET `/users/api/v1/auth/profile` - Get user profile
- PUT `/users/api/v1/auth/profile/update` - Update user profile

## Environment Variables

- `PORT`: Server port (default: 6000)
- `MONGODB_CONNECT_CLOUD`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT
- `EMAIL_USER`: Gmail address for sending emails
- `EMAIL_PASS`: Gmail password/app password
- `FRONTEND_URL`: Frontend application URL

## Author

Ravi Sain

## License

MIT

## Base URL

Production server runs at `https://auth-ews-in.onrender.com/api/v1`