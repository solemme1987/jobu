const { validationResult } = require('express-validator');

const validateInputs = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    //Este s el siguiente paso a realizar si el midleware de arriba pasa
    next();
};
module.exports = {
    validateInputs,
};