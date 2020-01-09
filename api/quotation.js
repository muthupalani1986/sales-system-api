import express from "express";
import db from "../db/database";
import Quotation from "../queries/quotation";
import Order from "../queries/order";
import config from '../configuration/config';
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
var _ = require('lodash');
const moment = require('moment');
import Util from "../common/util";
router.post("/", passport.authenticate('jwt', { session: false }), (req, res, next) => {  
  db.query(Quotation.getAllQuotationSQL(), (err, data) => {
    if (!err) {
      res.status(200).json({
      statusCode: '0000',
      quotations: data
      });
    } else {
      res.status(400).json({
        message: "Bad request"
      });
    }

  });

});
router.post("/new", passport.authenticate('jwt', { session: false }), async (req, res, next) => { 
  
  async function fetLastQuotationDetails() {
    return new Promise((resolve, reject) => {
      db.query(Quotation.getLastQuotationSQL(), (err, data) => {
        if (!err) {
          if (data && data[0]){
            const res = Object.assign({}, data[0]);
            resolve(res);
          }else{
            resolve();
          }          
        }else{
          reject();
        }
      });
    });
    
  }
  const recentQuotationDetails = await fetLastQuotationDetails().catch((err) => {
    res.status(400).json({
      message: "Bad request"
    });
  });

  let inv_number;
  const quotationDetails = Util.getQuotationDetails(req);
  if (recentQuotationDetails){
    inv_number = Util.nextInvNumber(recentQuotationDetails.inv_number);
  }else{
    inv_number = "INV-001";
  }    
  
  async function saveQuotation() {
    return new Promise((resolve, reject) => {
      const quotationDetails = Util.getQuotationDetails(req);
      quotationDetails.inv_number = inv_number;
      const quotationInstance = new Quotation(quotationDetails.inv_number, quotationDetails.status, quotationDetails.note, quotationDetails.order_tax, quotationDetails.order_discount, quotationDetails.shipping_cost, quotationDetails.grand_total, quotationDetails.customer_id, quotationDetails.created_at, quotationDetails.updated_at);   
      db.query(quotationInstance.addQuotationSQL(), (err, data) => {
        if (!err) {
          resolve({ "id": data.insertId });
        } else {
          reject();
        }
      });
    });
  }

  const newQuotationDetails = await saveQuotation().catch((err) => {
    res.status(400).json({
      message: "Bad request"
    });
  });

  async function saveOrders() {
    return new Promise((resolve, reject) => {
      const columnValues = [];
      const orders = _.get(req, 'body.orders', []);
      _.forEach(orders, (orderDetails) => {
        const order = [];
        order.push(newQuotationDetails.id);
        order.push(orderDetails.product_id);
        order.push(orderDetails.quantity);
        order.push(orderDetails.unit_price);
        order.push(orderDetails.discount);
        order.push(orderDetails.tax);
        order.push(orderDetails.total);
        const timeStamp = moment().format("YYYY-MM-DD HH:mm:ss");
        order.push(timeStamp);
        order.push(timeStamp);
        columnValues.push(order);
      });
      db.bulkInsert(Order.addOrderSQL(), columnValues, (err, data) => {
        if (!err) {
          resolve();
        } else {
          reject();
        }
      });
    });
  }

  const newOrderDetails = await saveOrders().catch((err) => {
    res.status(400).json({
      message: "Bad request"
    });
  });
  
  res.status(200).json({
    statusCode: '0000',
    message: "Quotation added successfully.",
    id: newQuotationDetails.id
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