
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

let removepp = async (data1) => {
    const connection = mysql.createConnection(DB_CONFIG);
    await connection.connectAsync();


    let sql = "DELETE FROM q WHERE id = ?;"
    let results = await connection.queryAsync(sql,[data1.id]);
    if(results.affectedRows === 0) {
    throw Error(err);
}    
    await connection.endAsync();
    
};

 module.exports = { removepp };
