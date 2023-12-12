const { PrismaClient } = require("@prisma/client")
const Product = new PrismaClient().product

class productController {
    static async getAllProducts (req, res) {
        try {
            const products = await Product.findMany()
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
            const product = await Product.create({ 
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
            const product = await Product.findUnique({ 
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
            if (!await Product.findUnique({ where: { id: parseInt(productID) }})) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'Product not found'
                })
            }
            const { name, price, description } = req.body
            const product = await Product.update({ 
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
            if (!await Product.findUnique({ where: { id: parseInt(productID) }})) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'Product not found'
                })
            }
            const deletedProduct = await Product.delete({
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