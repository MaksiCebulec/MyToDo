const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();


mongoose.connect('mongodb://localhost:27017/my-todo')
    .then(() => {
        console.log('Success');
    })
    .catch((err) => {
        console.log('Error');
        console.log(err);
    })


const TasksSchema = new mongoose.Schema({
    title: String,
    description: String
});

const Task = mongoose.model('Task', TasksSchema);

app.set('view engine', 'views');
app.set('views', path.join(__dirname, 'views'));


app.get('/mytodo', async (req, res) => {
    const tasks = await Task.find({});
    res.render('index.ejs', { tasks });
})

app.listen(3000, () => {
    console.log('Listening on 3000');
})