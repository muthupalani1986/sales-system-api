class Product {
    
    constructor(name, description, category, image, sellingPrice, buyingPrice, taxRate, quantity, salesUnit,code, created_at, updated_at) {
        this.prod_name=name;
        this.description = description;
        this.category = category;
        this.image = image;
        this.sellingPrice = sellingPrice;
        this.buyingPrice = buyingPrice;
        this.taxRate = taxRate;
        this.quantity = quantity;
        this.salesUnit = salesUnit;
        this.prod_code = code;
        this.created_at = created_at;
        this.updated_at = updated_at;
        }

    getAddProductSQL() {
        let sql = `INSERT INTO products(name,description,category,image,sellingPrice,buyingPrice,taxRate,quantity,salesUnit,code,created_at,updated_at) \
                   VALUES('${this.prod_name}','${this.description}',${this.category},'${this.image}',${this.sellingPrice},${this.buyingPrice},${this.taxRate},${this.quantity},${this.salesUnit},'${this.prod_code}','${this.created_at}','${this.updated_at}')`;
        return sql;           
    }

    static getProductByIdSQL(prd_id) {
        let sql = `SELECT * FROM products WHERE id = ${prd_id}`;
        return sql;           
    }

    static deleteProductByIdSQL(prd_id) {
        let sql = `DELETE FROM products WHERE id = ${prd_id}`;
        return sql;           
    }

    static getAllProductSQL() {
        let sql = `SELECT * FROM products order by name asc`;
        return sql;           
    }
    static getProductCountByCatSQL(cat_id) {
        let sql = `SELECT count(*)as total FROM products where category=${cat_id}`;
        return sql;
    }    
}

export default Product;