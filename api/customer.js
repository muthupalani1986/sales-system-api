import express from "express";
import db from "../db/database";
import Customer from "../queries/customer";
import config from '../configuration/config';
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
var _ = require('lodash');
const moment = require('moment');
import Util from "../common/util";
router.post("/", passport.authenticate('jwt', { session: false }), (req, res, next) => {  
  db.query(Customer.getAllCustomerSQL(), (err, data) => {
    if (!err) {
      res.status(200).json({
      statusCode: '0000',
      customers: data
      });
    } else {
      res.status(400).json({
        message: "Bad request"
      });
    }

  });

});
router.post("/new", passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const customerDetails = Util.getCustomerDetails(req);
  const customerInstance = new Customer(customerDetails.name, customerDetails.company_name, customerDetails.email, customerDetails.phone_number, customerDetails.address, customerDetails.city,customerDetails.state, customerDetails.postal_code, customerDetails.country, customerDetails.created_at, customerDetails.updated_at);
  db.query(customerInstance.addCustomerSQL(), (err, data) => {
    if (!err) {    
         res.status(200).json({
          statusCode:'0000',
          message: "Customer added successfully.",
          id: data.insertId
      });
    } else {
      res.status(400).json({
        message: "Bad request"
      });
    }

  });

});

router.post("/delete", passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const id = _.get(req, 'body.id');  
  db.query(Customer.deleteCustomerByIdSQL(id), (err, data) => {
    if (!err) {
      if (data && data.affectedRows > 0) {
        res.status(200).json({
          statusCode: '0000',
          message: `Customer deleted successfully.`,
          affectedRows: data.affectedRows
        });
      } else {
        res.status(200).json({
          statusCode: '404',
          message: "Customer Not found."
        });
      }
    } else {
      res.status(400).json({
        message: "Bad request"
      });
    }    
    
  });
});

router.post("/update", passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const customerDetails=Util.getCustomerDetails(req);
  const customerInstance = new Customer(customerDetails.name, customerDetails.company_name, customerDetails.email, customerDetails.phone_number, customerDetails.address, customerDetails.city, customerDetails.state, customerDetails.postal_code, customerDetails.country, customerDetails.created_at, customerDetails.updated_at);
  const id = _.get(req, 'body.id');    
  db.query(customerInstance.updateCustomerByIdSQL(id), (err, data) => {    
    if (!err) {
      res.status(200).json({
        statusCode: '0000',
        message: "Customer updated successfully."
      });
    } else {
      res.status(400).json({
        message: "Bad request"
      });
    }
  });
});

router.post("/:id", passport.authenticate('jwt', { session: false }), (req, res, next) => {
  let id = _.get(req, 'params.id');   
  db.query(Customer.getCustomerByIdSQL(id), (err, data) => {    
    if (!err) {
      if (data && data.length==0){
        res.status(200).json({ statusCode: '404', message: "Product not found" });
      }else{
        res.status(200).json({ statusCode: '0000', customer: data[0] });
      }    
    } else {
      res.status(400).json({
        message: "Bad request"
      });
    }
  });
});

module.exports = router;