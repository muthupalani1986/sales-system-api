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
}
export default Util;