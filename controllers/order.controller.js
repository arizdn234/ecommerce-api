const { PrismaClient } = require('@prisma/client');
const { verifyToken } = require('../helpers/jwt.helper');
const Order = new PrismaClient().order;

class OrderController {
    static async createOrder(req, res) {
        try {
            const accessToken = req.headers["access-token"]
            const decoded = verifyToken(accessToken)
            const { orderItems } = req.body;
            
            const totalAmount = orderItems.reduce((total, item) => {
                return total + item.quantity * item.price;
            }, 0);
    
            const newOrder = await Order.create({
                data: {
                    userId: decoded.id,
                    totalAmount,
                    status: "pending",
                    orderItems: {
                        create: orderItems.map(item => ({
                            quantity: item.quantity,
                            subtotal: item.quantity * item.price,
                            product: {
                                connect: { id: item.productId }
                            },
                        })),
                    },
                },
                include: {
                    orderItems: true,
                },
            });
            
            res.status(201).json(newOrder);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getOrderById(req, res) {
        try {
            const { id } = req.params;
            const order = await Order.findUnique({
                where: { id: parseInt(id) },
                include: {
                    orderItems: true,
                },
            });
            if (!order) {
                res.status(404).json({ error: 'Order not found' });
            } else {
                res.json(order);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getOrderByUserId(req, res) {
        try {
            const { userId } = req.params;
            const orders = await Order.findMany({
                where: { userId: parseInt(userId) },
                include: {
                    orderItems: true,
                },
            });
            res.json(orders);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async updateOrder(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const updatedOrder = await Order.update({
                where: { id: parseInt(id) },
                data: { status },
                include: {
                    orderItems: true,
                },
            });
            res.json(updatedOrder);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async deleteOrder (req, res) {
        try {
            const OrderID = req.params.id
            if (!await Order.findUnique({ where: { id: parseInt(OrderID) }})) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'Order not found'
                })
            }
            const deletedOrder = await Order.delete({
                where: { id: parseInt(OrderID) },
            })

            res.status(200).json({
                status: 'success',
                message: 'Successfully deleted',
                data: deletedOrder
            })
        } catch (error) {
            res.status(400).json({
                status: 'failed',
                message: error.message
            })
        }
    }
}

module.exports = OrderController;
