import express from "express";
import db from "../db/database";
import User from "../domain/user";
import config from '../configuration/config';
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
var _ = require('lodash');
const moment = require('moment');

router.post("/login", (req, res, next) => {
  const email_id = _.get(req, 'body.email_id');
  const pwd = _.get(req, 'body.password');
  const sql = User.getUserByEmailIdPwdSQL(email_id, pwd);
  db.query(sql, (err, data) => {
    const userDetails = _.find(data, { 'email_id': email_id });
    if (userDetails) {
      let payload = { email_id: userDetails.email_id, first_name: userDetails.first_name, last_name: userDetails.last_name, role_name: userDetails.role_name, role_id: userDetails.role_id };
      let token = jwt.sign(payload, config.jwtOptions.secretOrKey);
      res.status(200).json({ msg: 'User successly authenticated', token: token });
    } else {
      res.status(200).json({
        msg: "Invalid username & password"
      });
    }
  });
});
router.post("/new", passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const first_name = _.get(req, 'body.first_name');
  const last_name = _.get(req, 'body.last_name');
  const email_id = _.get(req, 'body.email_id');
  const role_id = _.get(req, 'body.role_id');
  const password = _.get(req, 'body.password');
  const timeStamp = moment().format("YYYY-MM-DD HH:mm:ss");
  const created_at = timeStamp;
  const updated_at = timeStamp;
  const newUser = new User(first_name, last_name, email_id, password, role_id, created_at, updated_at);
  db.query(newUser.addUserSQL(), (err, data) => {
    if (!err) {
      res.status(200).json({
        message: "User added successfully."
      });
    } else {
      res.status(400).json({
        message: "Bad request"
      });
    }

  });

});

router.post("/delete", passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const user_id = _.get(req, 'body.user_id');  
  db.query(User.deleteUserByIdSQL(user_id), (err, data) => {    
    if (!err) {
      res.status(200).json({
        message: "User deleted successfully."
      });
    } else {
      res.status(400).json({
        message: "Bad request"
      });
    }
  });
});

router.post("/update", passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const first_name = _.get(req, 'body.first_name');
  const last_name = _.get(req, 'body.last_name');
  const email_id = _.get(req, 'body.email_id');
  const role_id = _.get(req, 'body.role_id');
  const password = _.get(req, 'body.password');
  const timeStamp = moment().format("YYYY-MM-DD HH:mm:ss");
  const created_at = timeStamp;
  const updated_at = timeStamp;
  const user = new User(first_name, last_name, email_id, password, role_id, created_at, updated_at);
  const user_id = _.get(req, 'body.user_id');    
  db.query(user.updateUserByIdSQL(user_id), (err, data) => {    
    if (!err) {
      res.status(200).json({
        message: "User updated successfully."
      });
    } else {
      res.status(400).json({
        message: "Bad request"
      });
    }

  });
});

router.post("/:userId", passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.status(200).json({
    msg: "Get user"
  });
});

module.exports = router;