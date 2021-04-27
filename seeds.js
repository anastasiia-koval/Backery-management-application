const mongoose = require("mongoose");

const Dish = require("./models/dish");
const { init } = require("./models/order");
const Order = require("./models/order");

// mongoose.connect("mongodb://localhost:27017/bakeryDB", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Data base is working");
//   })
//   .catch(() => {
//     console.log("Oh no!!!");
//   });
// function seedData() {
//   initial();
  
// }
const seedDishes = [
  {
    image:
      "https://images.unsplash.com/photo-1602763429669-42755f7ad9fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1005&q=80",
    name: "Cookies",
    price: 2.0,
    description: "White chocolate with butter. Mmmmm, delicious!",
    quantity: 5
  },
  {
    image:
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    name: "Bread",
    price: 3.6,
    description: "White chocolate with butter. Mmmmm, delicious!",
    quantity: 8
  },
  {
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1526&q=80",
    name: "Croissants",
    price: 2.0,
    description: "White chocolate with butter. Mmmmm, delicious!",
    quantity: 12
  },
  {
    image:
      "https://images.unsplash.com/photo-1562007908-17c67e878c88?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
    name: "Apple pie",
    price: 2.6,
    description: "White chocolate with butter. Mmmmm, delicious!",
    quantity: 10
  },
];

const seedOrders = [
  {
    orderingDate: "2020-12-13",
    deliveryTime: "15:00",
    address: "Kasprzaka 31A",
    apartament: 3,
    floor: 4,
    clientName: "Artem",
    clientSurname: "Makushov",
    phoneNumber: "+48733806522",
    discount: "-10%",
    totalPrice: 5.40,
    dishesOrder: []
  },
  {
    orderingDate: "2020-12-14",
    deliveryTime: "12:00",
    address: "Jablonska 5",
    apartament: 10,
    floor: 5,
    clientName: "Andrzej",
    clientSurname: "Kowalski",
    phoneNumber: "+4867839203",
    discount: "No discount",
    totalPrice: null,
    dishesOrder: []
  },
];
const addDishes = async () => {
  const order = await Order.findOne({ clientName: "Artem" });
  const croissants = await Dish.findOne({ name: "Croissants" });
  const cookies = await Dish.findOne({ name: "Cookies" });
  order.dishes.push(croissants);
  order.dishes.push(cookies);
  order.dishesOrder.push(
    {name:'Croissants', quantity: 2},
    {name:'Cookies', quantity: 1}
    );

  await order.save();
};

const addOrders = async () => {
  const dish = await Dish.findOne({ name: "Croissants" });
  const orderArtem = await Order.findOne({ clientName: "Artem" });
  console.log("orderArtem :>> ", orderArtem.dishes);
  dish.orders.push(orderArtem);
  await dish.save();
};

module.exports.seedData = async () => {
  await Dish.insertMany(seedDishes);
  await Order.insertMany(seedOrders);
  await addDishes();
  await addOrders();
  await showDishesAndOrders();
};

const showDishesAndOrders = async () => {
  const dishes = await Dish.find();
  const orders = await Order.find();

  console.log("dishes, orders :>> ", dishes, orders);
};
