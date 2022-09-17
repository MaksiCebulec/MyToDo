const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const AppError = require('./utils/AppError');
const catchAsync = require('./utils/catchAsync');
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

app.use(express.urlencoded());
app.use(methodOverride('_method'));


app.get('/mytodo', async (req, res, next) => {
    try {
        const tasks = await Task.find({});
        res.render('index.ejs', { tasks });
    } catch (e) {
        next(e);
    }

});

app.get('/mytodo/new', (req, res) => {
    res.render('new.ejs');
});

app.get('/mytodo/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
        throw new AppError('No task with that ID', 404);
    }
    res.render('show.ejs', { task });

}));

app.get('/mytodo/:id/edit', catchAsync(async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
        throw new AppError('Cant edit, No task with that ID', 404);
    }
    res.render('edit.ejs', { task });

}));

app.put('/mytodo/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, { ...req.body.task });
    res.redirect(`/mytodo/${id}`);

}));

app.delete('/mytodo/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    res.redirect('/mytodo')

}));

app.post('/mytodo', catchAsync(async (req, res) => {
    const newTask = Task({ ...req.body.task });
    await newTask.save();
    res.redirect(`/mytodo/${newTask._id}`);

}));


app.all('*', (req, res, next) => {
    console.log('ERR')
    next(new AppError('Page not found', 404));
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong' } = err;
    res.status(statusCode).send(message);
})









app.listen(3000, () => {
    console.log('Listening on 3000');
})