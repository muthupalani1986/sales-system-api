class Quotation {
    
    constructor(inv_number,status, note, order_tax, order_discount, shipping_cost, grand_total,customer_id, created_at, updated_at) {        
        this.inv_number = inv_number;
        this.status = status;
        this.note = note;
        this.order_tax=order_tax
        this.order_discount = order_discount;
        this.shipping_cost = shipping_cost;
        this.grand_total = grand_total;
        this.customer_id = customer_id;
        this.created_at=created_at;
        this.updated_at=updated_at;
    }

    addQuotationSQL() {
        let sql = `INSERT INTO quotations(inv_number,status, note, order_tax, order_discount, shipping_cost, grand_total,customer_id, created_at, updated_at) \
                   VALUES('${this.inv_number}',${this.status}, '${this.note}', ${this.order_tax}, ${this.order_discount}, ${this.shipping_cost}, ${this.grand_total},${this.customer_id},'${this.created_at}','${this.updated_at}')`;
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
        let sql = `update quotations set status=${this.status},note='${this.note}',order_tax=${this.order_tax},order_discount=${this.order_discount},shipping_cost=${this.shipping_cost},grand_total=${this.grand_total},customer_id=${this.customer_id}, updated_at='${this.updated_at}' WHERE id = ${id}`;
        return sql;           
    }
    static getAllQuotationSQL() {
        let sql = `SELECT * FROM quotations order by updated_at desc`;
        return sql;           
    }
    static getLastQuotationSQL() {
        let sql = `SELECT * FROM quotations order by id desc limit 1`;
        return sql;
    }    
}

export default Quotation;