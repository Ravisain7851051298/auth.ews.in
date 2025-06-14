const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDb = require('./helpers/database/connection.db');
const morgan = require('morgan');
const http = require('http');
const server = http.createServer(app);
const userRoutes = require('./api/user.routes');

server.listen(process.env?.PORT || 6000, () => {
    console.log(`Server is running on port ${process.env.PORT || 6000}`);
});

connectToDb();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('welcome to ews.service.in');
});

app.use('/users', userRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        error: err.message || 'Something went wrong!',
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

module.exports = app;


// ravi sain 