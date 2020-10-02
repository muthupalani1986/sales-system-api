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
    const amz_payments = _.get(req.body, 'amz_payments', []);
    let sqlQuery = 'INSERT INTO amz_payment (`settlement_id`,`settlement_start_date`,`settlement_end_date`,`deposit_date`,`total_amount` , `currency` , `transaction_type` , `order_id` , `merchant_order_id` , `adjustment_id` , `shipment_id` , `marketplace_name` , `shipment_fee_type` , `shipment_fee_amount` , `order_fee_type` , `order_fee_amount` , `fulfillment_id` , `posted_date` , `order_item_code` , `merchant_order_item_id` , `merchant_adjustment_item_id` , `sku` , `quantity_purchased` , `price_type` , `price_amount` , `item_related_fee_type` , `item_related_fee_amount` , `misc_fee_amount` , `other_fee_amount` , `other_fee_reason_description` , `promotion_id` , `promotion_type` , `promotion_amount` , `direct_payment_type` , `direct_payment_amount` , `other_amount`,`transfer_type`) VALUES ?';
    let sqlColumnValues = [];
    _.forEach(amz_payments, (column) => {
        let columnValue = [];
        const settlement_id = !column["settlement_id"] ? null : column["settlement_id"];
        columnValue.push(settlement_id);
        const settlement_start_date = !column["settlement_start_date"] ? null : column["settlement_start_date"];
        columnValue.push(settlement_start_date);
        const settlement_end_date = !column["settlement_end_date"] ? null : column["settlement_end_date"];
        columnValue.push(settlement_end_date);
        const deposit_date = !column["deposit_date"] ? null : column["deposit_date"];
        columnValue.push(deposit_date);
        const total_amount = !column["total_amount"] ? null : column["total_amount"];
        columnValue.push(total_amount);
        const currency = !column["currency"] ? null : column["currency"];
        columnValue.push(currency);
        const transaction_type = !column["transaction_type"] ? null : column["transaction_type"];
        columnValue.push(transaction_type);
        const order_id = !column["order_id"] ? null : column["order_id"];
        columnValue.push(order_id);
        const merchant_order_id = !column["merchant_order_id"] ? null : column["merchant_order_id"];
        columnValue.push(merchant_order_id);
        const adjustment_id = !column["adjustment_id"] ? null : column["adjustment_id"];
        columnValue.push(adjustment_id);
        const shipment_id = !column["shipment_id"] ? null : column["shipment_id"];
        columnValue.push(shipment_id);
        const marketplace_name = !column["marketplace_name"] ? null : column["marketplace_name"];
        columnValue.push(marketplace_name);
        const shipment_fee_type = !column["shipment_fee_type"] ? null : column["shipment_fee_type"];
        columnValue.push(shipment_fee_type);
        const shipment_fee_amount = !column["shipment_fee_amount"] ? null : column["shipment_fee_amount"];
        columnValue.push(shipment_fee_amount);
        const order_fee_type = !column["order_fee_type"] ? null : column["order_fee_type"];
        columnValue.push(order_fee_type);
        const order_fee_amount = !column["order_fee_amount"] ? null : column["order_fee_amount"];
        columnValue.push(order_fee_amount);
        const fulfillment_id = !column["fulfillment_id"] ? null : column["fulfillment_id"];
        columnValue.push(fulfillment_id);
        const posted_date = !column["posted_date"] ? null : column["posted_date"];
        columnValue.push(posted_date);
        const order_item_code = !column["order_item_code"] ? null : column["order_item_code"];
        columnValue.push(order_item_code);
        const merchant_order_item_id = !column["merchant_order_item_id"] ? null : column["merchant_order_item_id"];
        columnValue.push(merchant_order_item_id);
        const merchant_adjustment_item_id = !column["merchant_adjustment_item_id"] ? null : column["merchant_adjustment_item_id"];
        columnValue.push(merchant_adjustment_item_id);
        const sku = !column["sku"] ? null : column["sku"];
        columnValue.push(sku);
        const quantity_purchased = !column["quantity_purchased"] ? null : column["quantity_purchased"];
        columnValue.push(quantity_purchased);
        const price_type = !column["price_type"] ? null : column["price_type"];
        columnValue.push(price_type);
        const price_amount = !column["price_amount"] ? null : column["price_amount"];
        columnValue.push(price_amount);
        const item_related_fee_type = !column["item_related_fee_type"] ? null : column["item_related_fee_type"];
        columnValue.push(item_related_fee_type);
        const item_related_fee_amount = !column["item_related_fee_amount"] ? null : column["item_related_fee_amount"];
        columnValue.push(item_related_fee_amount);
        const misc_fee_amount = !column["misc_fee_amount"] ? null : column["misc_fee_amount"];
        columnValue.push(misc_fee_amount);
        const other_fee_amount = !column["other_fee_amount"] ? null : column["other_fee_amount"];
        columnValue.push(other_fee_amount);
        const other_fee_reason_description = !column["other_fee_reason_description"] ? null : column["other_fee_reason_description"];
        columnValue.push(other_fee_reason_description);
        const promotion_id = !column["promotion_id"] ? null : column["promotion_id"]
        columnValue.push(promotion_id);
        const promotion_type = !column["promotion_type"] ? null : column["promotion_type"];
        columnValue.push(promotion_type);
        const promotion_amount = !column["promotion_amount"] ? null : column["promotion_amount"];
        columnValue.push(promotion_amount);
        const direct_payment_type = !column["direct_payment_type"] ? null : column["direct_payment_type"];
        columnValue.push(direct_payment_type);
        const direct_payment_amount = !column["direct_payment_amount"] ? null : column["direct_payment_amount"];
        columnValue.push(direct_payment_amount);
        const other_amount = !column["other_amount"] ? null : column["other_amount"];
        columnValue.push(other_amount);
        const transfer_type = !column["transfer_type"] ? null : column["transfer_type"];
        columnValue.push(transfer_type);
        sqlColumnValues.push(columnValue);
    });
    db.bulkInsert(sqlQuery, sqlColumnValues, (err, data) => {
        if (!err) {
            res.status(200).json({
                statusCode: '0000',
                msg: "Payment details added successfully."
            });
        } else {
            res.status(400).json({
                msg: "Bad request"
            });
        }

    });

});

module.exports = router;