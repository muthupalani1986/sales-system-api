import express from "express";
import db from "../db/database";
import User from "../domain/user";
import config from '../configuration/config';
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
var _ = require('lodash');
router.post("/login", (req, res, next) => {
  const email_id=_.get(req,'body.email_id');
  const pwd=_.get(req,'body.password');
   const sql=User.getUserByEmailIdPwdSQL(email_id,pwd);         
    db.query(sql, (err, data)=> { 
        const userDetails=_.find(data, { 'email_id': email_id}); 
        if(userDetails){
          let payload = {email_id:userDetails.email_id,first_name:userDetails.first_name,last_name:userDetails.last_name,role_name:userDetails.role_name,role_id:userDetails.role_id};          
          let token = jwt.sign(payload, config.jwtOptions.secretOrKey);          
          res.status(200).json({ msg: 'User successly authenticated',token:token});
        }else{
          res.status(200).json({
            msg:"Invalid username & password"
          });
        }  
    });
});
router.post("/add", passport.authenticate('jwt', { session: false }),(req, res, next) => {
    res.status(200).json({
            msg:"Add user"
      });
});

router.post("/delete", passport.authenticate('jwt', { session: false }),(req, res, next) => {
  res.status(200).json({
          msg:"Delete user"
    });
});

router.post("/update", passport.authenticate('jwt', { session: false }),(req, res, next) => {
  res.status(200).json({
          msg:"Update user"
    });
});

router.post("/:userId", passport.authenticate('jwt', { session: false }),(req, res, next) => {
  res.status(200).json({
          msg:"Get user"
    });
});

module.exports = router;