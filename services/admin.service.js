const pool = require("../config/database");

module.exports = {
  createUser: (data, callBack) => {
    var names = Object.keys(data);
    pool.query(
      `insert into tbl_admin(${names}) values(?)`,
      [Object.values(data)],

      (error, results, fields) => {
        if (error) {
          console.log(data);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  checkEmail: (email, callBack) => {
    pool.query(
      `SELECT COUNT(*) AS cnt FROM tbl_admin WHERE email = ?`,
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
  getUserLogin: (email, callBack) => {
    pool.query(
      `SELECT * FROM tbl_admin WHERE email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  // .........................................
  getAllUsers: (callBack) => {
    pool.query(
      `SELECT id,email,name,mobile,isDeleted,userImg,isActive,platform FROM tbl_users`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getReportedUsers: (callBack) => {
    pool.query(
      `SELECT tbl_users.name as reported_user_name,tbl_users.userImg as reported_user_img, tbl_users.isDeleted,
      tbl_report.reported_user_id,tbl_report.user_id as reported_by_user,tbl_report.type,tbl_report.comment
       FROM tbl_users
       JOIN tbl_report
       ON tbl_users.id=tbl_report.reported_user_id
       ORDER BY tbl_report.id DESC`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserById: (user_id, callBack) => {
    pool.query(
      `SELECT * FROM tbl_users WHERE id = ?`,
      [user_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  disableUser: (user_id, callBack) => {
    pool.query(
      `UPDATE tbl_users SET isDeleted=1 where id = ?`,
      [user_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results.affectedRows);
      }
    );
  },
  enableUser: (user_id, callBack) => {
    pool.query(
      `UPDATE tbl_users SET isDeleted=0 where id = ?`,
      [user_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results.affectedRows);
      }
    );
  },
  // .........................................
  getReportedReviews: (callBack) => {
    pool.query(
      `SELECT tbl_user_review.*
       FROM tbl_user_review
       JOIN tbl_report_review
       ON tbl_user_review.id=tbl_report_review.review_id
       ORDER BY tbl_report_review.id DESC`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteReportedReviews: (review_id, callBack) => {
    pool.query(
      `DELETE FROM tbl_user_review WHERE id=${review_id}`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  //..........................................
  getProductById: (product_id, callBack) => {
    var q = `SELECT *
              FROM tbl_products
              WHERE id= ${product_id}`;
    pool.query(q, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results[0]);
    });
  },
  getUserPostProduct: (user_id, callBack) => {
    pool.query(
      `select * from tbl_products where user_id=?`,
      [user_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getAllProducts: (callBack) => {
    pool.query(`SELECT * FROM tbl_products`, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      console.log(results);
      return callBack(null, results);
    });
  },
  getPayments: (callBack) => {
    pool.query(
      `SELECT * FROM tbl_featured_payment`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        console.log(results);
        return callBack(null, results);
      }
    );
  },
  userCount: (callBack) => {
    pool.query(
      `SELECT COUNT(*) as userCount FROM tbl_users`,
      [],
      (error, results, field) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  productCount: (callBack) => {
    pool.query(
      `SELECT COUNT(*) as productCount FROM tbl_products`,
      [],
      (error, results, field) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  soldProductCount: (callBack) => {
    pool.query(
      `SELECT COUNT(*) as productCount FROM tbl_products where isSold=1`,
      [],
      (error, results, field) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  featuredProductCount: (callBack) => {
    pool.query(
      `SELECT COUNT(*) as productCount FROM tbl_products where isFeatured !=0`,
      [],
      (error, results, field) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  categoryCount: (callBack) => {
    pool.query(
      `SELECT COUNT(*) as categoryCount FROM tbl_category`,
      [],
      (error, results, field) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  favCount: (callBack) => {
    pool.query(
      `SELECT COUNT(*) as favCount FROM tbl_favourite`,
      [],
      (error, results, field) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
