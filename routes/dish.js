const express = require("express");
const router = express.Router();
const dishController = require('../controllers/dishController');
const catchAsync = require("../utilities/catchAsync"); 
const ErrorClass = require("../utilities/ErrorClass");

router.get('/', catchAsync(dishController.dishMain));

//CREATING ===========================================
router.get('/new', catchAsync(dishController.renderNewForm));

router.post('/', catchAsync(dishController.createDish));

//DETAILS ==============================================
router.get('/:id' ,catchAsync(dishController.showDish));

//EDITING ==============================================
router.get('/:id/edit', catchAsync(dishController.renderEditForm));

router.put('/:id', catchAsync(dishController.editDish));

// DELETE =============================================
router.delete('/:id', catchAsync(dishController.deleteDish));

router.all('*', (req, res, next) => {
    next(new ErrorClass('Page not found', 404));
});

router.use((err, req, res, next) => {
    // console.log('err :>> ', err);
    // const{statusCode = 500, message = "Something went wrong"} = err;
    // if(err){
    //     res.status(statusCode).send(message);
    // }
})

module.exports = router;