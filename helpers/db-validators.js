
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const rolValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ) {
        throw new Error(`El rol ${ rol } no esta registado en la BD`);
    }
}

const emailExiste = async( correo = '' ) => {
    const exist = await Usuario.findOne({ correo });
    if( exist ) {
        throw new Error(`El email ya se encuentra en la BD`);
    }
} 

const existeUsuarioPorId = async( id ) => {
    const exist = await Usuario.findOne({ id });
    if( !exist ) {
        throw new Error(`El id ya se encuentra registrado`);
    }
} 

module.exports = {
    emailExiste,
    existeUsuarioPorId,
    rolValido
}