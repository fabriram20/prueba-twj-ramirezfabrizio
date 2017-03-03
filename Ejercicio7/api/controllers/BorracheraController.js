/**
 * BorracheraController
 *
 * @description :: Server-side logic for managing Borracheras
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  crearBorrachera: function (req, res) {

    if (req.method == "POST") {

      var parametros = req.allParams();

      if (parametros.motivo && parametros.latitud && parametros.longitud) {

        var borracheraCrear = {
          motivo: parametros.motivo,
          latitud: parametros.latitud,
          longitud: parametros.longitud
        }

        Borrachera.create(borracheraCrear).exec(function (err, borracheraCreada) {

          if (err) {
            return res.view('error', {
              error: {
                desripcion: "Fallo al crear el Usuario",
                rawError: err,
                url: "/CrearBorrachera"
              }
            });
          }

          Borrachera.find()
            .exec(function (errorIndefinido, borracherasEncontradas) {

              if (errorIndefinido) {
                res.view('error', {
                  error: {
                    desripcion: "Hubo un problema cargando los Usuarios",
                    rawError: errorIndefinido,
                    url: "/ListarBorrachera"
                  }
                });
              }

              res.view('Borrachera/listarBorrachera', {
                borracheras: borracherasEncontradas
              });
            })

        })


      } else {

        return res.view('error', {
          error: {
            desripcion: "Llena todos los parametros: nombres, ciudad de Residencia y fecha de Nacimiento",
            rawError: "Fallo en envio de parametros",
            url: "/CrearBorrachera"
          }

        });

      }


    } else {

      return res.view('Error', {
        error: {
          desripcion: "Error en el uso del Metodo HTTP",
          rawError: "HTTP Invalido",
          url: "/CrearBorrachera"
        }
      });

    }

  },

  borrarBorrachera: function (req, res) {

    var parametros = req.allParams();

    if (parametros.id) {

      Borrachera.destroy({
        id: parametros.id
      }).exec(function (errorInesperado, BorracheraRemovida) {
        if (errorInesperado) {
          return res.view('error', {
            error: {
              desripcion: "Tuvimos un Error Inesperado",
              rawError: errorInesperado,
              url: "/ListarBorrachera"
            }
          });
        }
        Borrachera.find()
          .exec(function (errorIndefinido, borracherasEncontradas) {

            if (errorIndefinido) {
              res.view('error', {
                error: {
                  desripcion: "Hubo un problema cargando los Usuarios",
                  rawError: errorIndefinido,
                  url: "/ListarBorrachera"
                }
              });
            }
            res.view('Borrachera/listarBorrachera', {
              borracheras: borracherasEncontradas
            });
          })
      })

    } else {
      return res.view('error', {
        error: {
          desripcion: "Necesitamos el ID para borrar al Usuario",
          rawError: "No envia ID",
          url: "/ListarBorrachera"
        }
      });
    }
  },

  actualizarBorrachera: function (req, res) {

    var parametros = req.allParams();
    console.log(parametros);

    if (parametros.id && (parametros.motivo || parametros.latitud || parametros.longitud)) {

      var borracheraAEditar = {
        motivo: parametros.motivo,
        latitud: parametros.latitud,
        longitud: parametros.longitud
      }

      if (borracheraAEditar.motivo == "") {
        delete borracheraAEditar.motivo
      }
      if (borracheraAEditar.latitud == "") {
        delete borracheraAEditar.latitud
      }
      if (borracheraAEditar.longitud == "") {
        delete borracheraAEditar.longitud
      }

      Borrachera.update({
        id: parametros.id
      }, borracheraAEditar)
        .exec(function (errorInesperado, BorracheraRemovida) {
          if (errorInesperado) {
            return res.view('error', {
              error: {
                desripcion: "Tuvimos un Error Inesperado",
                rawError: errorInesperado,
                url: "/ListarBorrachera"
              }
            });
          }

          Borrachera.find()
            .exec(function (errorIndefinido, borracherasEncontradas) {

              if (errorIndefinido) {
                res.view('error', {
                  error: {
                    desripcion: "Hubo un problema cargando los Usuarios",
                    rawError: errorIndefinido,
                    url: "/ListarBorrachera"
                  }
                });
              }

              res.view('Borrachera/listarBorrachera', {
                borracheras: borracherasEncontradas
              });
            })

        })

    } else {

      return res.view('error', {
        error: {
          desripcion: "Necesitamos que envies el ID y el nombre, apellido o correo",
          rawError: "No envia Parametros",
          url: "/ListarBorrachera"
        }
      });

    }

  }

};

