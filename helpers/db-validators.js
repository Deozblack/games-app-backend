const Product = require('../models/product');

const productExistsById = async( id ) => {

    // Verificar si el producto existe
    const productExists = await Product.findById(id);
    if ( !productExists ) {
        throw new Error(`The id does not exists: ${ id }`);
    }

}

/**
 * Validar colecciones permitidas
 */
const coleccionesPermitidas = ( coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes( coleccion );
    if ( !incluida ) {
        throw new Error(`La colección ${ coleccion } no es permitida, ${ colecciones }`);
    }
    return true;
}


module.exports = {
    productExistsById,
    coleccionesPermitidas
}

