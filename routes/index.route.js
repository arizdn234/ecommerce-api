const productController = require('../controllers/product.controller');
const userController = require('../controllers/user.controller');

const router = require('express').Router();

// product CRUD
router.get('/api/products', productController.getAllProducts)
router.get('/api/products/:id', productController.getProductByID)
router.post('/api/products', productController.createProduct)
router.put('/api/products/:id', productController.updateProductByID)
router.delete('/api/products/:id', productController.deleteProductByID)

// user CRUD *need bcrypt
router.get('/api/users', userController.getAllUser)
router.get('/api/users/:id', userController.getUserByID)
router.post('/api/users', userController.createUser)
router.put('/api/users/:id', userController.updateUserByID)
router.delete('/api/users/:id', userController.deleteUserByID)

// order CRUD *need spesify userID
// router.get('/api/orders',)
// router.get('/api/orders/:id', )
// router.post('/api/orders', )
// router.put('/api/orders/:id', )
// router.delete('/api/orders/:id', )

// orderItem CRUD
// router.get('/api/orderItems',)
// router.get('/api/orderItems/:id', )
// router.post('/api/orderItems', )
// router.put('/api/orderItems/:id', )
// router.delete('/api/orderItems/:id', )

module.exports = router