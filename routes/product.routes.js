const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares');
const { productExistsById } = require('../helpers/db-validators');
const { getProducts, getProductById, createProduct, updateProduct, deleteProductById } = require('../controllers/product.controller');

const router = Router();

//  Obtener todos los productos
router.get('/', getProducts );

// Obtener un producto por id
router.get('/:id',[
    check('id', 'It is not a valid mongo id').isMongoId(),
    check('id').custom( productExistsById )
], getProductById );

// Crear un producto
router.post('/', [ 
    check('sku','SKU is required').not().isEmpty(),
    check('name','Name is required').not().isEmpty(),
    check('description','Description is required').not().isEmpty(),
    validateFields
], createProduct );

// Actualizar un producto
router.put('/:id',[
    check('id').custom( productExistsById ),
    check('sku','SKU is required').not().isEmpty(),
    check('name','Name is required').not().isEmpty(),
    check('description','Description is required').not().isEmpty(),
    validateFields
], updateProduct );

// Borrar un producto
router.delete('/:id',[
    check('id', 'It is not a valid mongo id').isMongoId(),
    check('id').custom( productExistsById )
], deleteProductById);


module.exports = router;