const { checkToken } = require("../auth/token_validation");
const {
  createProduct,
  updateProduct,
  getProducts,
  getProductsByCatId,
  getProductById,
  deleteProduct,
  getFilterProducts,
  getSortProducts,
  addToFavourite,
  deleteFromFavourite,
  getSearchProducts,
  getFavProducts,
  getMyPostProduct,
  getMySoldProduct,
  getUserPostProduct,
  addFeatured,
  getFeatured,
  markProductSold,
  mySoldProducts,
} = require("../controllers/product.controller");
const path = require("path");
const multer = require("multer");
const router = require("express").Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/products");
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

router.get("/", checkToken, getProducts);
router.get("/category/:cat_id", checkToken, getProductsByCatId);
router.get("/:id", checkToken, getProductById);
router.post("/sort", checkToken, getSortProducts);
router.post("/filter", checkToken, getFilterProducts);
router.post("/search", checkToken, getSearchProducts);
router.post("/create", checkToken, upload.array("img"), createProduct);
router.patch("/update", checkToken, updateProduct);
router.delete("/delete/:productId", checkToken, deleteProduct);
router.delete("/favourite/:product_id", checkToken, deleteFromFavourite);
router.post("/favourite/:product_id", checkToken, addToFavourite);
router.post("/favourite", checkToken, getFavProducts);
router.post("/myproducts", checkToken, getMyPostProduct);
router.post("/mysoldproducts", checkToken, getMySoldProduct);
router.post("/productsbyuser/:user_id", checkToken, getUserPostProduct);
router.put("/addfeatured", checkToken, addFeatured);
router.post("/getfeatured", checkToken, getFeatured);
router.put("/marksold/:product_id", checkToken, markProductSold);
router.get("/myproducts/sold", checkToken, mySoldProducts);

module.exports = router;
