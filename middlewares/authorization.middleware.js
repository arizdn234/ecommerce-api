const { PrismaClient } = require("@prisma/client");
const { verifyToken } = require("../helpers/jwt.helper")
const User = new PrismaClient().user

class Authorization {
    static async authorizationCustomer(req, res, next) {
        try {
            const accessToken = req.headers["access-token"]
            if (!accessToken) {
                throw { status: 401, message: 'Authorization failed' }
            }
            
            const decoded = verifyToken(accessToken)
            if (decoded.role !== 'customer') {
                throw { status: 401, message: 'Authorization failed' }
            }

            const user = await User.findUnique({ where: { email: decoded.email } })
            if (!user) {
                throw { status: 401, message: 'Authorization failed'}
            }
    
            req.loggedIn = user
            next()
        } catch (error) {
            res.status(error.status || 500).json({
                status: 'failed',
                message: error.message
            })
        }
    }

    static async authorizationAdmin(req, res, next) {
        try {
            const accessToken = req.headers["access-token"]
            if (!accessToken) {
                throw { status: 401, message: 'Authorization failed' }
            }
            
            const decoded = verifyToken(accessToken)
            if (decoded.role !== 'admin') {
                throw { status: 401, message: 'Authorization failed' }
            }

            const user = await User.findUnique({ where: { email: decoded.email } })
            if (!user) {
                throw { status: 401, message: 'Authorization failed'}
            }
    
            req.loggedIn = user
            next()
        } catch (error) {
            res.status(error.status || 500).json({
                status: 'failed',
                message: error.message
            })
        }
    }
}

module.exports = Authorization