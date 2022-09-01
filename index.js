// Requerimiento de Modulos
const express = require ('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//req: peticion
//res: respuesta
//res.json: respuesta en formato json

//ruta inicial
app.get('/', ( req, res) => {
    res.json({
        text: 'la api funciona'
    });
});

//ruta para logears
app.post('/api/auth' , (req, res) => {
    
    //objeto use
    const usuario = {
        user: req.body.user,
        password: req.body.password};
    
    if(req.body.user  === reverse(req.body.password)){

        const claim = {
            user_id: 1234,
            name: req.body.user
        }

        const token = jwt.sign({claim}, 'my_secret_key',(err, token) =>{
            //generacion del token
    //sign: recibe el objeto del usuario
    //my_secret_token: le permite al jwt cifrar descifrar el codigo
    //
            res.json({
                token
            });
        });

      
    }


});


app.post('/api/protected',verifyToken, (req, res) =>{
  jwt.verify(req.token, 'my_secret_key',(err, data) => {
    if(err){
        res.sendStatus(403);
    } else {
        res.json({
            text: 'protected',
            data: data
        })
    }
  });
});

//Asegura que el token este creado
function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
       const bearerToken = bearerHeader.split(" ")[1]
       req.token = bearerToken
       next()
    }else{
        res.sendStatus(403)
    }
}

function reverse(s){
    return s.split("").reverse().join("")
}

//inicio de servidor
app.listen(3000, () => {
    console.log('Server iniciado...');
});