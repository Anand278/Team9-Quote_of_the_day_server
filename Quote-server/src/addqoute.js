const Promise = require("bluebird");
const mysql = require("mysql");

Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

const DB_CONFIG = {
  host: "localhost",
  user: "root",
  password: "",
  database: "dacdemo",
};


let addqoute = async (input) => {
  try {
      //create connection 
      const Connection = mysql.createConnection(DB_CONFIG);
      await Connection.connectAsync();

      //Insert Data In database
      let sql = "insert into q (id,qoute)values(?,?)";
      let data = await Connection.queryAsync(sql, [
          input.id,
          input.qoute
      ]);

      Connection.endAsync();
      console.log(data);
      return data;
  } catch (err) {
      const refjson = { message: "Error from server" };
      return err;
  };
};

module.exports = { addqoute };