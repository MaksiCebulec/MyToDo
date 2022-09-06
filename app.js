const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'views');
app.set('views', path.join(__dirname, 'views'));


app.get('/mytodo', (req, res) => {
    res.render('index.ejs');
})

app.listen(3000, () => {
    console.log('Listening on 3000');
})