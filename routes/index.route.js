const productController = require('../controllers/product.controller');
const userController = require('../controllers/user.controller');
const Authorization = require('../middlewares/authorization.middleware');

const router = require('express').Router();

// user login register
router.post('/user/register', userController.register)
router.post('/user/login', userController.login)

// --------===<{([user CRUD])}>===--------
// ___[Read]___
router.get(
    '/api/admin/users',
    Authorization.authorizationAdmin,
    userController.getAllUser
)
// ___[Read by ID]___
router.get(
    '/api/users/:id', 
    Authorization.authorizationCustomer,
    userController.getUserByID
)
router.get(
    '/api/admin/users/:id',  
    Authorization.authorizationAdmin,
    userController.getUserByID
)
// ___[Create]___
router.post(
    '/api/admin/users',
    Authorization.authorizationAdmin,
    userController.createUser
)
// ___[Update]___
router.put(
    '/api/users/:id', 
    Authorization.authorizationCustomer,
    userController.updateUserByID
)
router.put(
    '/api/admin/users/:id', 
    Authorization.authorizationAdmin,
    userController.updateUserByID
)
// ___[Delete]___
router.delete(
    '/api/admin/users/:id',
    Authorization.authorizationAdmin,
    userController.deleteUserByID
)

// --------===<{([product CRUD])}>===--------
// ___[Read]___
router.get(
    '/api/products', 
    productController.getAllProducts
)
// ___[Read by ID]___
router.get(
    '/api/products/:id', 
    productController.getProductByID
)
// ___[Create]___
router.post(
    '/api/products', 
    Authorization.authorizationAdmin,
    productController.createProduct
)
// ___[Update]___
router.put(
    '/api/products/:id', 
    Authorization.authorizationAdmin,
    productController.updateProductByID
)
// ___[Delete]___
router.delete(
    '/api/products/:id', 
    Authorization.authorizationAdmin,
    productController.deleteProductByID
)

// --------===<{([order CRUD])}>===--------
// order CRUD *need spesify userID
// router.get('/api/orders',)
// router.get('/api/orders/:id', )
// router.post('/api/orders', )
// router.put('/api/orders/:id', )
// router.delete('/api/orders/:id', )

// --------===<{([orderItem CRUD])}>===--------
// orderItem CRUD
// router.get('/api/orderItems',)
// router.get('/api/orderItems/:id', )
// router.post('/api/orderItems', )
// router.put('/api/orderItems/:id', )
// router.delete('/api/orderItems/:id', )

module.exports = router