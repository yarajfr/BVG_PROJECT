const pool = require('../DB/database');

exports.getAll = async function() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Personaldaten';
        console.log('getAll');
        pool.query(query, (error, results) => {
            console.log(results);
            if(error) reject(error);
            else      resolve(results);
        })
    });
}

exports.getPersonalId = async function(id) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Personaldaten WHERE PersonalNr = ?';
        pool.query(query, [id], (error, results) => {
            if(error) reject(error);
            else      resolve(results);
        })
    });
}

exports.getBus = async function(nr) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Busdaten WHERE BusNr = ?';
        console.log('getBusdaten');
        pool.query(query, [nr], (error, results) => {
            console.log(results);
            if(error) reject(error);
            else      resolve(results);
        })
    });
}
