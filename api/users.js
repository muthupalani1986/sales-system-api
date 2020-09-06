import express from "express";
import db from "../db/database";
import User from "../queries/user";
import config from '../configuration/config';
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
var _ = require('lodash');
const moment = require('moment');
import Util from "../common/util";
router.post("/login", (req, res, next) => {
  const email_id = _.get(req, 'body.email_id');
  const pwd = _.get(req, 'body.password');
  const sql = User.getUserByEmailIdPwdSQL(email_id, pwd);
  db.query(sql, (err, data) => {
    const userDetails = _.find(data, { 'email_id': email_id });
    if (userDetails) {
      let payload = { user_id:userDetails.user_id,email_id: userDetails.email_id, first_name: userDetails.first_name, last_name: userDetails.last_name, role_name: userDetails.role_name, role_id: userDetails.role_id };
      let token = jwt.sign(payload, config.jwtOptions.secretOrKey);
      res.status(200).json({ statusCode:'0000',msg: 'User successly authenticated', token: token,user_id:userDetails.user_id,email_id: userDetails.email_id, first_name: userDetails.first_name, last_name: userDetails.last_name, role_name: userDetails.role_name, role_id: userDetails.role_id});
    } else {
      res.status(200).json({
        msg: "Invalid email id & password"
      });
    }
  });
});
router.post("/new", passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const userDetails=Util.getUserDetails(req);
  const newUser = new User(userDetails.first_name, userDetails.last_name, userDetails.email_id, userDetails.password, userDetails.role_id, userDetails.created_at, userDetails.updated_at);
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
  const userDetails=Util.getUserDetails(req);
  const user = new User(userDetails.first_name, userDetails.last_name, userDetails.email_id, userDetails.password,userDetails. role_id, userDetails.created_at, userDetails.updated_at);
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

router.post("/:user_Id", passport.authenticate('jwt', { session: false }), (req, res, next) => {
  let user_id = _.get(req, 'params.user_Id');   
  db.query(User.getUserById(user_id), (err, data) => {    
    if (!err) {
      res.status(200).json(data[0]);
    } else {
      res.status(400).json({
        message: "Bad request"
      });
    }
  });
});

module.exports = router;