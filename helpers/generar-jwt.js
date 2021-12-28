
const jwt = require('jsonwebtoken');

const generarJWT = async ( uid = '' ) => {

    return new Promise( (resolve, reject) => {
        const payload = { uid };
        
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err, token) => {
            console.log(err);
            if( err ) {
                reject('No se pudo generar el token');
            }
            else {
                resolve( token );
            }
        });
    });
}

module.exports = {
    generarJWT
}