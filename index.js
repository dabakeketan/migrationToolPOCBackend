const express = require('express');
const sequelize = require('./database');
const User = require('./User');

sequelize.sync().then(() => console.log('db is ready'));

const app = express();

app.use(express.json());

app.post('/users', async (req, res) => {
    await User.create(req.body)
    res.send('User is inserted');
})

app.get('/users', async (req, res) => {
    const users = await User.findAll()
    res.send(users);
})

app.get('/users/:id', async (req, res) => {
    const requestedId = req.params.id;
    const user = await User.findOne({ where: {id : requestedId}})
    res.send(user);
})

app.put('/users/:id', async (req, res) => {
    const requestedId = req.params.id;
    const user = await User.findOne({ where: {id : requestedId}})
    await user.update(req.body);
    res.send('Updated');
})

app.delete('/users/:id', async (req, res) => {
    const requestedId = req.params.id;
    await User.destroy({ where: {id : requestedId}});
    res.send('Remoced');
})

app.delete('/usersDeleteAll', async (req, res) => {
    await User.destroy({
        truncate: true
    });
    res.send('Remoced all');
})

const port = 3000; 
app.listen(port, () => {
    console.log('app is running on port: ' + port);
})