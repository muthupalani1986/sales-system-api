class Customer {
    
    constructor(name,company_name,email,phone_number,address,city,state,postal_code,country,created_at,updated_at) {        
        this.name=name;
        this.company_name = company_name;
        this.email = email;
        this.phone_number = phone_number;
        this.address = address;
        this.city = city;
        this.state = state;
        this.postal_code = postal_code;
        this.country = country;
        this.created_at=created_at;
        this.updated_at=updated_at;
    }

    addCustomerSQL() {
        let sql = `INSERT INTO customers(name,company_name,email,phone_number,address,city,state,postal_code,country,created_at,updated_at) \
                   VALUES('${this.name}','${this.company_name}','${this.email}','${this.phone_number}','${this.address}','${this.city}','${this.state}','${this.postal_code}','${this.country}','${this.created_at}','${this.updated_at}')`;
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
        let sql = `update customers set name='${this.name}',company_name='${this.company_name}',email='${this.email}',phone_number='${this.phone_number}',address='${this.address}',city='${this.city}',state='${this.state}',postal_code='${this.postal_code}',country='${this.country}',updated_at='${this.updated_at}' WHERE id = ${id}`;
        return sql;           
    }
    static getAllCustomerSQL() {
        let sql = `SELECT * FROM customers order by name asc`;
        return sql;           
    }    
}

export default Customer;