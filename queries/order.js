class Order {
    
    constructor(quotation_id, product_id, quantity, unit_price, discount, tax,total,created_at, updated_at) {        
        this.quotation_id = quotation_id;
        this.product_id = product_id;
        this.quantity = quantity;
        this.unit_price = unit_price;
        this.discount = discount;
        this.tax = tax;
        this.total = total;
        this.created_at=created_at;
        this.updated_at=updated_at;
    }

    static addOrderSQL() {
        var sql = "INSERT INTO orders (quotation_id, product_id, quantity, unit_price, discount, tax,total,created_at, updated_at) VALUES ?";
        return sql;           
    }   
}

export default Order;