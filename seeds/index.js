const mongoose = require('mongoose');


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




async function addTasks() {
    await Task.deleteMany({});
    await Task.insertMany([
        {
            title: 'Create plans',
            description: 'Create plans for the weekend, ask friends to join'
        },
        {
            title: 'Start a Youtube channel'
        },
        {
            title: 'Buy a camera',
            description: 'Good cameras: google.com/cameras/product-2/knasfdanfj'
        },
        {
            title: 'Learn to edit',
            description: 'Watch youtube videos on SonyVegas14'
        },
        {
            title: 'Find a job',
            description: 'Apply at least for 5 jobs every day'
        },
        {
            title: 'Buy a car',
            description: ''
        }
    ])

    await mongoose.connection.close();

}

addTasks();





