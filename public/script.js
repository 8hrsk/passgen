let level = 'easy'; // global var for level choosing and presets

const events = {
    output: document.getElementById('output'),
    btn: document.getElementById('btn'),
    input: document.getElementById('input'),
    clear: document.getElementById('clear'),
}


const Level = {
    easy: { //easy
        string: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
        event: document.getElementById('easy'),
        num: 1,
    },

    medium: { //medium
        string: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY1234567890',
        special: '!.,/\\?+=-',
        event: document.getElementById('medium'),
        num: 2,
    },

    hard: { //hard
        string: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY1234567890',
        special: '!@#$%^&*(),./:;<=>?+=_-~`',
        event: document.getElementById('hard'),
        num: 3,
    }
};

{
    document.addEventListener('keypress', (event) => {
        let keyCode = event.keyCode ? event.keyCode : event.which;
        if (keyCode == 13) {
            events.btn.click()
        }
    })

    events.btn.addEventListener('click', () => { // wait for button to be clicked
        functions.sendData();
    })

    events.clear.addEventListener('click', () => {
        events.input.value = '';
    })

    Level.easy.event.addEventListener('click', () => {
        level = 'easy';
    })
    
    Level.medium.event.addEventListener('click', () => {
        level = 'medium';
    })
    
    Level.hard.event.addEventListener('click', () => {
        level = 'hard';
    })    
}

const functions = {
    isMail: (input) => {
        let result = null;
        for (let i = 0; i < input.length; i++) {
            if (input[i] == "@") {
                result = true;
                break;
            } else {
                result = false;
            }
        }
        return result;
    },

    randomElement: (array) => { // getting random element
        let element = array[Math.floor(Math.random() * array.length)];
        return element
    },

    generatePassword: (length) => { //main generator
        let string = Level[level]?.string + Level[level]?.special;
        //console.log(`Generating from ${string}`);
        let str = '';
        for (let i = 0; i < length; i++) {
            str += functions.randomElement(string);
        }
        return str
    },

    generateResponse: () => { //checking and starting generator
        let ownType = events.input.value;
        //console.log(ownType);
        let result = '';

        if (ownType !== ``) {
            let neededLength = Number(ownType);
            result = functions.generatePassword(neededLength);
            return result
        } else {
            result = functions.generatePassword(Level[level].num * (Math.pow(2, 3)));
            return result
        }
    },

    sendData: () => { // shows result
        events.output.innerHTML = functions.generateResponse()
        //console.log('test');
    },
}