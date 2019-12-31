import express from "express";
import db from "../db/database";
import Product from "../queries/product";
import Util from "../common/util";
const router = express.Router();

router.get("/", (req, res, next) => {

    db.query(Product.getAllProductSQL(), (err, data)=> {
        if(!err) {
            res.status(200).json({
                message:"Products listed.",
                productId:data
            });
        }
    });    
});

router.post("/new", (req, res, next) => {
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

router.get("/:productId", (req, res, next) => {
    let pid = req.params.productId;

    db.query(Product.getProductByIdSQL(pid), (err, data)=> {
        if(!err) {
            if(data && data.length > 0) {
                
                res.status(200).json({
                    message:"Product found.",
                    product: data
                });
            } else {
                res.status(200).json({
                    message:"Product Not found."
                });
            }
        } 
    });    
});

router.post("/delete", (req, res, next) => {

    var pid = req.body.productId;

    db.query(Product.deleteProductByIdSQL(pid), (err, data)=> {
        if(!err) {
            if(data && data.affectedRows > 0) {
                res.status(200).json({
                    message:`Product deleted with id = ${pid}.`,
                    affectedRows: data.affectedRows
                });
            } else {
                res.status(200).json({
                    message:"Product Not found."
                });
            }
        } 
    });   
});

module.exports = router;