const driver = require("../../config/neo4jdb");
require("dotenv").config();

module.exports = {
  getItems: (callBack) => {
    const session = driver.session();
    session
      .run(`MATCH (n:Item) RETURN n`)
      .then((result) => {
        session.close();
        if (!result.records[0]) {
          return callBack("No items found.");
        }
        const itemsArray = [];
        result.records.forEach((item) => {
          itemsArray.push({
            id: item._fields[0].identity.low,
            name: item._fields[0].properties.name,
          });
        });

        return callBack(null, itemsArray);
      })
      .catch((err) => {
        session.close();
        console.log(`DB ERROR: ${err}`);
        return callBack(err.stack);
      });
  },
  addItem: (data, callBack) => {
    const session = driver.session();
    session
      .run(`CREATE (n:Item {name: $nameParam})`, {
        nameParam: data,
      })
      .then((result) => {
        session.close();
        return callBack(null, result);
      })
      .catch((err) => {
        session.close();
        console.log(`DB ERROR: ${err}`);
        return callBack(err.stack);
      });
  },
  addItems: (data, callBack) => {
    const session = driver.session();
    let query = `CREATE`;
    let params = {};
    //data = [{name: }, {name: }, {name: }]
    for (let i = 0; i < data.length; i++) {
      if (i === data.length - 1) {
        query += `(:Item {name: $nameParam${i}})`;
      } else {
        query += `(:Item {name: $nameParam${i}}), `;
      }
    }

    for (let j = 0; j < data.length; j++) {
      params[`nameParam${j}`] = data[j].name;
    }

    session
      .run(query, params)
      .then((result) => {
        session.close();
        return callBack(null, result);
      })
      .catch((err) => {
        session.close();
        console.log(`DB ERROR: ${err}`);
        return callBack(err.stack);
      });
  },
};
