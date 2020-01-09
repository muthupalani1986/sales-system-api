var _ = require('lodash');
const moment = require('moment');
class Util {
    constructor() {

    }
    static getUserDetails(req) {
        const userDetails = {};
        userDetails.first_name = _.get(req, 'body.first_name');
        userDetails.last_name = _.get(req, 'body.last_name');
        userDetails.email_id = _.get(req, 'body.email_id');
        userDetails.role_id = _.get(req, 'body.role_id');
        userDetails.password = _.get(req, 'body.password');
        userDetails.created_at = userDetails.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
        return userDetails;
    }
    static getCategoryDetails(req) {
        const categoryDetails = {};
        categoryDetails.category_name = _.get(req, 'body.category_name');
        categoryDetails.created_at = categoryDetails.updated_at =  moment().format("YYYY-MM-DD HH:mm:ss");
        return categoryDetails;
    }
    static getProductDetails(req) {
        const productDetails = {};
        productDetails.prod_name = _.get(req, 'body.name');
        productDetails.description = _.get(req, 'body.description');
        productDetails.category = _.get(req, 'body.category');
        productDetails.image = _.get(req, 'body.image');
        productDetails.sellingPrice = _.get(req, 'body.sellingPrice');
        productDetails.buyingPrice = _.get(req, 'body.buyingPrice');
        productDetails.taxRate = _.get(req, 'body.taxRate');
        productDetails.quantity = _.get(req, 'body.quantity');
        productDetails.salesUnit = _.get(req, 'body.salesUnit');
        productDetails.prod_code = _.get(req, 'body.code');
        productDetails.created_at = productDetails.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
        return productDetails;
    }
    static getCustomerDetails(req) {
        const customerDetails = {};
        customerDetails.name = _.get(req, 'body.name');
        customerDetails.company_name = _.get(req, 'body.company_name','');
        customerDetails.email = _.get(req, 'body.email','');
        customerDetails.phone_number = _.get(req, 'body.phone_number','');
        customerDetails.address = _.get(req, 'body.address','');
        customerDetails.city = _.get(req, 'body.city','');
        customerDetails.state = _.get(req, 'body.state', '');
        customerDetails.postal_code = _.get(req, 'body.postal_code','');
        customerDetails.country = _.get(req, 'body.country','');
        customerDetails.created_at = customerDetails.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
        return customerDetails;
    }
    static getQuotationDetails(req) {
        const quotationDetails = {};
        quotationDetails.status = _.get(req, 'body.status');
        quotationDetails.note = _.get(req, 'body.note');
        quotationDetails.order_tax = _.get(req, 'body.order_tax',0.00);
        quotationDetails.order_discount = _.get(req, 'body.order_discount',0.00);
        quotationDetails.shipping_cost = _.get(req, 'body.shipping_cost',0.00);
        quotationDetails.grand_total = _.get(req, 'body.grand_total',0.00);
        quotationDetails.customer_id = _.get(req, 'body.customer_id',0);
        quotationDetails.created_at = quotationDetails.updated_at = moment().format("YYYY-MM-DD HH:mm:ss");
        return quotationDetails;
    }
    static nextInvNumber(invoiceNumber) {
        if (!invoiceNumber) throw new Error('invoiceNumber cannot be empty')
        var array = invoiceNumber.split(/[_/:\-;\\]+/)
        var lastSegment = array.pop()
        var priorSegment = invoiceNumber.substr(0, invoiceNumber.indexOf(lastSegment))
           var nextNumber = Util.alphaNumericIncrementer(lastSegment)
        return priorSegment + nextNumber;
    }

    static  alphaNumericIncrementer(str) {
        if (str && str.length > 0) {
            var invNum = str.replace(/([^a-z0-9]+)/gi, '')
            invNum = invNum.toUpperCase()
            var index = invNum.length - 1
            while (index >= 0) {
                if (invNum.substr(index, 1) === '9') {
                    invNum = invNum.substr(0, index) + '0' + invNum.substr(index + 1)
                } else if (invNum.substr(index, 1) === 'Z') {
                    invNum = invNum.substr(0, index) + 'A' + invNum.substr(index + 1)
                } else {
                    var char = String.fromCharCode(invNum.charCodeAt(index) + 1)
                    invNum = invNum.substr(0, index) + char + invNum.substr(index + 1)
                    index = 0
                }
                index--
            }
            return invNum
        } else {
            throw new Error('str cannot be empty')
        }
    }
}
export default Util;