const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

class productController {
    static async getAllProducts (req, res) {
        try {
            const products = await prisma.product.findMany()
            res.status(200).json({
                status: 'success',
                data: products
            })
        } catch (error) {
            res.status(400).json({
                status: 'failed',
                message: error.message
            })
        }
    }
    
    static async createProduct (req, res) {
        try {
            const { name, price, description } = req.body
            const product = await prisma.product.create({ 
                data: {
                    name,
                    price,
                    description 
                }
            }) 
            res.status(201).json({
                status: 'success',
                data: product
            })
        } catch (error) {
            res.status(400).json({
                status: 'failed',
                message: error.message
            })
        }
    }

    static async getProductByID (req, res) {
        try {
            const productID = req.params.id
            const product = await prisma.product.findUnique({ 
                where: { 
                    id: parseInt(productID) 
                } 
            })

            if (!product) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'Product not found'
                })
            }
            
            res.status(200).json({
                status: 'success',
                data: product
            })
        } catch (error) {
            res.status(400).json({
                status: 'failed',
                message: error.message
            })
        }
    }

    static async updateProductByID (req, res) {
        try {
            const productID = req.params.id
            if (!await prisma.product.findUnique({ where: { id: parseInt(productID) }})) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'Product not found'
                })
            }
            const { name, price, description } = req.body
            const product = await prisma.product.update({ 
                where: { 
                    id: parseInt(productID) 
                },
                data: {
                    name,
                    price,
                    description
                }
            })
            
            res.status(200).json({
                status: 'success',
                data: product
            })
        } catch (error) {
            res.status(400).json({
                status: 'failed',
                message: error.message
            })
        }
    }

    static async deleteProductByID (req, res) {
        try {
            const productID = req.params.id
            if (!await prisma.product.findUnique({ where: { id: parseInt(productID) }})) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'Product not found'
                })
            }
            const deletedProduct = await prisma.product.delete({
                where: { id: parseInt(productID) },
            })

            res.status(200).json({
                status: 'success',
                message: 'Successfully deleted',
                data: deletedProduct
            })
        } catch (error) {
            res.status(400).json({
                status: 'failed',
                message: error.message
            })
        }
    }
}

module.exports = productController