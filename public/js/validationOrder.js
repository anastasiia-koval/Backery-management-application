const form = document.getElementById('form');
const ordererName = document.getElementById('ordererName');
const ordererSurname = document.getElementById('ordererSurname');
const ordererPhoneNumber = document.getElementById('ordererPhoneNumber');
const apartament = document.getElementById('apartament');
const orderingDate = document.getElementById('orderingDate');
const inputs = document.querySelectorAll('.inputs');
const deliveryTime = document.getElementById('deliveryTime');
const errorTime = document.getElementById('errorTime');
const errorOrdererDate = document.getElementById('errorOrdererDate');
const errorAppartament = document.getElementById('errorAppartament');
const ordererAdres = document.getElementById('ordererAdres');
const errorOrdererAdres = document.getElementById('errorOrdererAdres');
const errorOrdererName = document.getElementById('errorOrdererName');
const errorOrdererSurname = document.getElementById('errorOrdererSurname');
const errorOrdererPhone = document.getElementById('errorOrdererPhone');
let valid = true;
form.addEventListener('click', () =>{
    standartValidation(ordererName, errorOrdererName);
    standartValidation(ordererSurname, errorOrdererSurname);
    phoneValidation();
    addressValidation();
    appartamentsValidation();

})

form.addEventListener('submit', (e) =>{
const ordererName = document.getElementById('ordererName');
    e.preventDefault();
    standartValidation(ordererName, errorOrdererName);
    standartValidation(ordererSurname, errorOrdererSurname);
    phoneValidation();
    addressValidation();
    appartamentsValidation();
    dateValidation();
    timeValidation();
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

function standartValidation(inputName, errorName){
    if(!checkRequired(inputName.value)){
        valid=false;
        inputName.classList.add("error-input");
        errorName.innerText = "The field is required";
    }else if(!checkTextLengthRange(inputName.value, 2, 50)){
        valid=false;
        inputName.classList.add("error-input");
        errorName.innerText = "Please enter the name from 2-50 characters";
    }else{
        valid = true;
        errorName.innerText = "";
        inputName.classList.remove("error-input");
    }
}

function phoneValidation(){
    if(!checkTextLengthRange(ordererPhoneNumber.value, 0, 9)){
        valid = false;
        ordererPhoneNumber.classList.add("error-input");
        errorOrdererPhone.innerText = "The max length of number is 9 characters";
    }else{
        valid = true;
        errorOrdererPhone.innerText = "";
        ordererPhoneNumber.classList.remove("error-input");
    }
}

function addressValidation(){
    if(!checkRequired(ordererAdres.value)){
        valid = false;
        ordererAdres.classList.add("error-input");
        errorOrdererAdres.innerText = "The field is required"
    }else{
        valid = true;
        errorOrdererAdres.innerText ="";
        ordererAdres.classList.remove("error-input");
    }
}

function appartamentsValidation(){
    if(!checkRequired(apartament.value)){
        valid = false;
        apartament.classList.add("error-input");
        errorAppartament.innerText = "The field is required";
    }else{
        valid = true;
        errorAppartament.innerText = "";
        apartament.classList.remove("error-input");
    }
}

function dateValidation(){
    if(!checkRequired(orderingDate.value)){
        valid = false;
        orderingDate.classList.add("error-input");
        errorOrdererDate.innerText = "The field is required";
    }else if(!checkDate(orderingDate.value)){
        valid = false;
        orderingDate.classList.add("error-input");
        errorOrdererDate.innerText = "The date is in past";
    }else{
        valid = true;
        orderingDate.classList.remove("error-input");
        errorOrdererDate.innerText = ""
    }
}

function timeValidation(){
    if(!checkRequired(deliveryTime.value)){
        valid = false;
        deliveryTime.classList.add("error-input");
        errorTime.innerText = "The field is required";

    }else if(!checkTime(deliveryTime.value)){
        valid = false;
        deliveryTime.classList.add("error-input");
        errorTime.innerText = "The field is required";
    }else{
        valid = true;
        deliveryTime.classList.remove("error-input");
        errorTime.innerText = "";
    }
}

function clearForm(){
    if(valid){
        inputs.forEach(input => input.value = '');
    }

}


