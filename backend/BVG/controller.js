const model = require('./model');
const view = require('./view');

function listAction(request, response) {
    model.getAll().then(
        personen => {
            response.send(view(personen));
        },
        error => response.send(error),

    );
}

module.exports = {
    listAction,
};