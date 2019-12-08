class User {
    
    constructor(name,price) {        
        this.first_name=first_name;
        this.last_name=last_name;
        this.email_id=email_id;
        this.role_id=role_id;
    }

    addUserSQL() {
        let sql = `INSERT INTO users(first_name, last_name,email_id,role_id) \
                   VALUES('${this.first_name}','${this.last_name}','${this.email_id}','${this.role_id}')`;
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