const pool = require("../config/database");

module.exports = {
  addUserReview: (data, callback) => {
    var names = Object.keys(data);
    pool.query(
      `insert into tbl_user_review(${names}) values(?)`,
      [Object.values(data)],

      (error, results, fields) => {
        if (error) {
          console.log(error);
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  reportReview: (user_id, review_id, callback) => {
    pool.query(
      `insert into tbl_report_review(user_id,review_id) values(?,?)`,
      [user_id, review_id],

      (error, results, fields) => {
        if (error) {
          console.log(error);
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getUserReviews: (user_id, callBack) => {
    pool.query(
      `SELECT tbl_user_review.* ,tbl_users.userImg as user_img,tbl_users.name as user_name 
      FROM tbl_user_review  INNER JOIN tbl_users ON tbl_user_review.review_by_user_id=tbl_users.id WHERE tbl_user_review.review_to_user_id=?   order by id desc`,
      [user_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  editMyReview: (id, data, callBack) => {
    pool.query(
      `UPDATE tbl_user_review SET ? where review_to_user_id=${data.review_to_user_id} 
      && review_by_user_id=${data.review_by_user_id} && id=${id}`,
      [data],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteMyReview: (id, review_to_user_id, review_by_user_id, callBack) => {
    pool.query(
      `DELETE FROM tbl_user_review WHERE review_to_user_id=${review_to_user_id} 
      && review_by_user_id=${review_by_user_id}&& id=${id}`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  deleteReviewFromMyPost: (id, callBack) => {
    pool.query(
      `DELETE FROM tbl_user_review WHERE id=${data.id}`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
