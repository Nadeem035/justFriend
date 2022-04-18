const {
  signup,
  signin,
  getUserById,
  getAllUsers,
  disableUser,
  enableUser,
  getUserPostProduct,
  getAllProducts,
  userCount,
  productCount,
  soldProductCount,
  featuredProductCount,
  categoryCount,
  favCount,
  getProductById,
  getReportedUsers,
  getReportedReviews,
  deleteReportedReviews,
} = require("../controllers/admin.controller");
const { checkAdminToken } = require("../auth/token_validation");
const {
  createCategory,
  updateCategory,
  enableCategory,
  disableCategory,
  allCategories,
  getSubCategoriesByCatId,
  createSubCategory,
  updateSubCategory,
  enableSubCategory,
  disableSubCategory,
} = require("../controllers/category.controller");
const {
  updateProduct,
  getProducts,
} = require("../controllers/product.controller");

const { getPayments } = require("../controllers/payment.controller");

const path = require("path");
const multer = require("multer");
const router = require("express").Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/category");
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
  limitis: { filesize: 1024 * 1024 * 50 },
  fileFilter: fileFilter,
});
// Admin signUp/Signin.........................................
router.post("/signup", signup);
router.post("/signin", signin);

// Nadeem
// User CRUD calls..................................
// router.get("/allusers", checkAdminToken, getAllUsers);
router.get("/allusers", getAllUsers);
router.get("/allreportedusers", checkAdminToken, getReportedUsers);
router.get("/user/:user_id", checkAdminToken, getUserById);
router.put("/user/:user_id", checkAdminToken, enableUser);
router.delete("/user/:user_id", checkAdminToken, disableUser);

//User Reviews....................................................
router.get("/reportedreviews", checkAdminToken, getReportedReviews);
router.delete(
  "/reportedreviews/:review_id",
  checkAdminToken,
  deleteReportedReviews
);

// Products CRUD calls................................
router.get("/products", checkAdminToken, getAllProducts);
router.get("/user/products/:user_id", checkAdminToken, getUserPostProduct);
// ....not working yet
router.get("/category/products/:cat_id", checkAdminToken, getProducts);
router.get("/product/:id", checkAdminToken, getProductById);
router.post("/product/update", checkAdminToken, updateProduct);

router.get("/payments", checkAdminToken, getPayments);

// Category CRUD calls.......................
router.get("/category", checkAdminToken, allCategories);
router.put("/category/:id", checkAdminToken, enableCategory);
router.delete("/category/:id", checkAdminToken, disableCategory);
router.post(
  "/createItemCategory",
  checkAdminToken,
  upload.array("img"),
  createCategory
);
router.post(
  "/updatecategory/:catId",
  checkAdminToken,
  upload.array("img"),
  updateCategory
);

// Sub Categody CRUD.....................
router.get("/subcategory/:cat_id", checkAdminToken, getSubCategoriesByCatId);
router.post("/subcategory", checkAdminToken, createSubCategory);
router.post("/subcategory/:id", checkAdminToken, updateSubCategory);
router.put("/subcategory/:id", checkAdminToken, enableSubCategory);
router.delete("/subcategory/:id", checkAdminToken, disableSubCategory);

// Count USER,PRODUCTS,CATEGORIES,FAVOURITE
router.get("/userCount", checkAdminToken, userCount);
router.get("/productCount", checkAdminToken, productCount);
router.get("/soldProductCount", checkAdminToken, soldProductCount);
router.get("/featuredProductCount", checkAdminToken, featuredProductCount);
router.get("/categoryCount", checkAdminToken, categoryCount);
router.get("/favCount", checkAdminToken, favCount);

module.exports = router;
