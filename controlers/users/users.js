const { addUser, likeItem, unlikeItem } = require("../../services/users/users");

module.exports = {
  addUser: (req, res) => {
    const username = req.body.username;
    addUser(username, (err, results) => {
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
  
  likeItem: (req, res) => {
    const username = req.body.username;
    const name = req.body.name;
    const data = {
      username,
      name,
    };
    likeItem(data, (err, results) => {
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

  unlikeItem: (req, res) => {
    const username = req.body.username;
    const itemId = req.body.itemId;
    const data = {
      username,
      itemId,
    };
    unlikeItem(data, (err, results) => {
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
