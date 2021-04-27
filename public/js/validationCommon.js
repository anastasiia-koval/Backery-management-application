
export function checkRequired(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    if (value === "") {
        return false;
    }
    return true;
}

export function checkTextLengthRange(value, min, max) {
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

export function checkEmail(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regex.test(value);
}

export function checkDate(value){
    if (!value) {
        return false;
    }
    const valueDate = new Date(value);
    const now = new Date();
    if(now > valueDate){
        console.log("The date in the past");
        return false;
    }
    console.log("True");
    return true;
    
}

export function checkTime(value){
    if(!value){
        return false;
    }
    console.log('value :>> ', value);
    // const valueDate = new Date(value);
    
    const now = new Date();
    console.log('now.getMinutes() :>> ', now.getMinutes());
    console.log(`${valueDate.getTime()} ${now.getTime()}`)
    console.log(`${valueDate.valueOf()} ${now.getTime()}`)
    if(now.getHours() > valueDate.getHours() ){
        console.log("The time is in past");
        return false;
    }
    return true;
}

