const { Schema, model } = require('mongoose');


const UserSchema = Schema({

    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },

    email: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'La contraseña  es obligatorio']
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

    google: {
        type: Boolean,
        default: false
    },


});

UserSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject();
    return user;
};

module.exports = model('User', UserSchema);