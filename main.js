// Initialisation
const output = document.querySelector(".output");
const topOutput = output.querySelector(".top");
const bottomOutput = output.querySelector(".bottom");
const clear = document.querySelector(`.clear`);
const deleteButton = document.querySelector(`.delete`);
const numbers = document.querySelectorAll(`.number`);
const point = document.querySelector(`.period`);
const operations = document.querySelectorAll(`.operator`);
const equals = document.querySelector(`.equals`);

// Define States & Set Default
const State = {
    "FirstNum": 1,
    "Operation": 2,
    "SecondNum": 3,
    "Result": 4,
}

let state = State.FirstNum;

// Variables for Maths
let first = ``;
let second = ``;
let operator = ``;
let result = ``;

// Event Listeners
numbers.forEach(number => {
    number.addEventListener("click", e => {
        let value = number.getAttribute("data-value")
        // Check state
        switch (state) {
            case State.FirstNum:
                first += value;
                break;
            case State.Operation:
                state = State.SecondNum;
                second += value;
                break;
            case State.SecondNum:
                second += value;
                break;
            // Reset calculator if a calculation has just been worked out
            case State.Result:
                Reset(value);
                break;
        }

        Draw();
    })
})

operations.forEach(operation => {
    operation.addEventListener("click", e => {
        let value = operation.getAttribute("data-value");
        switch (state) {
            case State.FirstNum:
                // Move on to the next state of choosing operation
                state = State.Operation;
                operator = value;
                break;
            case State.Operation:
                // Change chosen operation
                operator = value;
                break;
        }

        Draw();
    })
})

// Add decimal point
point.addEventListener("click", e => {
    switch (state) {
        case State.FirstNum:
            // Check if there is already a point
            if(!first.split(``).includes(`.`) && first != ``)
                first += `.`;
            break;
        case State.SecondNum:
            // Check if there is already a point
            if(!second.split(``).includes(`.`))
                second += `.`
            break;
    }

    Draw();
})

equals.addEventListener("click", e => {
    if (state == State.SecondNum && second != ``) {
        state = State.Result;
        // Check which operation needs completing
        switch (operator) {
            case `+`:
                result = Number(first) + Number(second);
                break;
            case `-`:
                result = Number(first) - Number(second);
                break;
            case `*`:
                result = Number(first) * Number(second);
                break;
            case `/`:
                result = Number(first) / Number(second);
                break;
        }
    }

    Draw();
})

// Clears the calculator
clear.addEventListener(`click`, e => {
    Reset();
    Draw();
})

// Removes most recent action
deleteButton.addEventListener(`click`, e => {
    switch (state) {
        case State.FirstNum:
            let splitFirstNum = first.split(``);
            splitFirstNum.pop();
            first = splitFirstNum.join(``);
            break;
        case State.SecondNum:
            let splitSecondNum = second.split(``);
            splitSecondNum.pop();
            second = splitSecondNum.join(``);
            break;
        case State.Result:
            Reset();
    }

    Draw();
})

// Functions
// FUNCTION Draw: sets the value of the output section
function Draw() {
    switch (state) {
        case State.FirstNum:
            topOutput.textContent = first;
            bottomOutput.textContent = first;
            break;
        case State.Operation:
            topOutput.textContent = `${first} ${operator}`;
            bottomOutput.textContent = operator;
            break;
        case State.SecondNum:
            topOutput.textContent = `${first} ${operator} ${second}`;
            bottomOutput.textContent = second;
            break;
        case State.Result:
            topOutput.textContent = `${first} ${operator} ${second}`;
            bottomOutput.textContent = result;
    }
}

// FUNCTION Reset: Resets the calculator and relevant variables
function Reset(value) {
    if (value)
        first = value;
    else
        first = ``;
    operator = ``;
    second = ``;
    state = State.FirstNum;
}