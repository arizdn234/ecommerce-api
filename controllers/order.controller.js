const { PrismaClient } = require('@prisma/client');
const Order = new PrismaClient().order;

class OrderController {
    static async createOrder(req, res) {
        try {
            const { userId, totalAmount, status, orderItems } = req.body;
            const newOrder = await Order.create({
                data: {
                    userId,
                    totalAmount,
                    status,
                    orderItems: {
                        create: orderItems,
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
}

module.exports = OrderController;
