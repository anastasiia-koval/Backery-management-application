const express = require("express");
const app = express();
const path = require('path');
const seedDb = require('./seeds');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3000;

//Routes==========================
const dishesRoutes = require('./routes/dish');
const ordersRoutes = require('./routes/order');
//

//DataBase========================
const mongoose = require('mongoose');
const { runInNewContext } = require("vm");
const { array } = require("joi");

mongoose.connect('mongodb://localhost:27017/bakeryDB', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Data base is working");
}).catch(() => {
    console.log("Oh no!!!")
})

const connection = mongoose.connection;
connection.once("open", function() {
    connection.dropDatabase();
    seedDb.seedData();

})



app.set('views', path.join(__dirname, 'views')); //connect to the ejs library
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.use(express.static('public')); //connect folder public


app.use('/dishes', dishesRoutes);

app.use('/orders', ordersRoutes);

app.get('/homePage', async(req,res) => {
    res.render('mainPage/main', { navLocation: 'main' } ); 
})



app.listen(PORT, () => {
    console.log("Listening on port 3000")
})