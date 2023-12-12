const { PrismaClient } = require("@prisma/client")
const { hashPassword, comparePassword } = require("../helpers/bcrypt.helper")
const { signToken } = require("../helpers/jwt.helper")
const User = new PrismaClient().user

class userController {
    static async register (req, res) {
        try {
            const payload = {
                email: req.body.email,
                password: hashPassword(req.body.password),
                role: 'customer'
            }

            const user = await User.create({ data: payload })

            res.status(201).json({
                status: 'success',
                data: {
                    email: user.email,
                    role: user.role
                }
            })
        } catch (error) {
            res.status(400).json({
                status: 'failed',
                message: error.message
            })            
        }
    }

    static async login (req, res) {
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password,
            }

            const user = await User.findUnique({
                where: { email: payload.email }
            })

            const comparedPassword = comparePassword(payload.password, user.password);

            if (!user || !comparedPassword) {
                res.status(400).json({
                    status: 'failed',
                    message: 'Wrong email or password'
                })
            }

            const accessToken = signToken({
                id: user.id,
                email: user.email,
                role: user.role
            });

            res.status(200).json({
                status: 'success',
                data: {
                    access_token: accessToken
                }
            })
        } catch (error) {
            res.status(400).json({
                status: 'failed',
                message: error.message
            })            
        }
    }

    static async getAllUser (req, res) {
        try {
            const users = await User.findMany()
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
            const payload = {
                email: req.body.email,
                password: hashPassword(req.body.password),
                role: 'customer'
            }
            const user = await User.create({ data: payload }) 
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
            const user = await User.findUnique({ 
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
            if (!await User.findUnique({ where: { id: parseInt(userID) }})) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'User not found'
                })
            }
            const payload = {
                username: req.body.username,
                email: req.body.email,
                password: hashPassword(req.body.password)
            }
            const user = await User.update({ 
                where: { 
                    id: parseInt(userID) 
                },
                data: payload
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
            if (!await User.findUnique({ where: { id: parseInt(userID) }})) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'User not found'
                })
            }
            const deletedUser = await User.delete({
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