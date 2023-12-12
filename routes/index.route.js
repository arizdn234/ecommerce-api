const productController = require('../controllers/product.controller');
const userController = require('../controllers/user.controller');
const Authorization = require('../middlewares/authorization.middleware');

const router = require('express').Router();

// user login register
router.post('/user/register', userController.register)
router.post('/user/login', userController.login)

// user CRUD
// Read
router.get(
    '/api/users', 
    Authorization.authorizationCustomer, 
    Authorization.authorizationAdmin,
    userController.getAllUser
)
// Read by ID
router.get(
    '/api/users/:id', 
    Authorization.authorizationCustomer, 
    Authorization.authorizationAdmin,
    userController.getUserByID
)
// Create
router.post(
    '/api/users', 
    Authorization.authorizationCustomer, 
    Authorization.authorizationAdmin,
    userController.createUser
)
// Update
router.put(
    '/api/users/:id', 
    Authorization.authorizationCustomer, 
    Authorization.authorizationAdmin,
    userController.updateUserByID
)
// Delete
router.delete(
    '/api/users/:id', 
    Authorization.authorizationCustomer, 
    Authorization.authorizationAdmin,
    userController.deleteUserByID
)

// product CRUD
router.get(
    '/api/products', 
    productController.getAllProducts
)
router.get(
    '/api/products/:id', 
    productController.getProductByID
)
router.post(
    '/api/products', 
    Authorization.authorizationAdmin,
    productController.createProduct
)
router.put(
    '/api/products/:id', 
    Authorization.authorizationAdmin,
    productController.updateProductByID
)
router.delete(
    '/api/products/:id', 
    Authorization.authorizationAdmin,
    productController.deleteProductByID
)


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