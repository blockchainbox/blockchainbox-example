var express = require('express');
var request = require('request');
var router = express.Router();

var CONTRACT_ID = 18;

var todos = [
  {'num': 1, 'title': 'one', 'finished': true, 'disabled': false}, 
  {'num': 2, 'title': 'two', 'finished': false, 'disabled': false}
];

/* display todo list. */
router.get('/', function(req, res, next) {
  request({
    method: 'GET',
    uri: process.env.BLOCKCHAINBOX + '/v1/eth/contract/transactionData?contractId=' + CONTRACT_ID
  }, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred 
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
    console.log('body:', body); // Print the HTML for the Google homepage. 

    // 這邊要包成 list 傳出去
    res.render('todo', { title: 'Todo example', todos: todos, message: ""});
  });
});

/* create todo list */
router.get('/create', function(req, res, next) {
  request({
    method: 'POST',
    uri: process.env.BLOCKCHAINBOX + '/v1/eth/contract/transaction',
    json: {
      "contractId": CONTRACT_ID,
      "contractFunctionId": 18, // create
      "data": [
        req.query.title
      ]
    }
  }, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred 
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
    console.log('body:', body); // Print the HTML for the Google homepage. 

    // res.render
    res.render('todo', { title: 'Todo example', todos: todos, message: "交易送出 TxHash：" + body.data.txHash});
  });
});

/* POST update todo list */
router.get('/update', function(req, res, next) {
  request({
    method: 'POST',
    uri: process.env.BLOCKCHAINBOX + '/v1/eth/contract/transaction',
    json: {
      "contractId": CONTRACT_ID,
      "contractFunctionId": 18, // update
      "data": [
        req.query.num,
        req.query.title,
        req.query.finished,
        false
      ]
    }
  }, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred 
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
    console.log('body:', body); // Print the HTML for the Google homepage. 

    // res.render
    res.render('todo', { title: 'Todo example', todos: todos, message: "交易送出 TxHash：" + body.data.txHash});
  });
});

/* DELETE detele todo list */
router.get('/delete', function(req, res, next) {
  request({
    method: 'POST',
    uri: process.env.BLOCKCHAINBOX + '/v1/eth/contract/transaction',
    json: {
      "contractId": CONTRACT_ID,
      "contractFunctionId": 18, // update
      "data": [
        req.query.num,
        req.query.title,
        req.query.finished,
        true
      ]
    }
  }, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred 
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
    console.log('body:', body); // Print the HTML for the Google homepage. 

    // res.render
    res.render('todo', { title: 'Todo example', todos: todos, message: "交易送出 TxHash：" + body.data.txHash});
  });
})

module.exports = router;
