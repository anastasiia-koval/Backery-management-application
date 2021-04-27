const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const orderController = require('../controllers/orderController');

router.get("/", catchAsync(orderController.orderMain));

//СREATING==============================================
router.get("/new", catchAsync(orderController.renderNewForm));

router.post("/",catchAsync(orderController.createOrder));

//DETAILS============================================
router.get("/:id", catchAsync(orderController.showOrder));

//EDITING=============================================
router.get("/:id/edit", catchAsync(orderController.renderEditForm));

router.put("/:id", catchAsync(orderController.editOrder));

//DELETE================================================
router.delete("/:id", catchAsync(orderController.deleteOrder));

router.use((err, req, res) => {
  res.send("Something went wrong");
});
module.exports = router;
