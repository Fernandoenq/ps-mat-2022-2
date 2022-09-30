const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const Usuario = require('../models/usuario')

const controller = {}       // Objeto vazio

/*
    Métodos do controller:
    create: cria um novo registro
    retrieve: lista todos os registros
    retriveOne: lista apenas um registro
    update: atualiza o registro
    delete: exclui o registro
*/

controller.create = async(req, res) => {
    try {
        if(! req.body.senha) return res.status(500).send({

            //O usuario precisa ter passado um campo chamado senha
            message: 'Um campo "senha" deve ser fornecido'
        })

        //Encripta a senha aberta passada no campo "senha"
        //gerandi o campo "hash senha"
        req.body.hash_senha = await bcrypt.hash(req.body.senha, 12)

        //apaga o campo "senha" para não disparar validação do sequelize
        delete req.body.senha 

        //se o usuário nao for adm o valor do campo admin do usuário que está sendo criado nao pode ser true
        if(! req.infoLogado.admin) {
            req.body.admin = false
        }

        await Usuario.create(req.body)
        // HTTP 201: Created
        res.status(201).end()
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.retrieve = async (req, res) => {
    try {
        

        //se o usuário logado nao for admin, o único registro retornado deve ser o dele mesmo
        let result;
        if(req.infoLogado.admin){
            //retorna todos os usários cadastrados
            result = await Usuario.scope('semSenha').findAll()
        }else{
            //Não-admins só podem ter acesso ao próprio registro
            result = await Usuario.scope('semSenha').findAll({
                where: {id: req.infoLogado.id }
            })
        }


          // HTTP 200: OK (implícito)
          res.send(result)
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.retrieveOne = async (req, res) => {
    try {
        //Usuário não admin só podem ter acesso ao próprio registro
        if(! (red.infoLogado.admin) && req.infoLogado.id != req.params.id){
            //HTTP 403: forbidden
            return res.sendStatus(403).end()
        }

        const result = await Usuario.scope('semSenha').findByPk(req.params.id)

        if(result) {
            // HTTP 200: OK (implícito)
            res.send(result)
        }
        else {
            // HTTP 404: Not found  
            res.status(404).end()
        }
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.update = async (req, res) => {
    //console.log('==============>', req.params.id)
    try {
        //Usuário não admin só podem ter acesso ao próprio registro
        if(! (red.infoLogado.admin) && req.infoLogado.id != req.params.id){
            //HTTP 403: forbidden
            return res.sendStatus(403).end()
        }
        //Se o campo "senha" existir em req.body
        //precisamos gerar a versão criptografada
        // da nova senha
        if(req.body.senha){
            req.body.hash_senha = becrypt.hash(req.body.senha, 12)
            delete req.body.senha
        }
        const response = await Usuario.update(
            req.body, 
            { where: { id: req.params.id } }
        )

        // console.log("======>", {response})

        if(response[0] > 0) {  // Encontrou e atualizou
            // HTTP 204: No content
            res.status(204).end()
        }
        else {  // Não encontrou (e não atualizou)
            res.status(404).end()
        }
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.delete = async (req, res) => {
    try {
        //Usuário não admin só podem ter acesso ao próprio registro
        if(! (red.infoLogado.admin) && req.infoLogado.id != req.params.id){
            //HTTP 403: forbidden
            return res.sendStatus(403).end()
        }
        const response = await Usuario.destroy(
            { where: { id: req.params.id } }
        )

        // console.log("======>", {response})

        if(response) {  // Encontrou e atualizou
            // HTTP 204: No content
            res.status(204).end()
        }
        else {  // Não encontrou (e não atualizou)
            res.status(404).end()
        }
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.login = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ where: { email: req.body.email }})

        if(!usuario) {     // Usuário não existe
            // HTTP 401: Unauthorized
            res.status(401).end()
        }
        else {
            let senhaOk = await bcrypt.compare(req.body.senha, usuario.hash_senha)

            if(senhaOk) {
                // Gera e retorna o token
                const token = jwt.sign(
                    {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    admin: usuario.admin,
                    data_nasc: usuario.data_nasc    
                },
                process.env.TOKEN_SECRET,
                {expiresIn: '8h'}
            )
                // HTTP 200: OK (implícito)
                res.json({ auth: true, token })
            }
            else {  // Senha inválida
                // HTTP 401: Unauthorized
                res.status(401).end()
            }
        }
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

module.exports = controller