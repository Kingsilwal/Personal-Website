const express = require('express');

const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');
mongoose.connect(keys.MongoURI)
.then(() => {
console.log('Remote MongoDB is connected...');
});
const app = express();
// setup template engine
app.engine('handlebars', exphbs({
    defaultlayout: 'main'
}));

app.set('view engine', 'handlebars');
//setup express static public folder for css and js and images

app.use('/',express.static('public'));
//setup body parser to encode URL
app.use(bodyParser.urlencoded({
    extented: false
}));
app.use(bodyParser.json());
//create collectionnwith mongoose
const Schema = mongoose.Schema;
const Message = mongoose.model('message',new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    message: {
        type: String
    },
    date:{
        type:Date,
        default:Date.now
    }

}));
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
app.post('/getMessage', (req,res) => {
    const newMessage ={
        name: req.body.name,
        email:req.body.email,
        message:req.body.message
    }
    new Message(newMessage).save()
    .then(() => {
      res.render('inbox');
    });
});

app.get('/displayMessage',(req,res) =>{
   Message.find({}, (err,messages) => {
    if(err){
        console.log(err);
    }else{
        res.render('displayMessage' , {
            messages:messages
        })
    }
})
})
//This is portfolio route handler
app.get('/portfolio',(req, res) => {
    res.render('portfolio');
});

app.listen(3000,() => {
    console.log("The server is running");
});
