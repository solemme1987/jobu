const { Router } = require('express');

// importamos midleware check para validar  usuario
const { check } = require('express-validator');

//importamos midle wares personalizado que valida campos requeridos obligatoriamente
const { validateInputs } = require('../middlewares/validate-inputs');
const { isRole, emailNoRepeat, isCountry, validateTerms, isRecruiterID } = require('../helpers/recruiterValidator');

const {
    getRecruiter,
    postRecruiter,
    putRecruiter,
    deleteRecruiter,
} = require('../controllers/recruiterController');

const router = Router();

router.get('/', getRecruiter);

// REGISTRAR USUARIO
router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('company', 'El nombre de la empresa es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener al menos 8 caracteres').isLength({ min: 8 }),
    check('email', 'No es un formato de correo valido').isEmail(),
    check('email').custom(emailNoRepeat),
    check('role').custom(isRole),
    check('country').custom(isCountry),
    check('terms').custom(validateTerms),

    validateInputs
], postRecruiter);

// ACTUALIZAR USUARIO
router.put('/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(isRecruiterID),
    check('role').custom(isRole),
    check('country').custom(isCountry),
    validateInputs
], putRecruiter);

router.delete('/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(isRecruiterID),
    validateInputs
], deleteRecruiter);



module.exports = router;