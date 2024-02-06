function getDataDateString() {
    const currentDateTime = new Date()
    let hours = currentDateTime.getHours();
    hours = always2TimeDigits(hours);
    let minutes = currentDateTime.getMinutes();
    minutes = always2TimeDigits(minutes);
    ////
    let seconds = currentDateTime.getSeconds(); // seconds will be removed in final release
    seconds = always2TimeDigits(seconds); // same for this
    return `${hours}, ${minutes}, ${seconds}`;
}

function always2TimeDigits(unitToCheck) {
    if (unitToCheck < 10) {
        return '0' + unitToCheck;
    };
    return unitToCheck;
}

function getHour() {
    var hour = new Date;
    return hour.getSeconds() // wordt verandert naar uur
}

function getDay() {
    var day = new Date;
    return day.getMinutes()
}


function checkIfNewHour() {
    if (getHour() != previousHour) {
        previousHour = getHour();
        return true;
    }
    return false;
}

function checkIfNewDay() {
    if (getDay() != previousDay) {
        previousDay = getDay();
        return true;
    }
    return false;
}