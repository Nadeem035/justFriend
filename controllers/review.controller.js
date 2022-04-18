const {
  addUserReview,
  getUserReviews,
  editMyReview,
  deleteMyReview,
  deleteReviewFromMyPost,
  reportReview,
} = require("../services/review.service");

module.exports = {
  addUserReview: (req, res) => {
    const user = req.decoded.result;
    req.body.review_by_user_id = user.id;
    const body = req.body;
    addUserReview(body, (error, results) => {
      if (error) {
        console.log(error);
        return res.json({
          error: error,
          success: false,
          message: "Failed to add review",
          data: {},
        });
      }
      return res.status(200).json({
        error: false,
        success: true,
        message: `Review added Successfully`,
        data: results,
      });
    });
  },

  getUserReviews: (req, res) => {
    const user = req.decoded.result;
    const user_id = req.params.user_id;
    getUserReviews(user_id, (error, results) => {
      if (error) {
        console.log(error);
        return res.json({
          error: error,
          success: false,
          message: "Failed to Get reviews",
          data: {},
        });
      }
      if (results.length) {
        return res.status(200).json({
          error: false,
          success: true,
          message: `User Reviews`,
          data: results,
        });
      }
      return res.status(200).json({
        error: false,
        success: true,
        message: `No Reviews For User`,
        data: results,
      });
    });
  },

  editMyReview: (req, res) => {
    const user = req.decoded.result;
    const id = req.params.review_id;
    req.body.review_by_user_id = user.id;
    const body = req.body;
    editMyReview(id, body, (error, results) => {
      if (error) {
        console.log(error);
        return res.json({
          error: error,
          success: false,
          message: "Failed to Edit review",
          data: {},
        });
      }
      return res.status(200).json({
        error: false,
        success: true,
        message: `Review Updated Successfully`,
        data: results,
      });
    });
  },

  deleteMyReview: (req, res) => {
    const user = req.decoded.result;
    const review_id = req.params.review_id;
    const review_to_user_id = req.params.review_to_user_id;
    deleteMyReview(review_id, review_to_user_id, user.id, (error, results) => {
      if (error) {
        console.log(error);
        return res.json({
          error: error,
          success: false,
          message: "Failed to Delete reviews",
          data: {},
        });
      }
      return res.status(200).json({
        error: false,
        success: true,
        message: `Reviews Deleted Successfully`,
        data: results,
      });
    });
  },

  deleteReviewFromMyPost: (req, res) => {
    const user = req.decoded.result;
    const product_id = req.params.product_id;
    getUserReviews(product_id, (error, results) => {
      if (error) {
        console.log(error);
        return res.json({
          error: error,
          success: false,
          message: "Failed to Get reviews",
          data: {},
        });
      }
      if (results.length) {
        return res.status(200).json({
          error: false,
          success: true,
          message: `Reviews For Product`,
          data: results,
        });
      }
      return res.status(200).json({
        error: false,
        success: true,
        message: `No Reviews For selected product`,
        data: results,
      });
    });
  },

  reportReview: (req, res) => {
    const user = req.decoded.result;
    const review_id = req.params.review_id;
    reportReview(user.id, review_id, (error, results) => {
      if (error) {
        console.log(error);
        return res.json({
          error: error,
          success: false,
          message: "Failed to report review",
          data: {},
        });
      }
      return res.status(200).json({
        error: false,
        success: true,
        message: `Review reported Successfully`,
        data: results,
      });
    });
  },
};
