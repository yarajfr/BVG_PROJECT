const pool = require('../DB/database');

exports.getAll = async function() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Busdaten';
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

exports.getBussePruefer = async function(nr) {
    console.log(nr);
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Busdaten WHERE Pruefer = ?';
        console.log('getBusdaten');
        pool.query(query, [nr], (error, results) => {
            console.log(results);
            if(error) reject(error);
            else      resolve(results);
        })
    });
}

exports.setPrueferBus = async function(prueferNr, req, res) {
    return new Promise((resolve, reject) => {
        try {
            console.log('------- model ---------');
            console.log(prueferNr);
            // console.log(req);
            console.log(req.body.BusNr);
            console.log('------- model ---------');
            let BusNr = parseInt(req.body.BusNr);
            const checkBusNr = 'Select * FROM Busdaten WHERE BusNr = ?';
            pool.query(checkBusNr, [BusNr], (err, result) => {
                console.log(result[0].BusNr);
                if (result[0].BusNr == BusNr) {
                    console.log('check ok');
                    const sql = 'UPDATE Busdaten SET Pruefer = ? WHERE BusNr = ?';
                    pool.query(
                        sql, [prueferNr, BusNr],
                        (err, result) => {
                            if (err) {
                                reject({status: 2, data: err});
                            } else {
                                resolve({status: 1, data: result});
                            }
                        })
                }
            });
        } catch (error) {
            console.log('BusNr nicht vorhanden!');
            reject({status: 0, error: error});
        }
    });
}
