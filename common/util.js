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
}
export default Util;