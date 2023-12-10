const { PrismaClient } = require("@prisma/client")
const { use } = require("../routes/index.route")
const prisma = new PrismaClient()

class userController {
    static async getAllUser (req, res) {
        try {
            const users = await prisma.user.findMany()
            res.status(200).json({
                status: 'success',
                data: users
            })
        } catch (error) {
            res.status(400).json({
                status: 'failed',
                message: error.message
            })
        }
    }
    
    static async createUser (req, res) {
        try {
            const { username, email, password } = req.body
            const user = await prisma.user.create({ 
                data: {
                    username,
                    email,
                    password 
                }
            }) 
            res.status(201).json({
                status: 'success',
                data: user
            })
        } catch (error) {
            res.status(400).json({
                status: 'failed',
                message: error.message
            })
        }
    }

    static async getUserByID (req, res) {
        try {
            const userID = req.params.id
            const user = await prisma.user.findUnique({ 
                where: { 
                    id: parseInt(userID) 
                } 
            })

            if (!user) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'User not found'
                })
            }
            
            res.status(200).json({
                status: 'success',
                data: user
            })
        } catch (error) {
            res.status(400).json({
                status: 'failed',
                message: error.message
            })
        }
    }

    static async updateUserByID (req, res) {
        try {
            const userID = req.params.id
            if (!await prisma.user.findUnique({ where: { id: parseInt(userID) }})) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'User not found'
                })
            }
            const { username, email, password } = req.body
            const user = await prisma.user.update({ 
                where: { 
                    id: parseInt(userID) 
                },
                data: {
                    username,
                    email,
                    password
                }
            })
            
            res.status(200).json({
                status: 'success',
                data: user
            })
        } catch (error) {
            res.status(400).json({
                status: 'failed',
                message: error.message
            })
        }
    }

    static async deleteUserByID (req, res) {
        try {
            const userID = req.params.id
            if (!await prisma.user.findUnique({ where: { id: parseInt(userID) }})) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'User not found'
                })
            }
            const deletedUser = await prisma.user.delete({
                where: { id: parseInt(userID) },
            })

            res.status(200).json({
                status: 'success',
                message: 'Successfully deleted',
                data: deletedUser
            })
        } catch (error) {
            res.status(400).json({
                status: 'failed',
                message: error.message
            })
        }
    }
}

module.exports = userController