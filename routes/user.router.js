const {
  signup,
  signin,
  socialSignin,
  getAllUsers,
  getUserInfo,
  sendLink,
  paswordResetPage,
  changePassword,
  UpdateToken,
  reportUser,
  updatePassword,
  sendOTP,
  verifyOTP,
  updateProfile,
  uploadProfileImg,
  checkMobileExist,
  checkEmailExist,
  blockUser,
  unBlockUser,
  blockUserList,
  sendEditEmailLink,
  editEmailInDatabase,
  EditEmailPage,
} = require("../controllers/user.controller");
const router = require("express").Router();
const {
  checkToken,
  checkPasswordToken,
  checkVerifyEmailToken,
} = require("../auth/token_validation");
const {
  paymentRes,
  addPaymentDetails,
} = require("../controllers/payment.controller");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/userprofile");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/[^\w\s]/gi, "") + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (true) {
    cb(null, true);
  } else {
    cb(null, false);
    console.log("error");
  }
};
const upload = multer({
  storage: storage,
  // limitis: { filesize: 1024 * 1024 * 50 },
  limitis: { filesize: 1024 * 1024 * 500 },
  fileFilter: fileFilter,
});

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/social", socialSignin);
router.get("/:id", checkToken, getUserInfo);
// router.get("/:id", checkToken, getUserInfo);
router.get("/forget/:email", sendLink);
router.post("/updatepassword", checkToken, updatePassword);
router.get("/reset/:token", paswordResetPage);
router.post("/reset/password", checkPasswordToken, changePassword);
router.post("/report", checkToken, reportUser);
router.get("/blockuser/:blocked_user_id", checkToken, blockUser);
router.delete("/unblockuser/:blocked_user_id", checkToken, unBlockUser);
router.get("/block/userlist", checkToken, blockUserList);
router.get("/sendotp/:mobile", sendOTP);
router.get("/verifyotp/:mobile/:otp", verifyOTP);
router.get("/checkemail/:email", checkEmailExist);
router.get("/checkmobile/:mobile", checkMobileExist);
// Change Email Route...............................
router.post("/editemail/:email", checkToken, sendEditEmailLink);
router.get("/editemail/:token", EditEmailPage);
router.post("/edit/email", checkVerifyEmailToken, editEmailInDatabase);

router.post(
  "/uploadprofileimg",
  checkToken,
  upload.array("userImg"),
  uploadProfileImg
);

router.post("/updateprofile", checkToken, updateProfile);

router.post("/payment", checkToken, paymentRes);
router.post("/paymentdetails", checkToken, addPaymentDetails);

module.exports = router;
