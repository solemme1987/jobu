const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const RecruiterModel = require('../models/recruiterModel');


//OK
const postRecruiter = async(req, res = response) => {

    const { name, email, password, company, role, country, terms } = req.body;
    const recruiter = new RecruiterModel({ name, email, password, company, role, country, terms });

    //Encriptar la  contraseña
    const salt = bcryptjs.genSaltSync();
    recruiter.password = bcryptjs.hashSync(password, salt);

    //Guardar en la db
    await recruiter.save();

    res.json({
        recruiter
    });
};


// ok
const getRecruiter = async(req = request, res = response) => {

    const { from = 0, limit = 5 } = req.query;
    //que solo me muestre lOS reclutadores que tienen  es estado en true
    const query = { state: true };

    const [total_recruiter, recruiter] = await Promise.all([
        RecruiterModel.countDocuments(query),
        RecruiterModel.find(query)
        .skip(Number(from))
        .limit(Number(limit))
    ]);
    res.json({
        total_recruiter,
        recruiter
    });
};


// OK
const putRecruiter = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, terms, email, ...more } = req.body;

    if (password) {
        //Encriptar la  contraseña
        const salt = bcryptjs.genSaltSync();
        more.password = bcryptjs.hashSync(password, salt);
    }
    const recruiter = await RecruiterModel.findByIdAndUpdate(id, more);

    res.json({
        "msg": "PUT RECRUITER",
        recruiter
    });
};

// DEÑETE ÁRA EL USUARIO EN LA API
const deleteRecruiter = async(req, res = response) => {

    const { id } = req.params;
    const recruiter = await RecruiterModel.findByIdAndUpdate(id, { state: false });

    res.json({
        recruiter
    });
};

//exporto todas las funciones
module.exports = {
    getRecruiter,
    postRecruiter,
    putRecruiter,
    deleteRecruiter
};