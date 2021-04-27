const Dish = require('../models/dish');
const ErrorClass = require("../utilities/ErrorClass");
const Order = require("../models/order");
const { dishSchema, orderSchema } = require('../schemas');

module.exports.dishMain = async (req, res)=> {
    const data = await Dish.find({});
    res.render('dishes/dishes', { data, navLocation: 'dishes' } ); 
}

module.exports.renderNewForm = (req, res) => {
    res.render('dishes/addDish', { navLocation: '' , validationErrors: '', dish: ''});
}

module.exports.createDish = async (req,res) => { //изминения на страницк(создание чего-то нового)
    if(!req.body) throw new ErrorClass('Invalid data', 400)
    const { error } = dishSchema.validate(req.body, { abortEarly: false} );
    if(error){
        console.log('error :>> ', error.details);
        res.render('dishes/addDish', {navLocation: '' , validationErrors: error.details, dish: req.body });
    }else{
            const newDish = await new Dish(req.body);
            await newDish.save();
            res.redirect('/dishes');
    }
}

module.exports.showDish = async (req,res) => {
    const { id } = req.params;
    const dish = await Dish.findById(id).populate('orders');
    // console.log(dish);
    res.render('dishes/dishDetails', { dish, navLocation: '' });
}

module.exports.renderEditForm = async (req,res) => {
    const { id } =  req.params;
    const dish = await Dish.findById(id);
    res.render('dishes/editDish', { dish, navLocation: '', validationErrors: ''});
}

module.exports.editDish = async(req,res) => {
    const { id } = req.params;
    const dish = await Dish.findById(id);
    
    const { error } = dishSchema.validate(req.body, {abortEarly: false});
    if(error){
        console.log('error.details :>> ', error.details);
        res.render('dishes/editDish', {dish, navLocation: '', validationErrors: error.details});
    }else{
        const dish = await Dish.findByIdAndUpdate(id, req.body);
        res.redirect(`/dishes/${dish._id}`);
    }
    
 }

 module.exports.deleteDish = async(req,res) => {
    const { id } = req.params;
    const dish = await Dish.findById(id).populate('orders');
    console.log(`deleted ${ id }`);

    for(let order of dish.orders){
        const orderArray = await Order.findOne(order._id);
        let arrayUpdate = orderArray.dishesOrder;
        for(let i=0; i < orderArray.dishesOrder.length; i++){
            if(orderArray.dishesOrder[i].name === dish.name){
                arrayUpdate.splice(i, 1);
                console.log('arrayUpdate :>> ', arrayUpdate);
            }
        }
        await Order.findByIdAndUpdate(order._id, {dishesOrder: arrayUpdate});
        console.log("UPDATED")
    }
    console.log('DELETED');
    await Dish.findByIdAndDelete(id);
    res.redirect('/dishes');
 }
