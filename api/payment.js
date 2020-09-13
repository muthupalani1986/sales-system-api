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
    let sqlQuery = 'INSERT INTO amz_payment (`settlement-id`,`settlement-start-date`,`settlement-end-date`,`deposit-date`,`total-amount` , `currency` , `transaction-type` , `order-id` , `merchant-order-id` , `adjustment-id` , `shipment-id` , `marketplace-name` , `shipment-fee-type` , `shipment-fee-amount` , `order-fee-type` , `order-fee-amount` , `fulfillment-id` , `posted-date` , `order-item-code` , `merchant-order-item-id` , `merchant-adjustment-item-id` , `sku` , `quantity-purchased` , `price-type` , `price-amount` , `item-related-fee-type` , `item-related-fee-amount` , `misc-fee-amount` , `other-fee-amount` , `other-fee-reason-description` , `promotion-id` , `promotion-type` , `promotion-amount` , `direct-payment-type` , `direct-payment-amount` , `other-amount`) VALUES ?';
    let sqlColumnValues = [];
    _.forEach(amz_payments, (column) => {
        let columnValue = [];
        const settlement_id = !column["settlement-id"] ? null : column["settlement-id"];
        columnValue.push(settlement_id);
        const settlement_start_date = !column["settlement-start-date"] ? null : column["settlement-start-date"];
        columnValue.push(settlement_start_date);
        const settlement_end_date = !column["settlement-end-date"] ? null : column["settlement-end-date"];
        columnValue.push(settlement_end_date);
        const deposit_date = !column["deposit-date"] ? null : column["deposit-date"];
        columnValue.push(deposit_date);
        const total_amount = !column["total-amount"] ? null : column["total-amount"];
        columnValue.push(total_amount);
        const currency = !column["currency"] ? null : column["currency"];
        columnValue.push(currency);
        const transaction_type = !column["transaction-type"] ? null : column["transaction-type"];
        columnValue.push(transaction_type);
        const order_id = !column["order-id"] ? null : column["order-id"];
        columnValue.push(order_id);
        const merchant_order_id = !column["merchant-order-id"] ? null : column["merchant-order-id"];
        columnValue.push(merchant_order_id);
        const adjustment_id = !column["adjustment-id"] ? null : column["adjustment-id"];
        columnValue.push(adjustment_id);
        const shipment_id = !column["shipment-id"] ? null : column["shipment-id"];
        columnValue.push(shipment_id);
        const marketplace_name = !column["marketplace-name"] ? null : column["marketplace-name"];
        columnValue.push(marketplace_name);
        const shipment_fee_type = !column["shipment-fee-type"] ? null : column["shipment-fee-type"];
        columnValue.push(shipment_fee_type);
        const shipment_fee_amount = !column["shipment-fee-amount"] ? null : column["shipment-fee-amount"];
        columnValue.push(shipment_fee_amount);
        const order_fee_type = !column["order-fee-type"] ? null : column["order-fee-type"];
        columnValue.push(order_fee_type);
        const order_fee_amount = !column["order-fee-amount"] ? null : column["order-fee-amount"];
        columnValue.push(order_fee_amount);
        const fulfillment_id = !column["fulfillment-id"] ? null : column["fulfillment-id"];
        columnValue.push(fulfillment_id);
        const posted_date = !column["posted-date"] ? null : column["posted-date"];
        columnValue.push(posted_date);
        const order_item_code = !column["order-item-code"] ? null : column["order-item-code"];
        columnValue.push(order_item_code);
        const merchant_order_item_id = !column["merchant-order-item-id"] ? null : column["merchant-order-item-id"];
        columnValue.push(merchant_order_item_id);
        const merchant_adjustment_item_id = !column["merchant-adjustment-item-id"] ? null : column["merchant-adjustment-item-id"];
        columnValue.push(merchant_adjustment_item_id);
        const sku = !column["sku"] ? null : column["sku"];
        columnValue.push(sku);
        const quantity_purchased = !column["quantity-purchased"] ? null : column["quantity-purchased"];
        columnValue.push(quantity_purchased);
        const price_type = !column["price-type"] ? null : column["price-type"];
        columnValue.push(price_type);
        const price_amount = !column["price-amount"] ? null : column["price-amount"];
        columnValue.push(price_amount);
        const item_related_fee_type = !column["item-related-fee-type"] ? null : column["item-related-fee-type"];
        columnValue.push(item_related_fee_type);
        const item_related_fee_amount = !column["item-related-fee-amount"] ? null : column["item-related-fee-amount"];
        columnValue.push(item_related_fee_amount);
        const misc_fee_amount = !column["misc-fee-amount"] ? null : column["misc-fee-amount"];
        columnValue.push(misc_fee_amount);
        const other_fee_amount = !column["other-fee-amount"] ? null : column["other-fee-amount"];
        columnValue.push(other_fee_amount);
        const other_fee_reason_description = !column["other-fee-reason-description"] ? null : column["other-fee-reason-description"];
        columnValue.push(other_fee_reason_description);
        const promotion_id = !column["promotion-id"] ? null : column["promotion-id"]
        columnValue.push(promotion_id);
        const promotion_type = !column["promotion-type"] ? null : column["promotion-type"];
        columnValue.push(promotion_type);
        const promotion_amount = !column["promotion-amount"] ? null : column["promotion-amount"];
        columnValue.push(promotion_amount);
        const direct_payment_type = !column["direct-payment-type"] ? null : column["direct-payment-type"];
        columnValue.push(direct_payment_type);
        const direct_payment_amount = !column["direct-payment-amount"] ? null : column["direct-payment-amount"];
        columnValue.push(direct_payment_amount);
        const other_amount = !column["other-amount"] ? null : column["other-amount"];
        columnValue.push(other_amount);
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