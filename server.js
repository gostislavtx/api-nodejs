import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()
app.use(express.json())

// rota POST -> para criar um usuário no banco
app.post('/usuarios', async (req, res) => {
  // aqui eu uso o prisma pra criar um usuário novo com os dados que chegam no corpo da requisição (name, email e age)
  const user = await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age
    }
  })
  // devolve o usuário criado com status 201 (criado)
  res.status(201).json(user)
})

// rota GET -> para listar todos os usuários
app.get('/usuarios', async (req, res) => {
  // aqui eu pego todos os usuários do banco usando o prisma
  const users = await prisma.user.findMany()
  // devolve a lista de usuários em formato JSON
  res.status(200).json(users)
})

// rota PUT -> para atualizar um usuário pelo ID
app.put('/usuarios/:id', async (req, res) => {
  // aqui eu atualizo o usuário pelo id que vem como parâmetro na URL
  // preciso converter o id porque ele vem como string, e o banco espera número
  const user = await prisma.user.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age
    }
  })
  // devolve o usuário atualizado com status 200
  res.status(200).json(user)
})

// rota DELETE -> para apagar um usuário pelo ID
app.delete('/usuarios/:id', async (req, res) => {
  // aqui eu deleto o usuário com base no id passado na URL
  await prisma.user.delete({
    where: {
      id: parseInt(req.params.id)
    }
  })
  // devolve uma mensagem confirmando que foi deletado
  res.status(200).json({ message: "Usuário deletado com sucesso!" })
})

app.listen(3000, () => {
  console.log('🚀 Servidor rodando na porta 3000')
})
