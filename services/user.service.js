const pool = require("../config/database");

module.exports = {
  createUser: (data, callBack) => {
    var names = Object.keys(data);
    pool.query(
      `insert into tbl_users(${names}) values(?)`,
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

  createSocialUser: (data, callBack) => {
    var names = Object.keys(data);
    pool.query(
      `insert into tbl_users(${names}) values(?)`,
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

  getUser: (id, callBack) => {
    pool.query(
      `SELECT * FROM tbl_users where id=${id}`,
      [],
      (error, results, field) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getUserLogin: (email, callBack) => {
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

  checkEmail: (email, callBack) => {
    pool.query(
      `SELECT * FROM tbl_users WHERE email = ?`,
      [email],
      (error, results, fields) => {
        console.log(results);
        if (results.length > 0) {
          return callBack(null, true, results[0]);
        }
        return callBack(error);
      }
    );
  },
  checkEmailExist: (email, callBack) => {
    pool.query(
      `SELECT * FROM tbl_users WHERE email = ?`,
      [email],
      (error, results, fields) => {
        if (results) {
          return callBack(null, true, results[0]);
        }
        if (!results) {
          return callBack(null, false, null);
        }
        return callBack(error);
      }
    );
  },
  checkMobileExist: (mobile, callBack) => {
    pool.query(
      `SELECT * FROM tbl_users WHERE mobile = ?`,
      [mobile],
      (error, results, fields) => {
        console.log(results);
        if (results) {
          return callBack(null, true, results[0]);
        }
        if (!results) {
          return callBack(null, false, null);
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
      `UPDATE tbl_users SET password='${data.password}' where id=${id}`,
      [],
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
  reportUser: (user_id, body, callBack) => {
    pool.query(
      `insert into tbl_report(user_id, reported_user_id, type, comment) values(?,?,?,?)`,
      [user_id, body.reported_user, body.type, body.comment],

      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  updateUserWithEmail: (email, data, callBack) => {
    var names = Object.keys(data);
    pool.query(
      `UPDATE tbl_users SET ? where id=${email}`,
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
  checkFacebook: (facebookId, callBack) => {
    pool.query(
      `SELECT * FROM tbl_users WHERE facebook = ?`,
      [facebookId],
      (error, results, fields) => {
        console.log(results);
        if (results.length > 0) {
          return callBack(null, true, results[0].id);
        }
        return callBack(error);
      }
    );
  },
  updateUserWithFacebook: (user_id, data, callBack) => {
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
  userDataWithFacebook: (facebookId, callBack) => {
    pool.query(
      `SELECT * FROM tbl_users WHERE facebook = ?`,
      [facebookId],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },
  blockUser: (user_id, blocked_user_id, callBack) => {
    pool.query(
      `insert into tbl_block_user(user_id, blocked_user_id) values(?,?)`,
      [user_id, blocked_user_id],

      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  unBlockUser: (user_id, blocked_user_id, callBack) => {
    pool.query(
      `DELETE FROM tbl_block_user WHERE user_id=? && blocked_user_id=?`,
      [user_id, blocked_user_id],

      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  blockUserList: (user_id, callBack) => {
    pool.query(
      `SELECT tbl_users.* FROM tbl_users
      LEFT join tbl_block_user 
      ON tbl_users.id=tbl_block_user.blocked_user_id 
      WHERE tbl_block_user.user_id=${user_id}`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getMyReviewOnUser: (review_by_user_id, review_to_user_id, callBack) => {
    pool.query(
      `SELECT tbl_user_review.*,tbl_users.userImg as user_img,tbl_users.name as user_name
      FROM tbl_user_review left join tbl_users on tbl_user_review.review_by_user_id=tbl_users.id
      WHERE tbl_user_review.review_to_user_id=? && tbl_user_review.review_by_user_id=?  order by id desc limit 2`,
      [review_to_user_id, review_by_user_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserReviews: (review_to_user_id, callBack) => {
    pool.query(
      `SELECT tbl_user_review.*,tbl_users.userImg as user_img,tbl_users.name as user_name
      FROM tbl_user_review left join tbl_users on tbl_user_review.review_by_user_id=tbl_users.id
      WHERE tbl_user_review.review_to_user_id=? order by id desc limit 2`,
      [review_to_user_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserRating: (review_to_user_id, callBack) => {
    pool.query(
      `SELECT AVG(rating)as rating FROM tbl_user_review WHERE review_to_user_id=?`,
      [review_to_user_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
