const { Schema, model } = require('mongoose');


const RecruiterSchema = Schema({

    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },

    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'La contraseña  es obligatorio']
    },

    company: {
        type: String,
        required: [true, 'El El nomnbre de la empresa  es obligatorio']
    },
    img: {
        type: String
    },

    role: {
        type: String,
        required: true
    },

    country: {
        type: String,
        required: true
    },

    terms: {
        type: Boolean,
        required: [true, 'Debe aceptar los terminos y condiciones '],
        default: false
    },

    state: {
        type: Boolean,
        default: true
    },


});

RecruiterSchema.methods.toJSON = function() {
    const { __v, password, ...recruiter } = this.toObject();
    return recruiter;
};

module.exports = model('Recruiter', RecruiterSchema);