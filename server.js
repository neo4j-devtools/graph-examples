require('dotenv').config();
var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();

app.use(express.static('./build'));

app.use('/api', proxy({
  target: process.env.REACT_APP_BASE_API_URL,
  pathRewrite: {'^/api' : ''},
  changeOrigin: true,
  secure: false
}));

app.listen(process.env.REACT_APP_PROXY_API_PORT);
