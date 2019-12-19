'use strict';

const fs = require('fs');

var mysql = require('mysql');
const util = require('util');

const express = require('express')
const app = express()
const port = 3000
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
var con = mysql.createPool({
  host: "localhost",
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
  user: "root",
  password: "root",
  database: "sampran_ecommerce_cloud",
  charset: 'utf8'
});

const query = util.promisify(con.query).bind(con);

app.get('/', async (req, res) => {
  let result = await query("SELECT user_questionnaire_info.*,user.username,user.fullname FROM `user_questionnaire_info` INNER JOIN `user` ON user.id =user_questionnaire_info.user_id  where user_questionnaire_info.status_id = 1");
  result.map(data => {
    data.answer = "";
    return data;
  })
  res.json({
    status: 'success',
    data: result
  });

})

app.get('/excel', async (req, res) => {
  let result = await query("SELECT user_questionnaire_info.*,user.username,user.fullname FROM `user_questionnaire_info` INNER JOIN `user` ON user.id =user_questionnaire_info.user_id  where user_questionnaire_info.status_id = 1");
  result.map(data => {
    data.answer = "";
    return data;
  })
  res.json({
    status: 'success',
    data: result
  });

})

app.delete('/user/:id', async (req, res) => {
  let id = req.params.id;
  let result = await query("SELECT * FROM `user_questionnaire_info` where id = " + id);

  let user_questionnaire_info = await query(`UPDATE user_questionnaire_info SET status_id = ? WHERE id = ?`, [3, result[0].id]);
  let user = await query(`UPDATE user SET status_id = ? WHERE id = ?`, [3, result[0].user_id]);
  res.json({
    status: 'success',
    data: result[0]
  });

})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))