const express = require('express');

const app = express();


app.get('/mytodo', (req, res) => {
    res.send('My to do list')
})

app.listen(3000, () => {
    console.log('Listening on 3000');
})