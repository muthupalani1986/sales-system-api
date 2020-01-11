class Order {
    
    constructor(quotation_id, product_id, quantity, unit_price, discount, tax,created_at, updated_at) {        
        this.quotation_id = quotation_id;
        this.product_id = product_id;
        this.quantity = quantity;
        this.unit_price = unit_price;
        this.discount = discount;
        this.tax = tax;
        this.created_at=created_at;
        this.updated_at=updated_at;
    }

    static addOrderSQL() {
        const sql = "INSERT INTO orders (quotation_id, product_id, quantity, unit_price, discount, tax,created_at, updated_at) VALUES ?";
        return sql;           
    }
    static getOrdersByQuotationId(quotation_id){
        const sql = `SELECT ord.*,prod.name,prod.code from orders ord INNER JOIN products prod on prod.id=ord.product_id WHERE quotation_id=${quotation_id}`;
        return sql;
    }
    static deleteOrdersByQuotationId(quotation_id) {
        const sql = `DELETE from orders where quotation_id=${quotation_id}`;
        return sql;
    }   
}

export default Order;