const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");
const {
  addUserReview,
  getUserReviews,
  editMyReview,
  deleteMyReview,
  reportReview,
} = require("../controllers/review.controller");

router.post("/add", checkToken, addUserReview);
router.get("/:user_id", checkToken, getUserReviews);
router.put("/edit/:review_id", checkToken, editMyReview);
router.delete(
  "/delete/:review_to_user_id/:review_id",
  checkToken,
  deleteMyReview
);
router.post("/report/:review_id", checkToken, reportReview);

module.exports = router;
