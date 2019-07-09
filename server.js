const express = require('express');

const exphbs = require('express-handlebars');

const app = express();
// setup template engine
app.engine('handlebars', exphbs({
    defaultlayout: 'main'
}));

app.set('view engine', 'handlebars');
//setup express static public folder for css and js and images
app.use(express.static('public'));
const port = process.env.PORT || 3000;

app.get('/home',(req, res) => {
    res.render('home');
});

app.get('/about',(req, res) => {
    res.render('about');
});

app.get('/contact',(req, res) => {
    res.render('contact');
});
//This is portfolio route handler
app.get('/portfolio',(req, res) => {
    res.render('portfolio');
});

app.listen(port, () => {
    console.log('Server is running on port ${port}');
});
