const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

const connectDB = require('./src/database/connection');

const contactsRoute = require('./src/routes/contactsRoute');
const articlesRoute = require('./src/routes/articlesRoute');
// const userRouter = require('./src/routes/userRouter');
// const notesRouter = require('./src/routes/notesRouter');

const errorHandler = require('./src/middlewares/errorHandler');

const app = express();

// setup port
dotenv.config({ path: ".env" })
const PORT = process.env.PORT || 8000

//logger 
app.use(morgan('dev'));

//mongoDB connection
connectDB();

// express third party middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Use route
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api/articles', articlesRoute);
app.use('/api/contacts', contactsRoute);

// middleware error handler
app.use(errorHandler);

app.get('/', (req, res) => {
  res.status(200).json({ message: "Hello Wakeguard" })
})

app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) });