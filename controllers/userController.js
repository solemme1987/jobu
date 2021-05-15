const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

/*Importamos el modelo para poder hacer el insert en nuestra coleccion
Es necsario mas no obligacion que coloquemos la importacion de sta constante
en mayuscula inicial para que javascript nos permita hacer instancias del modelo
como si fuerauna clase, el estandar */
const UserModel = require('../models/userModel');


// OBTENR USUARIOS DESDE UN REGISTRO ESPECIFICO ES
const getUsers = async(req = request, res = response) => {

    const { from = 0, limit = 5 } = req.query;
    //que solo me muestre los  usuarios que tienen  es estado en true
    const query = { state: true };

    const [total_users, users] = await Promise.all([
        UserModel.countDocuments(query),
        UserModel.find(query)
        .skip(Number(from))
        .limit(Number(limit))
    ]);

    res.json({
        total_users,
        users
    });
};

// REGISTRA EL USUARIO EN LA API
const postUsers = async(req, res = response) => {

    // /$#Mostramos los errores si el emeail ingresado no es correcto

    const { name, email, password, role, country, terms } = req.body;

    const user = new UserModel({ name, email, password, country, terms, role });

    //VERIFICAR SI EL CORREO EXISTE
    //Encriptar la  contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //Guardar en la db
    await user.save();

    res.json({
        user
    });
};

// ACTUALIZAR EL USARIO
const putUsers = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, terms, email, ...more } = req.body;

    if (password) {
        //Encriptar la  contraseña
        const salt = bcryptjs.genSaltSync();
        more.password = bcryptjs.hashSync(password, salt);
    }
    const user = await UserModel.findByIdAndUpdate(id, more);
    res.json({
        msg: "PUT API - CONTROLADOR",
        user
    });
};

// DEÑETE ÁRA EL USUARIO EN LA API
const deleteUsers = async(req, res = response) => {

    const { id } = req.params;
    // BORRAMOS EL USUARIO FISICAMENTE FORMA NO RECOMENDADA
    // const usuario = await UsuariosModelo.findByIdAndDelete(id);

    // ELIMINAMOS EL USUARIO DE LA FORMA RECOMENDADA CAMBIANDO SU ESTADO A FALSE
    const user = await UserModel.findByIdAndUpdate(id, { state: false });

    res.json({
        msg: "USUARIO ELIMINADO CORRECTAMENTE",
        user
    });
};

// PATCH PAR EL USUARIO EN LA API
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: "PATCH API - CONTROLADOR"
    });
};

//exporto todas las funciones
module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers,
    usuariosPatch
};