const express = require('express')
const router = express.Router()
const controller = require('../controllers/aluno')

router.post('/', controller.create)
router.get('/', controller.retrieve)
router.get('/:id', controller.retrieve)
router.put('/', controller.up)

// :id é uma parte variável da URI que será interpretado
// como um parâmetro chamado id

module.exports = router