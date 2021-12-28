
const { OAuth2Client } = require('google-auth-library');

const cliente = new OAuth2Client( process.env.GOOGLE_CLIENT_ID );

const googleVerify = async ( idToken = '' ) => {
    
    const ticket = await cliente.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID
    });

    const { name: nombre,
            picture: img,
            email: correo 
          } = ticket.getPayload();
    
    return { nombre, img, correo };

}

module.exports = {
    googleVerify
}

