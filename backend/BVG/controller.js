const model = require('./model');
//const view = require('./view');

function listAction(request, response) {
    model.getAll().then(
        personen => {
            response.send(personen); // view.personen raus gelöscht
        },
        error => response.send(error),

    );
}

function listPersonalId(request, response) {
    model.getPersonalId().then(
        personen => {
            response.send(personen); // view.personen raus gelöscht
        },
        error => response.send(error),

    );
}



module.exports = {
    listAction,
    listPersonalId,
};