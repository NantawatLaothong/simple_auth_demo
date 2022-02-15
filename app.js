const express = require('express');
const app = express();
const User = require('./models/user');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { urlencoded } = require('express');
const session = require('express-session');
const auth = require('./middlewares/auth');
async function connect (){
    mongoose.connect('mongodb://localhost:27017/auth-demo');
}
connect().then(res=>console.log('DB connected'))
    .catch(err=>console.log(err));

app.use(session({secret: 'notagoodsecret' }))
app.use(urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'))

app.get('/', (req, res)=>{
    res.send('This is the homepage');
})

app.get('/register', (req, res)=>{
    res.render('signup')
})

app.post('/register', async (req, res)=>{
    // hashing and salting the password 
    const {password, username} = req.body;
    // creating a user
    const user = new User({
        username: username,
        hashedPassword: password
    });
    console.log(user);
    await user.save();
    req.session.user_id = user._id
    res.redirect('/secret');
})

app.get('/login', async(req, res)=>{
    res.render('login');
})

// username: naruto, sasuke
// password: password, monkey
app.post('/login', async(req, res)=>{
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password);
    if(foundUser){
        // if the user successfully login, we will store the user id in their session
        req.session.user_id = foundUser._id;
        res.redirect('/secret');
    } else {
        res.redirect('/login');
    }
})

// session is stored on the server, user merely have the session id to unlock the data in session.
// logging out 
app.post('/logout', (req, res)=>{
    // clear user_id from session
    req.session.user_id = null;
    // get rid of all the user info from session
    // req.session.destroy();
    res.redirect('/login');
})

app.get('/secret', auth, (req, res)=>{
    // to check if user is logging in using session
    // if(!req.session.user_id){
    //     // res.send("You are authorized to view this page");
    //     return res.redirect('login');
    res.render('secret');
});

app.listen(3000, ()=>{
    console.log(`app running on port 3000`);
})