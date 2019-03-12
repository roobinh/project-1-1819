const express = require('express')
const app = express()
const port = 4000

//http://localhost:4000/
app.get('/', function (req, res) {
    res.send('Hallo Wereld!');
})

//http://localhost:4000/home
app.get('/home', function (req, res) {
    res.send('Dit is de homepage');
})

//http://localhost:4000/users/654
app.get('/users/:userID', function (req, res) {
    res.send(req.params);
})

app.use(express.static('public'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))