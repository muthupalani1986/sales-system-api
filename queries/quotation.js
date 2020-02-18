const moment = require('moment');
class Quotation {
    
    constructor(quotation_number, note, order_tax, order_discount, shipping_cost, customer_id, created_at, updated_at) {        
        this.quotation_number = quotation_number;
        this.note = note;
        this.order_tax=order_tax
        this.order_discount = order_discount;
        this.shipping_cost = shipping_cost;
        this.customer_id = customer_id;
        this.created_at=created_at;
        this.updated_at=updated_at;
    }

    addQuotationSQL() {
        let sql = `INSERT INTO quotations(quotation_number,status, note, order_tax, order_discount, shipping_cost, customer_id, created_at, updated_at) \
                   VALUES('${this.quotation_number}',1, '${this.note}', ${this.order_tax}, ${this.order_discount}, ${this.shipping_cost}, ${this.customer_id},'${this.created_at}','${this.updated_at}')`;                      
        return sql;           
    }
    static getQuotationByIdSQL(id) {
        const sql = `SELECT quo.*, cus.name,cus.company_name,cus.address,cus.city,cus.state,cus.postal_code,cus.country from quotations quo INNER JOIN customers cus on cus.id=quo.customer_id where quo.id = '${id}' limit 1`;
        return sql;           
    }    

    static deleteQuotationByIdSQL(id) {
        let sql = `DELETE FROM quotations WHERE id = ${id}`;
        return sql;           
    }
    updateQuotationByIdSQL(id) {
        let sql = `update quotations set note='${this.note}',order_tax=${this.order_tax},order_discount=${this.order_discount},shipping_cost=${this.shipping_cost},customer_id=${this.customer_id}, updated_at='${this.updated_at}' WHERE id = ${id}`;        
        return sql;           
    }
    static getAllQuotationSQL(type) {
        let sql = `SELECT * FROM quotations order by updated_at desc`;
		if (type==='sales'){
			sql = `SELECT * FROM quotations where status=2 order by updated_at desc`;
		}
        return sql;           
    }
    static getLastQuotationSQL(status) {
        const  quotationStatus = typeof status !== 'undefined' ? true : false;
        let sql = `SELECT * FROM quotations where status=${status} order by id desc limit 1`;
        if (!quotationStatus){
            sql = `SELECT * FROM quotations order by id desc limit 1`;
        }
        return sql;
    }
    static createSalesByQuotationId(quotation_id, inv_number) {
        const timeStamp=moment().format("YYYY-MM-DD HH:mm:ss");
        let sql = `UPDATE quotations set status=2,inv_number='${inv_number}',updated_at='${timeStamp}' where id=${quotation_id}`
        return sql;
    }    
}

export default Quotation;