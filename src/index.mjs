import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const port = 3000
const app = fastify()

app.get('/feed', async (req, res) => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  })
  res.json(posts)
})

app.post('/post', async (req, res) => {
  const { title, content, authorEmail } = req.body
  const post = await prisma.post.create({
    data: {
      title,
      content,
      published: false,
      author: { connect: { email: authorEmail } },
    },
  })
  res.json(post)
})

app.put('/publish/:id', async (req, res) => {
  const { id } = req.params
  const post = await prisma.post.update({
    where: { id },
    data: { published: true },
  })
  res.json(post)
})

app.delete('/user/:id', async (req, res) => {
  const { id } = req.params
  const user = await prisma.user.delete({
    where: {
      id,
    },
  })
  res.json(user)
})

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`)
})