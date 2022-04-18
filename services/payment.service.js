const pool = require("../config/database");
var moment = require("moment");

module.exports = {
  addPaymentDetails: (user_id, body, callBack) => {
    pool.query(
      `insert into tbl_payment (user_id,product_id,transaction_id,payment_status,amount)values(?,?,?,?,?)`,
      [
        user_id,
        body.product_id,
        body.transaction_id,
        body.payment_status,
        body.amount,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getPayments: (callBack) => {
    pool.query(
      `SELECT tbl_payment.*,tbl_payment.user_id as productSoldTo,
      tbl_users.name as seller_name,
      tbl_products.name as product_name,tbl_products.price as product_price,
      tbl_products.foundation_name,tbl_products.charity_amt,tbl_products.foundation_id
      FROM tbl_payment 
      INNER JOIN tbl_products
      ON tbl_payment.product_id=tbl_products.id
      INNER JOIN tbl_users
      ON tbl_products.user_id=tbl_users.id
      ORDER BY tbl_payment.id DESC`,
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
};
