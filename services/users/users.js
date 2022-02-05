const driver = require("../../config/neo4jdb");
require("dotenv").config();

module.exports = {
  addUser: (data, callBack) => {
    const session = driver.session();
    session
      .run(`CREATE (n:User {username: $usernameParam})`, {
        usernameParam: data,
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

  likeItem: (data, callBack) => {
    const session = driver.session();
    const query = `MATCH(a:User),
                      (b:Item)
                 WHERE a.username = $usernameParam AND b.name = $nameParam
                 MERGE (a)-[r:LIKES]->(b)
                 RETURN type(r)`;
    session
      .run(query, {
        usernameParam: data.username,
        nameParam: data.name,
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
  
  unlikeItem: (data, callBack) => {
    const session = driver.session();
    const query = `MATCH (n:User {username: $usernameParam})-[r:LIKES]->(i:Item) WHERE id(i) = $idParam
                  DELETE r`;
    session
      .run(query, {
        usernameParam: data.username,
        idParam: data.itemId,
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
};
