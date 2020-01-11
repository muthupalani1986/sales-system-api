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
const PDFDocument = require('pdfkit');

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

router.post("/delete", passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  const id = _.get(req, 'body.id'); 
  async function deleteQuotation() {
    return new Promise((resolve, reject) => {
      db.query(Quotation.deleteQuotationByIdSQL(id), (err, data) => {
        if (!err) {
          if (data && data.affectedRows > 0) {
            resolve('2000');
          } else {
            resolve('404');
          }
        } else {
          reject();
        }

      });
    });
  }
    const deleteQuotationStatus = await deleteQuotation().catch((err) => {
      res.status(400).json({
        message: "Bad request"
      });
    });  

  async function deleteOrders() {
    return new Promise((resolve, reject) => {
      db.query(Order.deleteOrdersByQuotationId(id), (err, data) => {
        if (!err) {
          if (data && data.affectedRows > 0) {
            resolve('2000');
          } else {
            resolve('404');
          }
        } else {
          reject();
        }

      });
    });
  }
  const deleteOrderStatus = await deleteOrders().catch((err) => {
    res.status(400).json({
      message: "Bad request"
    });
  });

  if (deleteOrderStatus == '404' || deleteQuotationStatus=='404') {
    res.status(200).json({
      statusCode: '404',
      message: "Quotation not found"
    });
  }else{
    res.status(200).json({
      statusCode: '0000',
      message: `Quotation deleted successfully.`
    });
  }

});

router.post("/update", passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  const id = _.get(req, 'body.id');
  async function updateQuotation() {
    return new Promise((resolve, reject) => {
      const quotationDetails = Util.getQuotationDetails(req);
      quotationDetails.inv_number = '';
      const quotationInstance = new Quotation(quotationDetails.inv_number, quotationDetails.status, quotationDetails.note, quotationDetails.order_tax, quotationDetails.order_discount, quotationDetails.shipping_cost, quotationDetails.grand_total, quotationDetails.customer_id, quotationDetails.created_at, quotationDetails.updated_at);
      db.query(quotationInstance.updateQuotationByIdSQL(id), (err, data) => {
        if (!err) {
          resolve('200');
        } else {
          reject();
        }
      });
    });
  }

  const updateQuotationStatus=await updateQuotation().catch((err) => {
    
    res.status(400).json({
      message: "Bad request"
    });
  });

  async function deleteOrders() {
    return new Promise((resolve, reject) => {      
      db.query(Order.deleteOrdersByQuotationId(id), (err, data) => {
        if (!err) {
          resolve('200');
        } else {
          reject();
        }
      });
    });
  }
  let deleteOrderStatus;
  if (updateQuotationStatus=='200'){
    deleteOrderStatus=await deleteOrders().catch((err) => { 
      res.status(400).json({
        message: "Bad request"
      });
    });
  }


  async function saveOrders() {
    return new Promise((resolve, reject) => {
      const columnValues = [];
      const orders = _.get(req, 'body.orders', []);
      _.forEach(orders, (orderDetails) => {
        const order = [];
        order.push(orderDetails.quotation_id);
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
          resolve('200');
        } else {
          reject();
        }
      });
    });
  }


  if (deleteOrderStatus=='200'){
    const saveOrdersStatus=await saveOrders().catch((err) => {      
      res.status(400).json({
        message: "Bad request"
      });
    });
    if (saveOrdersStatus=='200'){
      res.status(200).json({
        statusCode: '0000',
        message: "Quotation updated successfully."
      });
    }
  }

   
});

router.post("/:id", passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  let id = _.get(req, 'params.id'); 

  async function getQuotation() {
    return new Promise((resolve, reject) => {      
      db.query(Quotation.getQuotationByIdSQL(id), (err, data) => {
        if (!err) {
          const response = Object.assign({}, data[0]);
          resolve(response);
        } else {
          reject();
        }
      });
    });
  }

  const getQuotationDetails = await getQuotation().catch((err) => {
    res.status(400).json({
      message: "Bad request"
    });
  });

  async function getOrder() {
    return new Promise((resolve, reject) => {
      db.query(Order.getOrdersByQuotationId(id), (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject();
        }
      });
    });
  }

  const getOrderDetails = await getOrder().catch((err) => {
    res.status(400).json({
      message: "Bad request"
    });
  });
  if (getQuotationDetails && getOrderDetails){
    const response={
      quotationDetails: getQuotationDetails,
      orderDetails: getOrderDetails
    }
    res.status(200).json(response);
  }
});

router.post("/generate-invoice/:id", passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  let id = _.get(req, 'params.id'); 
  const invoice = {
    company_details: config.company_details,
    shipping: {
      name: "",
      address: "",
      city: "",
      state: "",
      country: "",
      postal_code:""
    },    
    subtotal: 8000,
    paid: 0,
    invoice_nr:'',
    invoice_date:'',
    order_discount:0,
    shipping_cost:0,
    order_tax:0
  };

  async function getQuotation() {
    return new Promise((resolve, reject) => {
      db.query(Quotation.getQuotationByIdSQL(id), (err, data) => {
        if (!err) {
          const response = Object.assign({}, data[0]);
          resolve(response);
        } else {
          reject();
        }
      });
    });
  }

  const getQuotationDetails = await getQuotation().catch((err) => {
    res.status(400).json({
      message: "Bad request"
    });
  });

  async function getOrder() {
    return new Promise((resolve, reject) => {
      db.query(Order.getOrdersByQuotationId(id), (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject();
        }
      });
    });
  }

  const getOrderDetails = await getOrder().catch((err) => {
    res.status(400).json({
      message: "Bad request"
    });
  });
  
  invoice.shipping.name = getQuotationDetails.name;
  invoice.shipping.address = getQuotationDetails.address.replace(/(\r\n|\n|\r)/gm, ", ");;
  invoice.shipping.city = getQuotationDetails.city;
  invoice.shipping.state = getQuotationDetails.state;
  invoice.shipping.country = getQuotationDetails.country;
  invoice.invoice_nr = getQuotationDetails.inv_number;
  invoice.invoice_date = getQuotationDetails.created_at;
  invoice.order_discount = getQuotationDetails.order_discount;
  invoice.shipping_cost = getQuotationDetails.shipping_cost;
  invoice.order_tax = getQuotationDetails.order_tax;
  invoice.items = getOrderDetails;    
  const doc = new PDFDocument();
  let filename = getQuotationDetails.inv_number;
  filename = encodeURIComponent(filename) + '.pdf'
  res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
  res.setHeader('Content-type', 'application/pdf');  
  Util.generateHeader(doc, invoice);  
  Util.generateCustomerInformation(doc, invoice);
  Util.generateInvoiceTable(doc, invoice);
  //Util.generateFooter(doc);
  doc.pipe(res)
  doc.end()
});

module.exports = router;