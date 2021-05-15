const RoleModel = require('../models/roleModel');
const RecruiterModel = require('../models/recruiterModel');
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

// VALIDAR QUE NO SE REPITA CORREO ELCTRONICO  DE LA EMPRESA
const emailNoRepeat = async(email = '') => {
    const searchEmail = await RecruiterModel.findOne({ email });
    if (searchEmail) {
        throw new Error(`Otra Empresa ya está utilizando el email: ${email}`);
    }
};

// VALIDAR QUE LA EMPRESA CON ESE ID A ACTUALIZAR EXISTA
const isRecruiterID = async(id = '') => {
    const searchRecruiter = await RecruiterModel.findById(id);
    if (!searchRecruiter) {
        throw new Error(`No Existe una empresa con ese id Registrado con el  id: ${id}`);
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
    isRecruiterID,
    isCountry,
    validateTerms,

};