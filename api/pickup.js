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

router.post("/new", passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const amz_payments = _.get(req.body, 'pickups', []);
    let sqlQuery = 'INSERT INTO pickup (`order_id`,`tracking_id`,`purchase_date`,`picked_up_date`,`asin`,`sku`,`product_name`,`quantity_purchased`,`invoice_id`,`package_identifier`,`ship_service_level`,`pickup_slot`,`order_item_id`,`ship_postal_code`,`ship_country`,`ship_city`,`ship_state`,`carrier`,`Uploaded_on`) VALUES ?';
    let sqlColumnValues = [];
    _.forEach(amz_payments, (column) => {
        let columnValue = [];
        const order_id = !column["order_id"] ? null : column["order_id"];
        columnValue.push(order_id);
        const tracking_id = !column["tracking_id"] ? null : column["tracking_id"];
        columnValue.push(tracking_id);
        const purchase_date = !column["purchase_date"] ? null : column["purchase_date"];
        columnValue.push(purchase_date);
        const picked_up_date = !column["picked_up_date"] ? null : column["picked_up_date"];
        columnValue.push(picked_up_date);
        const asin = !column["asin"] ? null : column["asin"];
        columnValue.push(asin);
        const sku = !column["sku"] ? null : column["sku"];
        columnValue.push(sku);
        const product_name = !column["product_name"] ? null : column["product_name"];
        columnValue.push(product_name);
        const quantity_purchased = !column["quantity_purchased"] ? null : column["quantity_purchased"];
        columnValue.push(quantity_purchased);
        const invoice_id = !column["invoice_id"] ? null : column["invoice_id"];
        columnValue.push(invoice_id);
        const package_identifier = !column["package_identifier"] ? null : column["package_identifier"];
        columnValue.push(package_identifier);
        const ship_service_level = !column["ship_service_level"] ? null : column["ship_service_level"];
        columnValue.push(ship_service_level);
        const pickup_slot = !column["pickup_slot"] ? null : column["pickup_slot"];
        columnValue.push(pickup_slot);
        const order_item_id = !column["order_item_id"] ? null : column["order_item_id"];
        columnValue.push(order_item_id);
        const ship_postal_code = !column["ship_postal_code"] ? null : column["ship_postal_code"];
        columnValue.push(ship_postal_code);
        const ship_country = !column["ship_country"] ? null : column["ship_country"];
        columnValue.push(ship_country);
        const ship_city = !column["ship_city"] ? null : column["ship_city"];
        columnValue.push(ship_city);
        const ship_state = !column["ship_state"] ? null : column["ship_state"];
        columnValue.push(ship_state);
        const carrier = !column["carrier"] ? null : column["carrier"];
        columnValue.push(carrier);
        const Uploaded_on = !column["Uploaded_on"] ? null : column["Uploaded_on"];
        columnValue.push(Uploaded_on);
        sqlColumnValues.push(columnValue);
    });
    db.bulkInsert(sqlQuery, sqlColumnValues, (err, data) => {
        if (!err) {
            res.status(200).json({
                statusCode:'0000',
                msg: "Pickup details added successfully."
            });
        } else {
            res.status(400).json({
                msg: "Bad request"
            });
        }

    });

});

module.exports = router;