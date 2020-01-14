import express from "express";
import db from "../db/database";
import Quotation from "../queries/quotation";
import Product from "../queries/product";
import Order from "../queries/order";
import config from '../configuration/config';
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
var _ = require('lodash');
const moment = require('moment');
import Util from "../common/util";
const PDFDocument = require('pdfkit');

router.post("/", passport.authenticate('jwt', { session: false }), async (req, res, next) => {  
  db.query(Quotation.getAllQuotationSQL(), async (err, data) => {
    if (!err) {
      
      const functionWithPromise = async item => { //a function that returns a promise
        const orders=await Util.getOrder(item.id);
        item['orders'] = orders;
        return Promise.resolve(item)
      }

      const anAsyncFunction = async item => {
        return functionWithPromise(item)
      }

      const getQuotations = async () => {
        return Promise.all(data.map(item => anAsyncFunction(item)))
      }

      getQuotations().then(data => {
        res.status(200).json({
          statusCode: '0000',
          quotations: data
        });
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
  let isFetchQuotationFailed = false;
  const recentQuotationDetails = await fetLastQuotationDetails().catch((err) => {
    isFetchQuotationFailed=true;
  });

  let quotation_number;  
  if (recentQuotationDetails){
    quotation_number = Util.nextInvNumber(recentQuotationDetails.quotation_number);
  }else{
    quotation_number = "QUO-0000001";
  }

  async function saveQuotation() {
    return new Promise((resolve, reject) => {
      const quotationDetails = Util.getQuotationDetails(req);
    quotationDetails.quotation_number = quotation_number;
    const quotationInstance = new Quotation(quotationDetails.quotation_number, quotationDetails.note, quotationDetails.order_tax, quotationDetails.order_discount, quotationDetails.shipping_cost, quotationDetails.customer_id, quotationDetails.created_at, quotationDetails.updated_at);   
      db.query(quotationInstance.addQuotationSQL(), (err, data) => {
        if (!err) {
          resolve({ "id": data.insertId });
        } else {
          reject();
        }
      });
    });
  }
  let isSaveQuotationFailed = false;
  const newQuotationDetails = await saveQuotation().catch((err) => {
    isSaveQuotationFailed=true;
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
  let isSaveOrderFailed = false;
  const newOrderDetails = await saveOrders().catch((err) => {
    isSaveOrderFailed=true
  });  

  if (!isFetchQuotationFailed && !isSaveOrderFailed && !isSaveQuotationFailed) {
    res.status(200).json({
      statusCode: '0000',
      message: "Quotation added successfully.",
      id: newQuotationDetails.id,
      quotation_number: quotation_number
    });
  }else{
    res.status(400).json({
      message: "Bad request"
    });
  } 

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
  let isDeleteQuotationFailed = false;
    const deleteQuotationStatus = await deleteQuotation().catch((err) => {
      isDeleteQuotationFailed =true;
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
  let deleteOrderFailed = false;
  const deleteOrderStatus = await deleteOrders().catch((err) => {
    deleteOrderFailed=true;
  });

  if (deleteOrderFailed || isDeleteQuotationFailed) {
    res.status(400).json({
      message: "Bad request"
    });
  }else{
    if (deleteOrderStatus == '404' || deleteQuotationStatus == '404') {
      res.status(200).json({
        statusCode: '404',
        message: "Quotation not found"
      });
    } else {
      res.status(200).json({
        statusCode: '0000',
        message: `Quotation deleted successfully.`
      });
    }
  }

});

router.post("/update", passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  const id = _.get(req, 'body.id');
  async function updateQuotation() {
    return new Promise((resolve, reject) => {
      const quotationDetails = Util.getQuotationDetails(req);
    quotationDetails.quotation_number = '';
    const quotationInstance = new Quotation(quotationDetails.quotation_number, quotationDetails.note, quotationDetails.order_tax, quotationDetails.order_discount, quotationDetails.shipping_cost, quotationDetails.customer_id, quotationDetails.created_at, quotationDetails.updated_at);
      db.query(quotationInstance.updateQuotationByIdSQL(id), (err, data) => {
        if (!err) {          
          if (data && data.affectedRows > 0) {
            resolve('200');
          }else{
            resolve('404');
          }
        } else {
          reject();
        }
      });
    });
  }
  let isUpdateQuotionFailed = false;
  const updateQuotationStatus=await updateQuotation().catch((err) => {
       isUpdateQuotionFailed=true;
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
  
  let isDeleteOrderFailed = false;
  if (!isUpdateQuotionFailed && updateQuotationStatus==='200') {
    const deleteOrderStatus=await deleteOrders().catch((err) => { 
      isDeleteOrderFailed=true;
    });
  }


  async function saveOrders() {
    return new Promise((resolve, reject) => {
      const columnValues = [];
      const orders = _.get(req, 'body.orders', []);
      _.forEach(orders, (orderDetails) => {
        const order = [];
        order.push(id);
        order.push(orderDetails.product_id);
        order.push(orderDetails.quantity);
        order.push(orderDetails.unit_price);
        order.push(orderDetails.discount);
        order.push(orderDetails.tax);
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

  if (!isDeleteOrderFailed && updateQuotationStatus === '200') {
    let isSaveOrderFailed = false;
    const saveOrdersStatus=await saveOrders().catch((err) => {      
    isSaveOrderFailed=true;
    });
    if (!isSaveOrderFailed) {
      res.status(200).json({
        statusCode: '0000',
        message: "Quotation updated successfully."
      });
    }else{
      res.status(400).json({
       message: "Bad request"
      });
    }
  }else{
    res.status(400).json({
      message: "Bad request"
    });
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
  let isGetQuotationFailed = false;
  const getQuotationDetails = await getQuotation().catch((err) => {
    isGetQuotationFailed=true;
  });

  async function getOrder() {
    return new Promise((resolve, reject) => {
      db.query(Order.getOrdersByQuotationId(id), (err, data) => {
      if (!err && data && data.length>0) {
          resolve(data);
        } else {
          reject();
        }
      });
    });
  }
  let isGetOrderFailed = false;
  const getOrderDetails = await getOrder().catch((err) => {
    isGetOrderFailed=true;
  });

  if (isGetQuotationFailed || isGetOrderFailed){
    res.status(400).json({
      message: "Bad request"
    });
  }else{    
    const response = {
    statusCode: '0000',
    };    
    response.quotation = getQuotationDetails;
    response.quotation.orders = getOrderDetails;
    res.status(200).json(response);
  }
});

router.get("/generate-invoice/:id",  async (req, res, next) => {
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
    
    invoice_nr:'',
    invoice_date:'',
    order_discount:0,
    shipping_cost:0,
    order_tax:0,
    status:1
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
  let isGetQuoteFailed = false;
  const getQuotationDetails = await getQuotation().catch((err) => {
    isGetQuoteFailed=true;
  });

  async function getOrder() {
    return new Promise((resolve, reject) => {
      db.query(Order.getOrdersByQuotationId(id), (err, data) => {
      if (!err && data && data.length>0) {
          resolve(data);
        } else {
          reject();
        }
      });
    });
  }
  let isGetOrderFailed = false;
  const getOrderDetails = await getOrder().catch((err) => {
    isGetOrderFailed = true;
  });

  const canGenPdf = !isGetQuoteFailed && !isGetOrderFailed;
  if (canGenPdf) {
    invoice.status = getQuotationDetails.status;
    invoice.shipping.name = getQuotationDetails.name;
    invoice.shipping.address = getQuotationDetails.address.replace(/(\r\n|\n|\r)/gm, ", ");;
    invoice.shipping.city = getQuotationDetails.city;
    invoice.shipping.state = getQuotationDetails.state;
    invoice.shipping.country = getQuotationDetails.country;
    invoice.invoice_nr = getQuotationDetails.status == 2 ? getQuotationDetails.inv_number : getQuotationDetails.quotation_number;
    invoice.quotation_number = getQuotationDetails.quotation_number;
    invoice.invoice_date = getQuotationDetails.created_at;
    invoice.order_discount = getQuotationDetails.order_discount;
    invoice.shipping_cost = getQuotationDetails.shipping_cost;
    invoice.order_tax = getQuotationDetails.order_tax;
    invoice.items = getOrderDetails;
    const doc = new PDFDocument();
    let filename = getQuotationDetails.status == 2 ? getQuotationDetails.inv_number : getQuotationDetails.quotation_number;
    filename = encodeURIComponent(filename) + '.pdf'
    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
    res.setHeader('Content-type', 'application/pdf');
    Util.generateHeader(doc, invoice);
    Util.generateCustomerInformation(doc, invoice);
    Util.generateInvoiceTable(doc, invoice);
    //Util.generateFooter(doc);
    doc.pipe(res)
    doc.end()
  }else{
    res.status(400).json({
      message: "Bad request"
    });
  }
});

router.post("/create-sales/:quotation_id", passport.authenticate('jwt', { session: false }), async (req, res, next) => { 
  const quotation_id = _.get(req, 'params.quotation_id');

  async function getQuotation() {
    return new Promise((resolve, reject) => {
    db.query(Quotation.getQuotationByIdSQL(quotation_id), (err, data) => {
        if (!err) {
          const response = Object.assign({}, data[0]);
          resolve(response);
        } else {
          reject();
        }
      });
    });
  }

  let isGetQuotationFailed = false;
  const getQuotationDetails = await getQuotation().catch((err) => {
    isGetQuotationFailed = true;
  });

  async function fetchLastQuotationDetails() {
    return new Promise((resolve, reject) => {
      db.query(Quotation.getLastQuotationSQL(2), (err, data) => {
        if (!err) {
          if (data && data[0]) {
            const res = Object.assign({}, data[0]);
            resolve(res);
          } else {
            resolve();
          }
        } else {
          reject();
        }
      });
    });

  }
  let isFetchQuotationFailed = false;
  const recentQuotationDetails = await fetchLastQuotationDetails().catch((err) => {
    isFetchQuotationFailed = true;
  });

  let invoice_number;
  if (recentQuotationDetails) {
    invoice_number = Util.nextInvNumber(recentQuotationDetails.inv_number);
  } else {
    invoice_number = "INV-0000001";
  }

  async function crateSales() {
    return new Promise((resolve, reject) => {
    db.query(Quotation.createSalesByQuotationId(quotation_id, invoice_number), (err, data) => {    
        if (!err) {
          if (data && data.affectedRows > 0) {
            resolve('200');
          } else {
            resolve('404');
          }
        } else {
            reject(err);
        }
      });
    });
  }

  async function getOrder() {
    return new Promise((resolve, reject) => {
    db.query(Order.getOrdersByQuotationId(quotation_id), (err, data) => {
        if (!err && data && data.length > 0) {
          resolve(data);
        } else {
          reject();
        }
      });
    });
  }
  let isGetOrderFailed = false;
  const getOrderDetails = await getOrder().catch((err) => {
    isGetOrderFailed = true;
  });

  async function updateStock() {
    return new Promise((resolve, reject) => {
      _.forEach(getOrderDetails, function(order, index) {
          db.query(Product.updateStockByProdIdSQL(order.product_id, order.quantity), (err, data) => {
            if(err){
              reject(err);
            }
          });
          if (getOrderDetails.length == index + 1) {
            resolve('200');
          }
      });
    });
  }

  if (getQuotationDetails && getQuotationDetails.status==1){
    if (!isFetchQuotationFailed) {
      let isSalesCreationFailed = false;
      const crateSalesStatus = await crateSales().catch((err) => {
        isSalesCreationFailed = true;
      });
      if (!isSalesCreationFailed){        
        const updateStockStatus = await updateStock().catch((err) => {});
      }       

      if (crateSalesStatus === '200') {
        res.status(200).json({
          statusCode: '0000',
          message: "Invoice created successfully.",
          invoice_number: invoice_number
        });
      } else if (crateSalesStatus === '404') {
        res.status(200).json({
          statusCode: '404',
          message: "Quotation not found"
        });
      } else {
        res.status(400).json({
          message: "Bad request"
        });
      }
    }
  }else{
    res.status(200).json({
    statusCode: '405',
      message: "Invoice already created"
    });
  }  

  
});

module.exports = router;