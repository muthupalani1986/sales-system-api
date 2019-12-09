class User {
    
    constructor(first_name,last_name,email_id,password,role_id,created_at,updated_at) {        
        this.first_name=first_name;
        this.last_name=last_name;
        this.email_id=email_id;
        this.password=password;
        this.role_id=role_id;
        this.created_at=created_at;
        this.updated_at=updated_at;
    }

    addUserSQL() {
        let sql = `INSERT INTO users(first_name, last_name,email_id,password,role_id,created_at,updated_at) \
                   VALUES('${this.first_name}','${this.last_name}','${this.email_id}','${this.password}',${this.role_id},'${this.created_at}','${this.updated_at}')`;
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

    static deleteUserByIdSQL(user_id) {
        let sql = `DELETE FROM users WHERE id = ${user_id}`;
        return sql;           
    }
    updateUserByIdSQL(user_id) {
        let sql = `update users set first_name='${this.first_name}',last_name='${this.last_name}',email_id='${this.email_id}',password='${this.password}',role_id=${this.role_id},updated_at='${this.updated_at}' WHERE id = ${user_id}`;
        return sql;           
    }

    static getAllUserSQL() {
        let sql = `SELECT * FROM users`;
        return sql;           
    }    
}

export default User;