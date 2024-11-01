function greet(name) {
    return `Hello ${name}!`;
}
console.log(greet("John"));

const sayHi = function(name) {
    return `Hi ${name}!`;
};
console.log(sayHi("Alice"));

const welcome = (name) => `Welcome ${name}!`;
console.log(welcome("Bob"));

const calculateArea = (length, width) => {
    const area = length * width;
    return `The area is ${area}`;
};
console.log(calculateArea(5, 3));

const greetWithTitle = (name, title = "Mr.") => `Hello ${title} ${name}`;
console.log(greetWithTitle("Smith"));
console.log(greetWithTitle("Jane", "Ms."));

const sumAll = (...numbers) => {
    return numbers.reduce((total, num) => total + num, 0);
};
console.log(sumAll(1, 2, 3, 4, 5));

const printUserInfo = ({ name, age, city }) => {
    console.log(`${name} is ${age} years old and lives in ${city}`);
};
const user = { name: "Mike", age: 25, city: "New York" };
printUserInfo(user);

const getCoordinates = () => [10, 20, 30];
const [x, y, z] = getCoordinates();
console.log(`Coordinates: x=${x}, y=${y}, z=${z}`);

const multiply = (multiplier) => {
    return (number) => number * multiplier;
};
const multiplyByTwo = multiply(2);
console.log(multiplyByTwo(5));

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
const evenNumbers = numbers.filter(num => num % 2 === 0);
const sum = numbers.reduce((acc, curr) => acc + curr, 0);

console.log("Doubled:", doubled);
console.log("Even numbers:", evenNumbers);
console.log("Sum:", sum);

const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30
};
const { firstName: fName, lastName: lName } = person;
console.log(`${fName} ${lName}`);

const fetchData = async () => {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
};


(() => {
    console.log("This runs immediately!");
})();


const processUser = (callback) => {
    const user = {
        id: 1,
        name: "John Doe",
        email: "john@example.com"
    };
    callback(user);
};

processUser(({ name, email }) => {
    console.log(`User ${name} has email ${email}`);
});
