/**
 * RutasController
 *
 * @description :: Server-side logic for managing Rutas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    home: function (req, res) {
        return res.view('home');
    },
    error: function (req, res) {
        return res.view('error', {
            error: {
                desripcion: "Usted esta por error en esta Ruta dirijase a Inicio",
                rawError: "Ruta equivocada",
                url: "/home"
            }
        });
    },
    crearUsuario: function (req, res) {
        return res.view('Usuario/crearUsuario');
    },
    crearBorrachera: function (req, res) {
        return res.view('Borrachera/crearBorrachera');
    }
};