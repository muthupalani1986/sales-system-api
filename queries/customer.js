class Customer {
    
    constructor(name,created_at,updated_at) {        
        this.name=name;
        this.created_at=created_at;
        this.updated_at=updated_at;
    }
    addCustomerSQL() {
        let sql = `INSERT INTO customers(name, created_at,updated_at) \
                   VALUES('${this.name}','${this.created_at}','${this.updated_at}')`;
        return sql;           
    }
    static getCustomerByIdSQL(id) {
        const sql=`SELECT * from customers where id = '${id}' limit 1`;
        return sql;           
    }    

    static deleteCustomerByIdSQL(id) {
        let sql = `DELETE FROM customers WHERE id = ${id}`;
        return sql;           
    }
    updateCustomerByIdSQL(id) {
        let sql = `update customers set name='${this.name}',updated_at='${this.updated_at}' WHERE id = ${id}`;
        return sql;           
    }
    static getAllCustomerSQL() {
        let sql = `SELECT * FROM customers order by name asc`;
        return sql;           
    }    
}

export default Customer;