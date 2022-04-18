const pool = require("../config/database");

module.exports = {
  createFoundation: (data, callBack) => {
    pool.query(
      `INSERT INTO tbl_foundation(name) 
    VALUES (?)`,
      [data.name],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  updateFoundation: (id, data, callBack) => {
    pool.query(
      `UPDATE tbl_foundation SET ? where id=${id}`,
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

  getFoundations: (callBack) => {
    pool.query(
      `SELECT * FROM tbl_foundation where isDeleted=0`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getAllFoundations: (callBack) => {
    pool.query(`SELECT * FROM tbl_foundation`, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },
  deleteFoundation: (category_id, callBack) => {
    pool.query(
      `UPDATE tbl_foundation SET isDeleted=1 where id=?`,
      [category_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results.affectedRows);
      }
    );
  },
};
