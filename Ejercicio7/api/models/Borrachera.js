/**
 * Borrachera.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        motivo: {
            type: 'string',
            required: true
        },

        latitud: {
            type: 'integer',
            required: true
        },
        longitud: {
            type: 'integer',
            required: true
        },
        //Mascotas -> es el nombre en plural del modelo a relacionarse
        usuarios: {
            // Collection -> Nombre del Modelo en Sails
            collection: 'Usuario',
            // Via-> Es el campo por el cual vamos a relacionar FOREIGN KEY
            via: 'idBorrachera'
        }

    }
};