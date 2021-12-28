
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {
    
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const usuarios = await Usuario.find( query )
                    .limit(Number(limite))
                    .skip(Number(desde));

    const total = await Usuario.countDocuments( query );
    
    /* Para una mayor eficiencia:
        const { usuarios, total } = await Promise.all([
            Usuario.find( query ).limit(Number(limite)).skip(Number(desde)),
            Usuario.countDocuments( query )
        ]) 
    */

    res.json({
        total,
        usuarios
    });
}

const usuariosPut = async (req = request, res = response) => {
    
    const { id } = req.params;
    const { uid, password, google, correo, ...resto } = req.body;

    if ( password ) {
       const salt = bcryptjs.genSaltSync();
       resto.password = bcryptjs.hashSync(password, salt); 
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json({
        msg: 'put API',
        usuario
    });
}

const usuariosPost = async (req = request, res = response) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( {nombre, correo, password, rol} );

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await usuario.save();

    res.json({
        msg: 'post API',
        usuario
    });
}

const usuariosDelete = async (req, res = response) => {
    
    const { id } = req.params;
    
    // const usuario = await Usuario.findByIdAndDelete( id );
    const usuario = await Usuario.findByIdAndUpdate( id, {estado: false} );

    const usuarioAutenticado = req.usuario;

    res.json({
        msg: 'delete API',
        usuario,
        usuarioAutenticado
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}