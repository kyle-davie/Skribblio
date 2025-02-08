import wordCount from './words.js';

document.querySelectorAll('.box input').forEach((input, index, inputs) => {
    input.addEventListener('input', () => {
        if (input.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
        updatePossibleWords();
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && input.value.length === 0 && index > 0) {
            inputs[index - 1].focus();
            inputs[index - 1].value = '';
        } else if (e.key === 'ArrowRight' && index < inputs.length - 1) {
            inputs[index + 1].focus();
        } else if (e.key === 'ArrowLeft' && index > 0) {
            inputs[index - 1].focus();
        }
        updatePossibleWords();
    });

    input.addEventListener('focus', () => {
        input.classList.add('pop');
        setTimeout(() => input.classList.remove('pop'), 150);
    });
});

let highestProbability = document.querySelector('#words');
let numLetters;

document.getElementById('numLetter').addEventListener('input', (e) => {
    numLetters = parseInt(e.target.value, 10);
    if (isNaN(numLetters) || numLetters <= 0) {
        console.log('Please enter a valid number of letters');
        return;
    }
    updatePossibleWords();
});

const inputs = [
    document.querySelector('#x1'),
    document.querySelector('#x2'),
    document.querySelector('#x3'),
    document.querySelector('#x4'),
    document.querySelector('#x5'),
    document.querySelector('#x6')
];

function updatePossibleWords() {
    if (!numLetters) return console.log('Please select a number of letters');

    const inputValues = inputs.map(input => input.value.toLowerCase());
    if (inputValues.every(value => value === '')) {
        highestProbability.value = ''; // Clear the text area
        return console.log('Please enter at least one letter');
    }

    console.log('Input values:', inputValues); // Debugging statement

    const possibleWords = wordCount[numLetters].filter(word => {
        console.log('Checking word:', word); // Log every word being checked
        const matches = inputValues.every((char, index) => char === '' || char === word[index]);
        console.log('Checking word:', word, 'matches:', matches); // Debugging statement
        return matches;
    });

    if (possibleWords.length === 0) {
        highestProbability.value = 'No words found';
    } else {
        highestProbability.value = possibleWords.join('\n');
    }
    console.log('Possible words:', possibleWords); // For debugging purposes
}




