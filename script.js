// main.js

const conversionTypeSelect = document.getElementById('conversion-type');
const fromUnitSelect = document.getElementById('from-unit');
const toUnitSelect = document.getElementById('to-unit');
const convertButton = document.getElementById('convert-button');
const resultDiv = document.getElementById('result');

const units = {
    length: ['meters', 'kilometers', 'centimeters', 'millimeters', 'miles', 'yards', 'feet', 'inches'],
    weight: ['kilograms', 'grams', 'milligrams', 'pounds', 'ounces'],
    temperature: ['Celsius', 'Fahrenheit', 'Kelvin']
};

function populateUnits(type) {
    fromUnitSelect.innerHTML = '';
    toUnitSelect.innerHTML = '';
    units[type].forEach(unit => {
        const option1 = document.createElement('option');
        option1.value = unit;
        option1.textContent = unit;
        fromUnitSelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = unit;
        option2.textContent = unit;
        toUnitSelect.appendChild(option2);
    });
}

function convert(value, fromUnit, toUnit, type) {
    if (type === 'length') {
        // Length conversion logic
        const lengthConversions = {
            meters: 1,
            kilometers: 0.001,
            centimeters: 100,
            millimeters: 1000,
            miles: 0.000621371,
            yards: 1.09361,
            feet: 3.28084,
            inches: 39.3701
        };
        return value * (lengthConversions[toUnit] / lengthConversions[fromUnit]);
    } else if (type === 'weight') {
        // Weight conversion logic
        const weightConversions = {
            kilograms: 1,
            grams: 1000,
            milligrams: 1000000,
            pounds: 2.20462,
            ounces: 35.274
        };
        return value * (weightConversions[toUnit] / weightConversions[fromUnit]);
    } else if (type === 'temperature') {
        // Temperature conversion logic
        if (fromUnit === 'Celsius') {
            if (toUnit === 'Fahrenheit') {
                return (value * 9/5) + 32;
            } else if (toUnit === 'Kelvin') {
                return value + 273.15;
            }
        } else if (fromUnit === 'Fahrenheit') {
            if (toUnit === 'Celsius') {
                return (value - 32) * 5/9;
            } else if (toUnit === 'Kelvin') {
                return ((value - 32) * 5/9) + 273.15;
            }
        } else if (fromUnit === 'Kelvin') {
            if (toUnit === 'Celsius') {
                return value - 273.15;
            } else if (toUnit === 'Fahrenheit') {
                return ((value - 273.15) * 9/5) + 32;
            }
        }
    }
    return value;
}

conversionTypeSelect.addEventListener('change', () => {
    populateUnits(conversionTypeSelect.value);
});

convertButton.addEventListener('click', () => {
    const value = parseFloat(document.getElementById('input-value').value);
    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnitSelect.value;
    const type = conversionTypeSelect.value;
    if (isNaN(value)) {
        resultDiv.textContent = 'Please enter a valid number.';
        return;
    }
    const result = convert(value, fromUnit, toUnit, type);
    resultDiv.textContent = `Result: ${result} ${toUnit}`;
});

// Initial population of units based on default conversion type
populateUnits(conversionTypeSelect.value);
