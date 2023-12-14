const { PrismaClient } = require('@prisma/client');
const CartItems = new PrismaClient().cartItems;

class CartController {
	static async getCart(req, res) {
		try {
			const accessToken = req.headers["access-token"]
			const decoded = verifyToken(accessToken)

			const cartItems = await CartItems.findMany({
				where: { userId: decoded.id },
				include: {
					product: true,
				},
			});

			res.status(200).json({
				status: 'success',
				data: cartItems,
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	}

	static async addToCart(req, res) {
		try {
			const accessToken = req.headers["access-token"]
			const decoded = verifyToken(accessToken)
			const { productId, quantity } = req.body;

			const product = await prisma.product.findUnique({
				where: { id: productId },
			});

			if (!product) {
				return res.status(404).json({ error: 'Product not found' });
			}

			const cartItem = await CartItems.create({
				data: {
					userId: decoded.id,
					productId,
					quantity,
				},
				include: {
					product: true,
				},
			});

			res.status(201).json({
				status: 'success',
				data: cartItem,
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	}

	static async updateCartItem(req, res) {
		try {
			const { productId } = req.params;
			const { quantity } = req.body;

			const updatedCartItem = await CartItems.update({
				where: { productId_userId: { productId: parseInt(productId), userId: req.user.id } },
				data: { quantity },
				include: {
					product: true,
				},
			});

			res.json({
				status: 'success',
				data: updatedCartItem,
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	}

	static async removeCartItem(req, res) {
		try {
			const accessToken = req.headers["access-token"]
			const decoded = verifyToken(accessToken)
			const { productId } = req.params;

			await CartItems.delete({
				where: { productId_userId: { productId: parseInt(productId), userId: decoded.id} },
			});

			res.json({
				status: 'success',
				message: 'Item removed from the cart',
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal Server Error' });
		}
	}
}

module.exports = CartController;
