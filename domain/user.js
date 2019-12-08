class User {
    
    constructor(name,price) {
        this.prd_id=0;
        this.prd_name=name;
        this.prd_price=price;
    }

    getAddProductSQL() {
        let sql = `INSERT INTO USERS(prd_name, prd_price) \
                   VALUES('${this.prd_name}',${this.prd_price})`;
        return sql;           
    }

    static getUserByEmailIdPwdSQL(email_id,pwd) {
        const sql=`SELECT u.id as user_id,u.first_name,u.last_name,u.email_id,r.role_name,r.id as role_id from users u INNER JOIN roles r ON u.role_id=r.id where u.email_id = '${email_id}' and u.password='${pwd}' limit 1`;
        return sql;           
    }

    static getUserByEmailId(email_id) {
        let sql = `SELECT * FROM users WHERE email_id = '${email_id}' limit 1`;
        return sql;           
    }

    static deleteProductByIdSQL(prd_id) {
        let sql = `DELETE FROM PRODUCTS WHERE PRD_ID = ${prd_id}`;
        return sql;           
    }

    static getAllProductSQL() {
        let sql = `SELECT * FROM PRODUCTS`;
        return sql;           
    }    
}

export default User;