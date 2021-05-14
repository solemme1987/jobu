const { Schema, model } = require('mongoose');


const CountrySchema = Schema({
    name_en: {
        type: String,
        required: [true, 'El nombre en inglés es obligatorio']
    },
    country: {
        type: String,
        required: [true, 'El nombre del pais es obligatorio']
    },
    dial_code: {
        type: String,
        required: [true, 'El Codigo dial  de país es obligatorio']
    },
    code: {
        type: String,
        required: [true, 'El el codigo del pais es obligatorio']
    },

});

module.exports = model('Countrie', CountrySchema);