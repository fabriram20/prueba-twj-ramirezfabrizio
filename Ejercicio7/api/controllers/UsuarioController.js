/**
 * UsuarioController
 *
 * @description :: Server-side logic for managing Usuarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  crearUsuario: function (req, res) {

    if (req.method == "POST") {

      var parametros = req.allParams();

      if (parametros.nombre && parametros.ciudadResidencia && parametros.fechaNacimiento) {

        var usuarioCrear = {
          nombre: parametros.nombre,
          ciudadResidencia: parametros.ciudadResidencia,
          fechaNacimiento: parametros.fechaNacimiento
        }

        Usuario.create(usuarioCrear).exec(function (err, usuarioCreado) {

          if (err) {
            return res.view('error', {
              error: {
                desripcion: "Fallo al crear el Usuario",
                rawError: err,
                url: "/CrearUsuario"
              }
            });
          }

          Usuario.find()
            .exec(function (errorIndefinido, usuariosEncontrados) {

              if (errorIndefinido) {
                res.view('error', {
                  error: {
                    desripcion: "Hubo un problema cargando los Usuarios",
                    rawError: errorIndefinido,
                    url: "/ListarUsuarios"
                  }
                });
              }

              res.view('Usuario/ListarUsuario', {
                usuarios: usuariosEncontrados
              });
            })

        })


      } else {

        return res.view('error', {
          error: {
            desripcion: "Llena todos los parametros: nombres, ciudad de Residencia y fecha de Nacimiento",
            rawError: "Fallo en envio de parametros",
            url: "/CrearUsuario"
          }

        });

      }


    } else {

      return res.view('Error', {
        error: {
          desripcion: "Error en el uso del Metodo HTTP",
          rawError: "HTTP Invalido",
          url: "/CrearUsuario"
        }
      });

    }

  },

  borrarUsuario: function (req, res) {

    var parametros = req.allParams();

    if (parametros.id) {

      Usuario.destroy({
        id: parametros.id
      }).exec(function (errorInesperado, UsuarioRemovido) {
        if (errorInesperado) {
          return res.view('error', {
            error: {
              desripcion: "Tuvimos un Error Inesperado",
              rawError: errorInesperado,
              url: "/ListarUsuario"
            }
          });
        }
        Usuario.find()
          .exec(function (errorIndefinido, usuariosEncontrados) {

            if (errorIndefinido) {
              res.view('error', {
                error: {
                  desripcion: "Hubo un problema cargando los Usuarios",
                  rawError: errorIndefinido,
                  url: "/ListarUsuario"
                }
              });
            }
            res.view('Usuario/ListarUsuario', {
              usuarios: usuariosEncontrados
            });
          })
      })

    } else {
      return res.view('error', {
        error: {
          desripcion: "Necesitamos el ID para borrar al Usuario",
          rawError: "No envia ID",
          url: "/ListarUsuario"
        }
      });
    }
  },

  actualizarUsuario: function (req, res) {

    var parametros = req.allParams();

    if (parametros.id && (parametros.nombre || parametros.ciudadResidencia || parametros.fechaNacimiento)) {

      var usuarioAEditar = {
        nombre: parametros.nombre,
        ciudadResidencia: parametros.ciudadResidencia,
        fechaNacimiento: parametros.fechaNacimiento
      }

      if (usuarioAEditar.nombre == "") {
        delete usuarioAEditar.nombre
      }
      if (usuarioAEditar.ciudadResidencia == "") {
        delete usuarioAEditar.ciudadResidencia
      }
      if (usuarioAEditar.fechaNacimiento == "") {
        delete usuarioAEditar.fechaNacimiento
      }

      Usuario.update({
        id: parametros.id
      }, usuarioAEditar)
        .exec(function (errorInesperado, UsuarioRemovido) {
          if (errorInesperado) {
            return res.view('error', {
              error: {
                desripcion: "Tuvimos un Error Inesperado",
                rawError: errorInesperado,
                url: "/ListarUsuario"
              }
            });
          }

          Usuario.find()
            .exec(function (errorIndefinido, usuariosEncontrados) {

              if (errorIndefinido) {
                res.view('error', {
                  error: {
                    desripcion: "Hubo un problema cargando los Usuarios",
                    rawError: errorIndefinido,
                    url: "/ListarUsuario"
                  }
                });
              }

              res.view('Usuario/ListarUsuario', {
                usuarios: usuariosEncontrados
              });
            })

        })

    } else {

      return res.view('error', {
        error: {
          desripcion: "Necesitamos que envies el ID y el nombre, apellido o correo",
          rawError: "No envia Parametros",
          url: "/ListarUsuario"
        }
      });

    }

  }

};

