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
        userDetails.created_at = userDetails.updated_at = userDetails.created_at= moment().format("YYYY-MM-DD HH:mm:ss");
        return userDetails;
    }
}
export default Util;