const { addItem, getItems, addItems } = require("../../services/items/items");

module.exports = {
  addItem: (req, res) => {
    const name = req.body.name;
    addItem(name, (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ success: 0, message: "DB connection error!" });
      }
      if (!results) {
        return res.status(200).json({ success: 0, message: "No items found." });
      }
      return res
        .status(200)
        .json({ success: 1, data: results.summary.counters._stats });
    });
  },
  getItems: (req, res) => {
    getItems((err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ success: 0, message: "DB connection error!" });
      }
      if (!results) {
        return res.status(200).json({ success: 0, message: "No items found." });
      }
      return res.status(200).json({ success: 1, data: results });
    });
  },
  addItems: (req, res) => {
    const items = req.body.items;
    addItems(items, (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ success: 0, message: "DB connection error!" });
      }
      if (!results) {
        return res.status(200).json({ success: 0, message: "No items found." });
      }
      return res
        .status(200)
        .json({ success: 1, data: results.summary.counters._stats });
    });
  },
};
