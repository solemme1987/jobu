const RoleModel = require('../models/roleModel');
const UserModel = require('../models/userModel');
const CountryModel = require('../models/countryModel');

// VALIDAR QUE EL ROL SELECCIONADO SE ENCUENTRE REGISTRADO EN LA BD
const isRole = async(role = '') => {
    const searchRole = await RoleModel.findOne({ role });
    if (!searchRole) {
        throw new Error('El rol ingresado no se encuentra en la BD');
    }
};

const isCountry = async(country = '') => {

    const searchCountry = await CountryModel.findOne({ "country": country });
    if (!searchCountry) {
        throw new Error(`El Nombre del país no se encuentra en la Base de datos ${country}`);
    }
};

// VALIDAR QUE NO SE REPITA CORREO ELCTRONICO
const emailNoRepeat = async(email = '') => {
    const searchEmail = await UserModel.findOne({ email });
    if (searchEmail) {
        throw new Error(`El correo ${email} ya ha sido registrado en la bd`);
    }
};

// VALIDAR QUE El usuario con ese id si exista
const isUserId = async(id = '') => {
    const searchUser = await UserModel.findById(id);
    if (!searchUser) {
        throw new Error(`No Existe un usuario Registrado con el  id: ${id}`);
    }
};
const validateTerms = async(terms = '') => {

    if (terms === false) {
        throw new Error(`Debe aceptar los terminos y condiciones`);
    }
};
module.exports = {
    isRole,
    emailNoRepeat,
    isUserId,
    isCountry,
    validateTerms
};