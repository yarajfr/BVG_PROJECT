const model = require('./loginModel.js');

exports.registerAction = async function(request, response) {
    console.log('registerAction');
    console.log(request.body);
    model.register((request, response)).then(
        data => {
            console.log('loginAction');
            console.log(data);
            response.send(data);
        },
        error => response.send(error),
    );
}

exports.loginAction = async function(request, response) {
    console.log('loginAction');
    console.log(request.body);
    model.login((request, response)).then(
        data => {
            console.log('loginAction');
            console.log(data);
            response.send(data);
        },
        error => response.send(error),
    );
}

exports.readAction = async function(request, response) {
    console.log('readAction');
    model.readAll().then(
        data => {
            response.send(data);
        },
        error => response.send(error),

    );
}

exports.readIdAction = async function(request, response) {
    model.readOne(request.params.id).then(
        data => {
            response.send(data);
        },
        error => response.send(error),

    );
}

