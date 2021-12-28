const { response } = require("express");
const Categoria = require('../models/categoria');

const crearCategoria = async ( req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    
    const categoriaDB = await Categoria.findOne({ nombre });
    
    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria ${ nombre } ya existe`
        });
    }
    
    const data = {
        nombre,
        usuario: req.usuario._id
    }   
    
    const categoria = new Categoria( data );
    await categoria.save();

    res.status(201).json({ msg: 'Categoria creada' });

}

const obtenerCategorias = async ( req, res = response ) => {
    
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const categorias = await Categoria.find(query)
                             .skip(Number(desde))
                             .limit(Number(limite));
    
    const total = await Categoria.countDocuments();
    
    res.json({
        total,
        categorias 
    });

}

const obtenerCategoria = async ( req, res = response ) => {
    
    const { id } = req.params;

    const categoria = await Categoria.findById( id );
    
    if( !categoria ) {
        return res.status(400).json({
            msg: 'Categoria no encontrada'
        });
    }
    else {
        res.json({
           categoria 
        });
    }

}

const actualizarCategoria = async ( req, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });
    
    res.json({ categoria });

}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria
}