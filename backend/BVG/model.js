const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'elif',
    password: 'elif',   /* hier muss Ihr Passwort hin */
    database: 'BVG_Daten',
});

connection.connect();

function getAll() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Personaldaten';
        connection.query(query, (error, results) => {
            if(error) reject(error);
            else      resolve(results);
        })
    });
}

function getPersonalId() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT PersonalNr FROM Personaldaten';
        connection.query(query, (error, results) => {
            if(error) reject(error);
            else      resolve(results);
        })
    });
}


module.exports = {
    getAll,
    getPersonalId,
};