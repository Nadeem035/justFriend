const { checkToken, checkAdminToken } = require("../auth/token_validation");
const {
  createFoundation,
  updateFoundation,
  getFoundations,
  deleteFoundation,
  getAllFoundations,
} = require("../controllers/foundation.controller");

const router = require("express").Router();

router.post("/", checkAdminToken, createFoundation);
router.put("/:id", checkAdminToken, updateFoundation);
router.get("/", getFoundations);
router.get("/all", checkAdminToken, getAllFoundations);
router.delete("/:id", checkAdminToken, deleteFoundation);

module.exports = router;
