function sum(number1, number2){
    return number1 + number2;
}

function soustract(number1, number2){
    return number1 - number2;
}

function multiply(number1, number2){
    return number1 * number2;
}

function divide(number1, number2){
    return number1 / number2;
}

function average(numbers) {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        throw new Error("Le tableau doit contenir au moins un nombre");
    }

    const sum = numbers.reduce((acc, n) => acc + n, 0);
    return sum / numbers.length;
}

module.exports = {
    sum,
    soustract,
    multiply,
    divide,
    average
};
