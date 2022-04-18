const pool = require("../config/database");

module.exports = {
  addNotification: (data) => {
    var names = Object.keys(data);
    pool.query(
      `insert into tbl_notification(${names}) values(?)`,
      [Object.values(data)],

      (error, results, fields) => {
        if (error) {
          return console.log(error);
        }
        // return console.log(results);
      }
    );
  },

  getToken: (id, callBack) => {
    pool.query(
      `SELECT token FROM tbl_users where id=${id}`,
      [],
      (error, results, field) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getNotifications: (user_id, callBack) => {
    pool.query(
      `SELECT tbl_notification.*,tbl_products.img,tbl_products.name FROM tbl_notification 
      LEFT JOIN tbl_products
      ON tbl_notification.product_id=tbl_products.id 
       WHERE tbl_notification.user_id = ?
      order by createdDtm DESC limit 20`,
      [user_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  checkEmail: (email, callBack) => {
    pool.query(
      `SELECT COUNT(*) AS cnt FROM tbl_users WHERE email = ?`,
      [email],
      (error, results, fields) => {
        console.log(results);
        if (results[0].cnt > 0) {
          return callBack(null, true);
        }
        return callBack(error);
      }
    );
  },

  userDataWithEmail: (email, callBack) => {
    pool.query(
      `SELECT * FROM tbl_users WHERE email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  changePassword: (id, data, callBack) => {
    pool.query(
      `UPDATE tbl_users SET ? where id=${id}`,
      [data],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  updateUser: (user_id, data, callBack) => {
    var names = Object.keys(data);
    pool.query(
      `UPDATE tbl_users SET ? where id=${user_id}`,
      [data],

      (error, results, fields) => {
        if (error) {
          console.log(data);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
