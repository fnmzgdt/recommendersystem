const router = require("express").Router();
const {
  addUser,
  likeItem,
  unlikeItem,
} = require("../../controlers/users/users");

router.post("/adduser", addUser);

router.post("/likeitem", likeItem);

router.post("/unlikeitem", unlikeItem);

module.exports = router;
