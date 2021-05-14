const { Router } = require('express');

// importamos midleware check para validar  usuario
const { check } = require('express-validator');

//importamos midle wares personalizado que valida campos requeridos obligatoriamente
const { validateInputs } = require('../middlewares/validate-inputs');

//importamos helper que valida  elrol y otras cosa mas
const { isRole, emailNoRepeat, isUserId, isCountry, validateTerms } = require('../helpers/db-validator');

const {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers,
    usuariosPatch
} = require('../controllers/userController');

const router = Router();

router.get('/', getUsers);

// REGISTRAR USUARIO
router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener al menos 8 caracteres').isLength({ min: 8 }),
    check('email', 'No es un formato de correo valido').isEmail(),
    check('email').custom(emailNoRepeat),
    check('role').custom(isRole),
    check('country').custom(isCountry),
    check('terms').custom(validateTerms),

    validateInputs
], postUsers);

// ACTUALIZAR USUARIO
router.put('/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(isUserId),
    check('role').custom(isRole),
    check('country').custom(isCountry),
    validateInputs
], putUsers);

router.delete('/:id', [
    check('id', 'No es un Id valido').isMongoId(),
    check('id').custom(isUserId),
    validateInputs
], deleteUsers);

router.patch('/', usuariosPatch);

module.exports = router;