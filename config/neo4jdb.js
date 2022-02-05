const neo4j = require("neo4j-driver");
require("dotenv").config();
const { USER, PASSWORD, URL, DATABASE } = process.env;

const driver = neo4j.driver(URL, neo4j.auth.basic(USER, PASSWORD));

module.exports = driver;
