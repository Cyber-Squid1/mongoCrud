const http = require('http');
const express = require('express');
const { mongoConnect } = require('./mongo');
const { Router } = require('express');
const login = require('./model.js');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.set('view engine', 'ejs')

const myRouter = Router()

app.use(myRouter.get('/', (req, res) => {
    return res.render('index');
}))
app.use(myRouter.post('/register', async (req, res) => {
    const user = new login({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    await user.save()
        .then((result) => {
            console.log(result)
            res.json({
                message: 'User added successfully',
            })
        })
}))


app.use(myRouter.get('/allUsers', async (req, res) => {
    await login.find({}).then((result) => {
        res.render('allusers', { user: result })
    })
}))

app.use(myRouter.get('/delete/:id', async (req, res) => {
    await login.findByIdAndDelete(req.params.id)
    res.redirect('/allUsers')
}))

const server = http.createServer(app)
async function startServer() {
    await mongoConnect();
    server.listen(8000, () => {
        console.log("Server ready")
    });
}

startServer();
