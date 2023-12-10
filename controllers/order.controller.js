const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

class orderController {
    static async getAllOrder (req, res) {
        try {
            const orders = await prisma.order.findMany()
            res.status(200).json({
                status: 'success',
                data: orders
            })
        } catch (error) {
            res.status(400).json({
                status: 'failed',
                message: error.message
            })
        }
    }
    
    static async createOrder (req, res) {
        try {
            const { name, price, description } = req.body
            const order = await prisma.order.create({ 
                data: {
                    name,
                    price,
                    description 
                }
            }) 
            res.status(201).json({
                status: 'success',
                data: order
            })
        } catch (error) {
            res.status(400).json({
                status: 'failed',
                message: error.message
            })
        }
    }

    static async getOrderByID (req, res) {
        try {
            const orderID = req.params.id
            const order = await prisma.order.findUnique({ 
                where: { 
                    id: parseInt(orderID) 
                } 
            })

            if (!order) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'Order not found'
                })
            }
            
            res.status(200).json({
                status: 'success',
                data: order
            })
        } catch (error) {
            res.status(400).json({
                status: 'failed',
                message: error.message
            })
        }
    }

    static async updateOrderByID (req, res) {
        try {
            const orderID = req.params.id
            if (!await prisma.order.findUnique({ where: { id: parseInt(orderID) }})) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'Order not found'
                })
            }
            const { name, price, description } = req.body
            const order = await prisma.order.update({ 
                where: { 
                    id: parseInt(orderID) 
                },
                data: {
                    name,
                    price,
                    description
                }
            })
            
            res.status(200).json({
                status: 'success',
                data: order
            })
        } catch (error) {
            res.status(400).json({
                status: 'failed',
                message: error.message
            })
        }
    }

    static async deleteOrderByID (req, res) {
        try {
            const orderID = req.params.id
            if (!await prisma.order.findUnique({ where: { id: parseInt(orderID) }})) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'Order not found'
                })
            }
            const deletedOrder = await prisma.order.delete({
                where: { id: parseInt(orderID) },
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

module.exports = orderController