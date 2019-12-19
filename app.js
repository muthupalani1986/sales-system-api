import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
import products from "./api/products";
import orders from "./api/orders";
import users from "./api/users";
import category from "./api/category";
import config from './configuration/config';
import db from "./db/database";
import User from "./queries/user";
var _ = require('lodash');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = config.jwtOptions.secretOrKey;
// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {    
  const sql=User.getUserByEmailId(jwt_payload.email_id);
  db.query(sql, (err, data)=> { 
  const userDetails=_.find(data, { 'email_id': jwt_payload.email_id});    
    if (userDetails) {
      next(null, jwt_payload);
    } else {
      next(null, false);
    }
  });

});
// use the strategy

passport.use(strategy);

const app = express();
// initialize passport with express
app.use(passport.initialize());

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.use("/products",products);
app.use("/orders",orders);
app.use("/user",users);
app.use("/category", category);
//if we are here then the specified request is not found
app.use((req,res,next)=> {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//all other requests are not implemented.
app.use((err,req, res, next) => {
   res.status(err.status || 501);
   res.json({
       error: {
           code: err.status || 501,
           message: err.message
       }
   });
});

module.exports  = app;