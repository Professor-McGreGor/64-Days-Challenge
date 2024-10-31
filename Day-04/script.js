let age = 20;
if (age >= 18) {
    console.log("You can vote!");
} else {
    console.log("Too young to vote!");
}

let marks = 75;
if (marks >= 90) {
    console.log("Grade A");
} else if (marks >= 80) {
    console.log("Grade B");
} else if (marks >= 70) {
    console.log("Grade C");
} else {
    console.log("Need to study more!");
}

let day = "Monday";
switch(day) {
    case "Monday":
        console.log("Start of week");
        break;
    case "Friday":
        console.log("Weekend coming!");
        break;
    case "Saturday":
        console.log("Party time!");
        break;
    default:
        console.log("Normal day");
}

function sayHello(name) {
    console.log("Hello " + name);
}
sayHello("John");

function addNumbers(num1, num2) {
    return num1 + num2;
}
let result = addNumbers(5, 3);
console.log("Sum is: " + result);

let time = 14;
if (time < 12) {
    console.log("Good morning");
} else if (time < 18) {
    console.log("Good afternoon");
} else {
    console.log("Good night");
}
