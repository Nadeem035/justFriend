const {
  createAddress,
  getAllAddresss,
  getOneAddress,
  updateAddressInfo,
  enableAddress,
  disableAddress,
  selectAddresss,
} = require("../controllers/address.controller");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");

router.post("/add", checkToken, createAddress);
router.get("/all", checkToken, getAllAddresss);
router.get("/select/:address_id", checkToken, selectAddresss);
router.get("/:address_id", checkToken, getOneAddress);
router.delete("/:address_id", checkToken, disableAddress);
router.post("/:address_id", checkToken, updateAddressInfo);

module.exports = router;
