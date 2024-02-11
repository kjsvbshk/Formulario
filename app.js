const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.urlencoded({ extended: true }))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/login', (req, res) => {
    const {username, password} = req.body
    fs.readFile('val.txt','utf-8', (err,data)=>{
        if(err){
            console.log("Mano no lo pude leer", err)
            return res.status(500).send('Servidor tuqui')
        }
        const lines = data.split('\n') 

        const userFound = lines.some(line =>{
            const[storedUser,storedPassword]=line.split(':')
            return storedUser === username && storedPassword === password
        })
        if(userFound){
            res.redirect('/found.html?user=${username}')
        }else{
            res.redirect('/no-found.html')
        }
    })
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
