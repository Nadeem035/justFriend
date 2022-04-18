const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");
const { getNotifications } = require("../controllers/push.controller");
const { UpdateToken } = require("../controllers/user.controller");

router.put("/UpdateToken", checkToken, UpdateToken);
router.get("/getnotifications", checkToken, getNotifications);

module.exports = router;
