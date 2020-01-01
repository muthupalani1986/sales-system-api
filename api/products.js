import express from "express";
import db from "../db/database";
import Product from "../queries/product";
import Util from "../common/util";
const passport = require('passport');
var _ = require('lodash');
const router = express.Router();
router.post("/", passport.authenticate('jwt', { session: false }), (req, res, next) => {    
     db.query(Product.getAllProductSQL(), (err, data)=> {
        if(!err) {
            const products=_.map(data,(product)=>{
                const buffer = new Buffer.from(product.image);
                const bufferBase64 = buffer.toString('utf-8');
                product.image = bufferBase64;
                return product;
            });
            res.status(200).json({
                statusCode: '0000',
                products: products
            });
        }else{
            res.status(400).json({
                message: "Bad request"
            });
        }
    });    
});

router.post("/new", passport.authenticate('jwt', { session: false }),(req, res, next) => {
    let product = Util.getProductDetails(req);    
    db.query(Product.getProductCountByCatSQL(product.category), (err, resCount) => {   
           if(err){
            res.status(400).json({
                message: "Bad request"
            });
        }else{
               const total = resCount[0].total+1;
               const totalString = total.toString();               
               const formattedTotal = totalString.padStart(2, '0');
               product.prod_code = product.prod_code + formattedTotal;               
               let productInstance = new Product(product.prod_name, product.description, product.category, product.image, product.sellingPrice, product.buyingPrice, product.taxRate, product.quantity, product.salesUnit, product.prod_code, product.created_at, product.updated_at);    
               db.query(productInstance.getAddProductSQL(), (err, data) => {
                   if (!err) {
                       res.status(200).json({
                           statusCode: '0000',
                           message: "Product added successfully.",
                           id: data.insertId
                       });
                   } else {
                       res.status(400).json({
                           message: "Bad request"
                       });
                   }
               });
        }
    });
      
});

router.post("/update", passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const product = Util.getProductDetails(req);
    let productInstance = new Product(product.prod_name, product.description, product.category, product.image, product.sellingPrice, product.buyingPrice, product.taxRate, product.quantity, product.salesUnit, product.prod_code, product.created_at, product.updated_at);    
    const id = _.get(req, 'body.id');
    db.query(productInstance.updateProductByIdSQL(id), (err, data) => {
        if (!err) {
            res.status(200).json({
                statusCode: '0000',
                message: "Product updated successfully."
            });
        } else {
            res.status(400).json({
                message: "Bad request"
            });
        }
    });
});

router.post("/delete", (req, res, next) => {
    const pid = _.get(req, 'body.id');
    db.query(Product.deleteProductByIdSQL(pid), (err, data)=> {
        if(!err) {
            if(data && data.affectedRows > 0) {
                res.status(200).json({
                    statusCode: '0000',
                    message:`Product deleted successfully.`,
                    affectedRows: data.affectedRows
                });
            } else {
                res.status(200).json({
                    statusCode: '404',
                    message:"Product Not found."
                });
            }
        }else{
            res.status(400).json({
                message: "Bad request"
            });
        } 
    });   
});

router.get("/:productId", (req, res, next) => {
    let pid = req.params.productId;

    db.query(Product.getProductByIdSQL(pid), (err, data) => {
        if (!err) {
            if (data && data.length > 0) {

                res.status(200).json({
                    message: "Product found.",
                    product: data
                });
            } else {
                res.status(200).json({
                    message: "Product Not found."
                });
            }
        }
    });
});
module.exports = router;