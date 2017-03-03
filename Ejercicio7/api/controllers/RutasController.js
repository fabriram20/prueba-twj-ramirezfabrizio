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
  },

  listarUsuarios: function (req, res) {
    Usuario.find()
      .exec(function (errorIndefinido, usuariosEncontrados) {
        if (errorIndefinido) {
          res.view('Error', {
            error: {
              desripcion: "Hubo un problema listando los Usuarios",
              rawError: errorIndefinido,
              url: "/ListarUsuarios"
            }
          });
        }
        res.view('Usuario/ListarUsuario', {
          usuarios: usuariosEncontrados
        });
      })
  },

  listarBorracheras: function (req, res) {
    Borrachera.find()
      .exec(function (errorIndefinido, borracherasEncontradas) {
        if (errorIndefinido) {
          res.view('error', {
            error: {
              desripcion: "Hubo un problema listando las borracheras",
              rawError: errorIndefinido,
              url: "/ListarBorracheras"
            }
          });
        }
        res.view('Borrachera/ListarBorrachera', {
          borracheras: borracherasEncontradas
        });
      })
  },

  actualizarUsuarioRuta: function (req, res) {

    var parametros = req.allParams();
    if (parametros.id) {
      Usuario.findOne({
        id: parametros.id
      }).exec(function (error, usuarioEncontrado) {
        if (error) return res.serverError()
        return res.view('Usuario/actualizarUsuario', {
          title: 'Editar usuario - ' + usuarioEncontrado.nombre,
          usuario: usuarioEncontrado
        })
      });

    } else {
      return res.view('error', {
        title: 'Error',
        error: {
          descripcion: 'No existe el ID del Usuario'
        }
      });
    }
  }
};
