const router = require("express").Router();
const { addItem, getItems, addItems} = require("../../controlers/items/items");

router.get("/getitems", getItems); 

router.post("/additem", addItem);

router.post("/additems", addItems)


module.exports = router;
