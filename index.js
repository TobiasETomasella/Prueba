
const express = require('express'); //iniciar servidor
const app = express(); // iniciar servidor
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.listen(3000, () =>{ // iniciar servidor
    console.log('servidor iniciado...');
})

app.get('/login', (req, res) => {
    res.send(
        `<html>
        <head>
            <tittle>Login</tittle>
        </head>
        <body>
            <form method="POST"action="/api/auth">
                Nombre de usuario: <input type ="user" name="user"><br/>
                Contraseña: <input type = "password" name ="password"></br>
                <input type="submit" value="Iniciar sesión" />
            </form>
        </body>
    </html>`   
    )

app.post('/api/auth', (req, res) =>{

    const usuario ={
        user:req.body.user,
        password: req.body.password
    }
    jwt.sign({usuario: usuario}, 'secretKey',(err, token) =>{
        res.json({
            token: token
        })
    })
}
)
});

/*function validateToken(req, res, next){

    const accessToken = req.headers['Authorization'];

    if(!accessToken) res.send('Acceso Denegado');

    jwt.verify(accessToken, process.env.SECRET, (err, user) =>{
        if(err){
            res.send('Acceso Denegado, token expirado o incorrecto' );
        }else{
            req.user = user;
            next();
        }
    });
   

}*/

