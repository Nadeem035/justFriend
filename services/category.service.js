const pool = require("../config/database");

module.exports = {
  getCategories: (callBack) => {
    pool.query(
      `SELECT * FROM tbl_category where isDeleted=0`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getSubCategoryById: (id, callBack) => {
    pool.query(
      `SELECT * FROM tbl_sub_category WHERE category_id = ? && isDeleted=0`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getCategoryBySearch: (body, callBack) => {
    console.log(body);
    pool.query(
      `SELECT * FROM tbl_category WHERE name LIKE '%${body.keyword}%'`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  //Admin Operations.....................Category.................
  allCategories: (callBack) => {
    pool.query(`SELECT * FROM tbl_category`, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
  createCategory: (data, callBack) => {
    pool.query(
      `INSERT INTO tbl_category(name, img,createdDtm) 
    VALUES (?,?,?)`,
      [data.name, data.img, new Date()],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateCategory: (id, data, callBack) => {
    pool.query(
      `UPDATE tbl_category SET ? where id=${id}`,
      [data],
      (error, results, fields) => {
        console.log(results);
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  enableCategory: (id, callBack) => {
    pool.query(
      `UPDATE tbl_category SET isDeleted=0 where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results.affectedRows);
      }
    );
  },
  disableCategory: (id, callBack) => {
    pool.query(
      `UPDATE tbl_category SET isDeleted=1 where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results.affectedRows);
      }
    );
  },

  //Admin Operations.....................SubCategory.................
  getSubCategoriesByCatId: (id, callBack) => {
    pool.query(
      `SELECT * FROM tbl_sub_category WHERE category_id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  createSubCategory: (data, callBack) => {
    pool.query(
      `INSERT INTO tbl_sub_category(name, category_id) 
    VALUES (?,?)`,
      [data.name, data.category_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateSubCategory: (id, data, callBack) => {
    pool.query(
      `UPDATE tbl_sub_category SET ? where id=${id}`,
      [data],
      (error, results, fields) => {
        console.log(results);
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  enableSubCategory: (id, callBack) => {
    pool.query(
      `UPDATE tbl_sub_category SET isDeleted=0 where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results.affectedRows);
      }
    );
  },
  disableSubCategory: (id, callBack) => {
    pool.query(
      `UPDATE tbl_sub_category SET isDeleted=1 where id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results.affectedRows);
      }
    );
  },

  deleteCategory: (data, callBack) => {
    pool.query(
      `delete from tbl_category where id = ?`,
      [data.category_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results.affectedRows);
      }
    );
  },
};
