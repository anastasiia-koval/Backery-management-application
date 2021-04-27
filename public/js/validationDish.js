const dishName = document.getElementById('dishName');
const dishPrice = document.querySelector('#dishPrice');
const dishDescription = document.querySelector('#dishDescription');
const form = document.getElementById('form');
const inputs = document.querySelectorAll('.inputs');
const errorDishName = document.querySelector('#errorDishName');
const errorDishPrice = document.querySelector('#errorDishPrice');
const errorDishDescription = document.querySelector('#errorDishDescription');
let valid = true;

form.addEventListener('click', () =>{
    dishNameValidation();
    dishPriceValidation();
    // dishDescriptionValidation();
})
form.addEventListener('submit', (e) => {
    e.preventDefault();
    dishNameValidation();
    dishPriceValidation();
    // dishDescriptionValidation();
    // clearForm();
    

})
function checkRequired(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    if (value === "") {
        return false;
    }
    return true;
}


 function checkTextLengthRange(value, min, max) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const length = value.length;
    if (max && length > max) {
        return false;
    }
    if (min && length < min) {
        return false;
    }
    return true;
}

function dishNameValidation(){
    if(!checkRequired(dishName.value)){
        valid = false;
        dishName.classList.add("error-input");
        errorDishName.innerText = "The field is required";
    }else if(!checkTextLengthRange(dishName.value, 2, 50)){
        valid = false;
        dishName.classList.add("error-input");
        errorDishName.innerText = "Please enter the name from 2-60 characters"
    }else{
        valid = true;
        errorDishName.innerText = "";
        dishName.classList.remove("error-input");
    }

}

function dishPriceValidation(){
    if(!checkRequired(dishPrice.value)){
        valid = false;
        dishPrice.classList.add("error-input");
        errorDishPrice.innerText = "The field is required";
    }else{
        errorDishPrice.innerText="";
        dishPrice.classList.remove("error-input");
    }
}

// function dishDescriptionValidation(){
//     if(!checkTextLengthRange(dishDescription.value, 1, 5)){
//         valid = false;
//         dishDescription.classList.add("error-input");
//         errorDishDescription.innerText = "Please enter less than 200 characters";
//     }else{
//         errorDishDescription.innerText = "";
//         dishDescription.classList.remove("error-input");

//     }
// }

function clearForm(){
    if(valid){
        inputs.forEach(input => input.value = '');
    }

}

