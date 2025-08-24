import express from 'express'

const app = express()

app.get('/usuarios', (req, res) => {
    res.send('Ok, deu bom')
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})
