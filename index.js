const express = require('express');
//const morgan = require('morgan');  //volleyball dose same thing.It also logs responses..!!(margon only incomin one.)
const volleyball=require('volleyball');

const bodyParser=require("body-parser");

const app = express();

const auth=require('./auth/index.js');  //bringing router..!!

//app.use(morgan('dev')); //http request logger..!!
app.use(volleyball);

app.use(bodyParser.json());

app.use("/auth",auth); //when ever a /auth request come then this middleware is called...!!

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨Hello World! 🌈✨🦄'
  });
});

function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found - ' + req.originalUrl);
  next(error);
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Listening on port', port);
});