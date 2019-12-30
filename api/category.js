import express from "express";
import db from "../db/database";
import Category from "../queries/category";
import config from '../configuration/config';
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
var _ = require('lodash');
const moment = require('moment');
import Util from "../common/util";
router.post("/", passport.authenticate('jwt', { session: false }), (req, res, next) => {  
  db.query(Category.getAllCategorySQL(), (err, data) => {
    if (!err) {
      res.status(200).json({
      statusCode: '0000',
      categories: data
      });
    } else {
      res.status(400).json({
        message: "Bad request"
      });
    }

  });

});
router.post("/new", passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const categoryDetails = Util.getCategoryDetails(req);
  const newCategory = new Category(categoryDetails.category_name, categoryDetails.created_at, categoryDetails.updated_at);
  db.query(newCategory.addCategorySQL(), (err, data) => {
    if (!err) {    
         res.status(200).json({
        statusCode:'0000',
        message: "Category added successfully.",
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
  db.query(Category.deleteCategoryByIdSQL(id), (err, data) => {    
    if (!err) {
      res.status(200).json({
      statusCode: '0000',
        message: "Category deleted successfully."
      });
    } else {
      res.status(400).json({
        message: "Bad request"
      });
    }
  });
});

router.post("/update", passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const categoryDetails=Util.getCategoryDetails(req);
  const category = new Category(categoryDetails.category_name, categoryDetails.created_at, categoryDetails.updated_at);
  const id = _.get(req, 'body.id');    
  db.query(category.updateCategoryByIdSQL(id), (err, data) => {    
    if (!err) {
      res.status(200).json({
      statusCode: '0000',
        message: "Category updated successfully."
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
  db.query(Category.getCategoryByIdSQL(id), (err, data) => {    
    if (!err) {
    res.status(200).json({ statusCode: '0000', category: data[0]});
    } else {
      res.status(400).json({
        message: "Bad request"
      });
    }
  });
});

module.exports = router;