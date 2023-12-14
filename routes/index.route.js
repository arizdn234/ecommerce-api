const CartController = require('../controllers/cart.controller');
const DefaultController = require('../controllers/default.controller');
const OrderController = require('../controllers/order.controller');
const PaymentController = require('../controllers/payment.controller');
const productController = require('../controllers/product.controller');
const SearchController = require('../controllers/search.controller');
const userController = require('../controllers/user.controller');
const Authorization = require('../middlewares/authorization.middleware');

const router = require('express').Router();

// Landing Pages
router.get('/', DefaultController.landingPage)

// user login register
router.post('/user/register', userController.register)
router.post('/user/login', userController.login)

// --------===<{([user Routes])}>===--------
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

// --------===<{([product Routes])}>===--------
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

// --------===<{([order Routes])}>===--------
// order Routes *need spesify userID
// ___[Create]___
router.post(
    '/api/orders',
    Authorization.authorizationCustomer,
    OrderController.createOrder
)
router.post(
    '/api/admin/orders',
    Authorization.authorizationAdmin,
    OrderController.createOrder
)
// ___[Read by order ID]___
router.get(
    '/api/orders/:id', 
    Authorization.authorizationCustomer,
    OrderController.getOrderById
)
router.get(
    '/api/admin/orders/:id', 
    Authorization.authorizationAdmin,
    OrderController.getOrderById
)
// ___[Read by user ID]___
router.get(
    '/api/orders/users/:userId', 
    Authorization.authorizationCustomer,
    OrderController.getOrderByUserId
)
router.get(
    '/api/admin/orders/users/:userId', 
    Authorization.authorizationAdmin,
    OrderController.getOrderByUserId
)
// ___[Update]___
router.put(
    '/api/admin/orders/:id', 
    Authorization.authorizationAdmin,
    OrderController.updateOrder
)
// ___[Delete]___
router.delete(
    '/api/admin/orders/:id', 
    Authorization.authorizationAdmin,
    OrderController.deleteOrder
)

// --------===<{([Payment Routes])}>===--------
router.post(
    '/api/payment',
    Authorization.authorizationCustomer,
    PaymentController.processPayment
)
router.post(
    '/api/admin/payment',
    Authorization.authorizationAdmin,
    PaymentController.processPayment
)

// --------===<{([Search Routes])}>===--------
router.get(
    '/api/search?q=:query',
    SearchController.searchProducts
)
router.get(
    '/api/products/category/:category',
    SearchController.filterProductsByCategory
)

// --------===<{([Cart Routes])}>===--------
router.get(
    '/api/cart',
    Authorization.authorizationCustomer,
    CartController.getCart
)
router.post(
    '/api/cart/add',
    Authorization.authorizationCustomer,
    CartController.addToCart
)
router.put(
    '/api/cart/update/:productId',
    Authorization.authorizationCustomer,
    CartController.updateCartItem
)
router.delete(
    '/api/cart/remove/:productId',
    Authorization.authorizationCustomer,
    CartController.removeCartItem
)

module.exports = router