const { PrismaClient } = require('@prisma/client')
const { hashPassword } = require('../helpers/bcrypt.helper')
const prisma = new PrismaClient()

async function main() {
    const admin1 = await prisma.user.upsert({
        where: { email: 'arzhed@admin.com' },
        update: {},
        create: {
            email: 'arzhed@admin.com',
            username: 'Arzhed',
            password: hashPassword('admin17'),
            role: "admin",
        },
    })
    console.log({ admin1 })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })