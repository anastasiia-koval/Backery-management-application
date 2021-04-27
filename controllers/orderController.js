const Dish = require('../models/dish');
const Order = require("../models/order");
const { orderSchema } = require("../schemas");

module.exports.orderMain = async (req, res) => {
    const data = await Order.find({});
    res.render("orders/orders", { data, navLocation: "order" });
  }

module.exports.renderNewForm = async (req, res) => {
    const data = await Dish.find().populate("dishes");
    res.render("orders/addOrder", {
      data,
      navLocation: "",
      validationErrors: "",
      order: req.body,
      errorQuantity: ""
    });
  }  

module.exports.createOrder = async (req, res) => {
    console.log("req.body :>> ", req.body);
    const newOrder = new Order(req.body);
    let count = 0;
    let totalPrice = 0;
    let errorQuantity = "";
    const data = await Dish.find().populate("dishes");

    const { error } = orderSchema.validate(req.body, { abortEarly: false });
    if (error) 
    {
      console.log("error :>> ", error.details);
      res.render("orders/addOrder", {data,navLocation: "",validationErrors: error.details,order: req.body,errorQuantity: ""});
    } else 
    {
      for (let i = 0, j = 0;i < req.body.busketName.length, j < req.body.busket.length;i++, j++) 
      {
        if (req.body.busket[j] !== "") 
        {
          newOrder.dishesOrder.push({name: req.body.busketName[i],quantity: req.body.busket[j],});
          newOrder.dishes.push(
            await Dish.findOne({ name: req.body.busketName[i] })
          );

          const newDish = await Dish.findOne({name: req.body.busketName[i],}).populate("orders");

          if (newDish.quantity === 0 || newDish.quantity - req.body.busket[j] < 0 || req.body.busket[j] > newDish.quantity)
          {
            errorQuantity = "Sorry, is not enough dishes in the store";
          }
          //Adding new dish quantity in the store=================================
          const newQuantity = newDish.quantity - req.body.busket[j];
          await Dish.findOneAndUpdate({ name: req.body.busketName[i] },{ quantity: newQuantity });

          //Count total price of order==============================
          totalPrice += req.body.busket[j] * newDish.price;
          
          console.log("totalPrice :>> ", totalPrice);

          console.log("newOrder :>> ", newOrder);

          newDish.orders.push(newOrder);
          await newDish.save();
          //Count amount of ordered dishes========================
          for (let dishQuant of newOrder.dishesOrder) 
          {
            count += dishQuant.quantity;
          }
        }
      }
      if (count === 0) {
        errorQuantity = "Choose at least 1 dish";
      }
      if (errorQuantity !== "") {
        console.log("errorQuantity :>> ", errorQuantity);
        res.render("orders/addOrder", {
          data,
          navLocation: "",
          validationErrors: "",
          order: req.body,
          errorQuantity: errorQuantity,
        });
      } else {
        if (count >= 2) {
          const disc = "-10%";
          const priceDiscount = totalPrice - (totalPrice*10/100);
          newOrder.totalPrice = priceDiscount;
          newOrder.discount = disc;
        } else {
          const discoun = "No discount";
          newOrder.totalPrice = totalPrice;
          newOrder.discount = discoun;
        }

        await newOrder.save();
        res.redirect("/orders");
      }
    }
  }

 module.exports.showOrder = async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id).populate("dishes");
    // console.log('order :>> ', order);
    let count = 0;
    for (let dish of order.dishesOrder) {
      count += dish.quantity;
    }
    console.log("count :>> ", count);
    if (count >= 2) {
      const disc = "-10%";

      order.discount = disc;
    } else {
      const discoun = "No discount";
      order.discount = discoun;
    }
  
    // console.log(order);
    res.render("orders/orderDetail", { order, navLocation: "" });
  }

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id).populate("dishes");
    console.log('req.body :>> ', req.body);
    res.render("orders/editOrder", {
      order,
      navLocation: "",
      validationErrors: "",
      errorQuantity: "",
    });
} 

module.exports.editOrder = async (req, res) => {
    const { id } = req.params;
    const { error } = orderSchema.validate(req.body, { abortEarly: false });
    const order = await Order.findById(id).populate("dishes");
  
    const updatedOrder = {
      orderingDate: req.body.orderingDate,
      deliveryTime: req.body.deliveryTime,
      address: req.body.address,
      apartament: req.body.apartament,
      floor: req.body.floor,
      clientName: req.body.clientName,
      clientSurname: req.body.clientSurname,
      phoneNumber: req.body.phoneNumber,
      discount: "",
      totalPrice: null,
      dishesOrder: [],
    };
    let count = 0;
    let totalPrice = 0;
    let errorQuantity = "";
    const previousOrder = await Order.findById(id);
  
    if (error) 
    {
      res.render("orders/editOrder", {order, navLocation: "",validationErrors: error.details, errorQuantity: ""});
    } else
    {
      if (Array.isArray(req.body.busketName) && Array.isArray(req.body.busket)) 
      {
        //for array=========================
        for (let i = 0; i < req.body.busket.length; i++)
        {
          const dish = await Dish.findOne({name: req.body.busketName[i]}).populate("dishes");
          const dishObject = {
            name: req.body.busketName[i],
            quantity: req.body.busket[i],
          };
          updatedOrder.dishesOrder.push(dishObject);
  
          //Count how many dishes are in the store after modifying=====================================
          if (req.body.busket[i] === 0 || dish.quantity - req.body.busket[i] < 0 || req.body.busket[i] > dish.quantity)
          {
            errorQuantity = "Sorry, is not enough dishes in the store";
          } 
          else if (previousOrder.dishesOrder[i].quantity < req.body.busket[i]) 
          {
            const calcQuantity = dish.quantity - (req.body.busket[i] - previousOrder.dishesOrder[i].quantity);
            await Dish.findOneAndUpdate(
              { name: req.body.busketName[i] },
              { quantity: calcQuantity }
            );
          } 
          else if (previousOrder.dishesOrder[i].quantity === req.body.busket[i]) 
          {
            await Dish.findOneAndUpdate({ name: req.body.busketName[i] },{ quantity: dish.quantity });
          } 
          else if (previousOrder.dishesOrder[i].quantity > req.body.busket[i]) 
          {
            const calcQuantity = dish.quantity + (previousOrder.dishesOrder[i].quantity - req.body.busket[i]);
            await Dish.findOneAndUpdate({ name: req.body.busketName[i] }, { quantity: calcQuantity });
          }
          count += req.body.busket[i];
          totalPrice += req.body.busket[i] * dish.price;
         
          
          
        }
      } else 
      {
        //for single dish==============================================
        const dishObject = {name: req.body.busketName, quantity: req.body.busket};
        updatedOrder.dishesOrder.push(dishObject);
  
        const dish = await Dish.findOne({ name: req.body.busketName }).populate("dishes");
        if (req.body.busket === 0 || dish.quantity - req.body.busket < 0 || req.body.busket > dish.quantity)
        {
          errorQuantity = "Sorry, is not enough dishes in the store";
        } 
        else if (previousOrder.dishesOrder[0].quantity < req.body.busket) 
        {
          const calcQuantity = dish.quantity - (req.body.busket - previousOrder.dishesOrder[0].quantity);
          count += req.body.busket;
          await Dish.findOneAndUpdate({ name: req.body.busketName }, { quantity: calcQuantity });
        } else if (previousOrder.dishesOrder[0].quantity === req.body.busket) 
        {
          await Dish.findOneAndUpdate({ name: req.body.busketName },{ quantity: dish.quantity });
        } else if (previousOrder.dishesOrder[0].quantity > req.body.busket) 
        {
          const calcQuantity = dish.quantity + (previousOrder.dishesOrder[0].quantity - req.body.busket);
          count += req.body.busket;
          await Dish.findOneAndUpdate({ name: req.body.busketName },{ quantity: calcQuantity });
        }
        count = req.body.busket;
        totalPrice = req.body.busket * dish.price;
 
      }
      //Countitng discount========================================
      if (errorQuantity !== "") {
        console.log("errorQuantity :>> ", errorQuantity);
        console.log('req.body :>> ', req.body);
        console.log('updatedOrder :>> ', updatedOrder);
        res.render("orders/editOrder", {
          order,
          navLocation: "",
          validationErrors: "",
          errorQuantity: errorQuantity,
        });
      } else 
      {
        if (count >= 2) {
          const disc = "-10%";
          const priceDiscount = totalPrice - (totalPrice*10/100);
          updatedOrder.totalPrice = priceDiscount;
          console.log('priceDiscount :>> ', priceDiscount);
          updatedOrder.discount = disc;
        } else {
          const discoun = "No discount";
          updatedOrder.totalPrice = totalPrice;
          updatedOrder.discount = discoun;
        }
  
        const orderData = await Order.findByIdAndUpdate(id, updatedOrder);
        res.redirect(`/orders/${orderData._id}`);
      }
    }
      
  }

  module.exports.deleteOrder = async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id);
  
    if (Array.isArray(order.dishesOrder)) {
      for (let i = 0; i < order.dishesOrder.length; i++) {
        const dish = await Dish.findOne({ name: order.dishesOrder[i].name });
        const quantityBack = dish.quantity + order.dishesOrder[i].quantity;
        console.log("quantityBack :>> ", quantityBack);
        await Dish.findOneAndUpdate(
          { name: order.dishesOrder[i].name },
          { quantity: quantityBack }
        );
      }
    } else if(order.dishesOrder.length === 1){
      const dish = await Dish.findOne({ name: order.dishesOrder[0].name });
      const quantityBack = dish.quantity + order.dishesOrder[0].quantity;
      await Dish.findOneAndUpdate(
        { name: order.dishesOrder[0].name },
        { quantity: quantityBack }
      );
    } 
  
    await Order.findByIdAndDelete(id);
    console.log(`deleted ${id}`);
    res.redirect("/orders");
  }


