
const { response } = require('express');

const usuariosGet = (req, res = response) => {
    res.json({
        msg: 'get API'
    });
}

const usuariosPut = (req, res = response) => {
    res.json({
        msg: 'put API'
    });
}

const usuariosPost = (req, res = response) => {
    res.json({
        msg: 'post API'
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}