import mysql from "mysql";

let connectToFunc = function () {
    let con = mysql.createConnection({
        host: "localhost",
        user: "yourusername",
        password: "yourpassword"
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        return con;
    });
}
let query = async function (sql, params) {
    const connection = await connectToFunc();
    const [results,] = await connection.execute(sql, params);

    return results;
}
module.exports = {
    query: query
};