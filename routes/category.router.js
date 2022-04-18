const {
  getCategories,
  getSubCategoryById,
  getCategoryBySearch,
} = require("../controllers/category.controller");
const router = require("express").Router();

router.get("/", getCategories);
router.get("/:id", getSubCategoryById);
router.post("/search", getCategoryBySearch);

module.exports = router;
