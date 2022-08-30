
const express = require('express'); //iniciar servidor
const app = express(); // iniciar servidor
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/login', (req, res) => {
    res.send(`<html>
        <head>
            <tittle>Login</tittle>
        </head>
        <body>
            <form method="POST"action="/auth">
                Nombre de usuario: <input type ="test" name="text"><br/>
                Contraseña: <input type = "password" name ="password"></br>
                <input type="submit" value="Iniciar sesión" />
            </form>
        </body>
    </html>`
        
    )

app.post('/auth', (req, res) =>{
    const {username, password} = req.body;

    //se deberia consultar a la base de datos y validar que existen
    //tanto username como password
    const user = {username: username};

    const accessToken = generateAccessToken(user);

    res.header('authorization', accessToken).json({
        message: 'Usuario autenticado',
        token: accessToken

    });
}
)
});
app.get('/api', validateToken, (req, res) => {
    
    res.json({
        username: req.user,
        tuits: [
            {
                id: 0,
                text: 'Este es mi primer tuit',
                username: 'vidamrr'
            },
            {

                id: 0,
                text: 'El mejor lenguaje es HTML',
                username: 'patito_feliz'
            }
        ]
    });
});

app.listen(3000, () =>{ // iniciar servidor
    console.log('servidor iniciado...');
})

function generateAccessToken(user){
    return jwt.sign(user, process.env.SECRET, {expiresIn: '1m'});
}

function validateToken(req, res, next){

    const accessToken = req.headers['autorizacion'] || req.query.accesstoken;
    if(!accessToken) res.send('Acceso Denegado');

    jwt.verify(accessToken, process.env.SECRET, (err, user) =>{
        if(err){
            res.send('Acceso Denegado, token expirado o incorrecto' );
        }else{
            req.user = user;
            next();
        }
    });
   

}

