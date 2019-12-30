class Category {
    
    constructor(category_name,created_at,updated_at) {        
        this.category_name=category_name;
        this.created_at=created_at;
        this.updated_at=updated_at;
    }
    addCategorySQL() {
        let sql = `INSERT INTO category(category_name, created_at,updated_at) \
                   VALUES('${this.category_name}','${this.created_at}','${this.updated_at}')`;
        return sql;           
    }
    static getCategoryByIdSQL(id) {
        const sql=`SELECT * from category where id = '${id}' limit 1`;
        return sql;           
    }    

    static deleteCategoryByIdSQL(id) {
        let sql = `DELETE FROM category WHERE id = ${id}`;
        return sql;           
    }
    updateCategoryByIdSQL(id) {
        let sql = `update category set category_name='${this.category_name}',updated_at='${this.updated_at}' WHERE id = ${id}`;
        return sql;           
    }
    static getAllCategorySQL() {
        let sql = `SELECT * FROM category order by category_name asc`;
        return sql;           
    }    
}

export default Category;