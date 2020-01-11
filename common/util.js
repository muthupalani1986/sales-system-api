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
    static generateHeader(doc,invoice) {
        doc
            .image("logo.png", 50, 45, { width: 50 })
            .fillColor("#444444")
            .fontSize(20)
            .text(invoice.company_details.name.toUpperCase(), 110, 57)
            .fontSize(10)
            .text(invoice.company_details.name, 200, 50, { align: "right" })
            .text(invoice.company_details.po_box, 200, 65, { align: "right" })
            .text(invoice.company_details.address, 200, 80, { align: "right" })
            .text(invoice.company_details.city + ", " + invoice.company_details.country, 200, 95, { align: "right" })         
            .text("T: " + invoice.company_details.telePhone + " M: " + invoice.company_details.mobile, 200, 110, { align: "right" })
            .text("E: " + invoice.company_details.email + " W: " + invoice.company_details.web, 200, 125, { align: "right" })
            .moveDown();
    }
    static generateCustomerInformation(doc, invoice) {
        doc
            .fillColor("#444444")
            .fontSize(20)
            .text("Invoice", 50, 160);

        Util.generateHr(doc, 185);

        const customerInformationTop = 200;

        doc
            .fontSize(10)
            .text("Invoice Number:", 50, customerInformationTop)
            .font("Helvetica-Bold")
            .text(invoice.invoice_nr, 150, customerInformationTop)
            .font("Helvetica")
            .text("Invoice Date:", 50, customerInformationTop + 15)
            .text(Util.formatDate(invoice.invoice_date), 150, customerInformationTop + 15)           
            .font("Helvetica-Bold")
            .text(invoice.shipping.name, 300, customerInformationTop)
            .font("Helvetica")
            .text("P.O. Box "+invoice.shipping.postal_code, 300, customerInformationTop + 15)
            .text(invoice.shipping.address, 300, customerInformationTop + 30)
            .text(
                invoice.shipping.city +
                ", " +
                invoice.shipping.state +
                ", " +
                invoice.shipping.country,
                300,
                customerInformationTop + 45
            )
            .moveDown();

        Util.generateHr(doc, 268);
    }
    static generateHr(doc, y) {
        doc
            .strokeColor("#aaaaaa")
            .lineWidth(1)
            .moveTo(50, y)
            .lineTo(550, y)
            .stroke();
    }
    static formatCurrency(cents) {
        return "AED" + (cents / 1).toFixed(2);
    }
    
    static formatDate(date) {
        return moment(date).utc().format('DD/MM/YYYY')
    }
    static generateInvoiceTable(doc, invoice) {
        let i;
        const invoiceTableTop = 330;

        doc.font("Helvetica-Bold");
        Util.generateTableRow(
            doc,
            invoiceTableTop,
            "Item",
            "Unit Cost",
            "Quantity",
            "%Tax",
            "Discount",
            "Line Total"
        );
        Util.generateHr(doc, invoiceTableTop + 20);
        doc.font("Helvetica");
        let itemsTotal = 0;
        for (i = 0; i < invoice.items.length; i++) {
            const item = invoice.items[i];
            const position = invoiceTableTop + (i + 1) * 30;
            const amount = (item.unit_price * item.quantity);            
            let tax = 0;
            const isValidNumber=isFinite(amount / item.tax);
            if (isValidNumber) {
               tax = +((amount*item.tax) / 100);
            }            
            const itemTotal = ((amount + tax) - item.discount);
            const lineTotal = itemTotal.toFixed(2);
            
            itemsTotal = itemsTotal + itemTotal;
            Util.generateTableRow(
                doc,
                position,
                item.name,
                Util.formatCurrency(item.unit_price),
                item.quantity,
                item.tax,
                item.discount,
                Util.formatCurrency(lineTotal)
            );
            Util.generateHr(doc, position + 20);
        }

        const subtotalPosition = invoiceTableTop + (i + 1) * 30;
        Util.generateTableRow(
            doc,
            subtotalPosition,
            "",
            "",
            "",
            "",
            "Order Discount",
            Util.formatCurrency(invoice.order_discount.toFixed(2))
        );

        const paidToDatePosition = subtotalPosition + 20;
        Util.generateTableRow(
            doc,
            paidToDatePosition,
            "",
            "",
            "",
            "",
            "Shipping Cost",
            Util.formatCurrency(invoice.shipping_cost.toFixed(2))
        );

        const duePosition = paidToDatePosition + 20;        
        Util.generateTableRow(
            doc,
            duePosition,
            "",
            "",
            "",
            "",
            "Order Tax",
            Util.formatCurrency(invoice.order_tax.toFixed(2))
        );
        const totalPosition = duePosition + 20;
        let orderTax = 0;
        const isValidNumber = isFinite(itemsTotal / invoice.order_tax);
        if (isValidNumber) {
            orderTax = +((itemsTotal / invoice.order_tax) / 100);
        }
        const grandTotal = ((itemsTotal + orderTax + invoice.shipping_cost) - invoice.order_discount).toFixed(2);
        doc.font("Helvetica-Bold");
        Util.generateTableRow(
            doc,
            totalPosition,
            "",
            "",
            "",
            "",
            "Grand Total",
            Util.formatCurrency(grandTotal)
        );
        doc.font("Helvetica");
    }
    
    static generateTableRow(
        doc,
        y,
        name,        
        unitCost,
        quantity,
        tax,
        discount,
        lineTotal
    ) {
        doc
            .fontSize(10)
            .text(name, 50, y)            
            .text(unitCost, 210, y, { width: 90, align: "right" })
            .text(quantity, 270, y, { width: 90, align: "right" })
            .text(tax, 320, y, { width: 90, align: "right" })
            .text(discount, 380, y, { width: 90, align: "right" })
            .text(lineTotal, 0, y, { align: "right" });
    }
    static generateFooter(doc) {
        doc
            .fontSize(10)
            .text(
                "Payment is due within 15 days. Thank you for your business.",
                50,
                780,
                { align: "center", width: 500 }
            );
    }
}
export default Util;