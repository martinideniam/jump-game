class Game {
    constructor() {
        this.game = document.querySelector('.game');
        this.character = document.querySelector('.character')
        this.html = document.querySelector('html');
        this.h1 = document.querySelectorAll('h1');
        this.block = document.querySelector('.block')
        this.info = document.querySelector('.info')
        this.textdiv = document.querySelector('.text-game-div')
        this.textdivtext = document.querySelector('.text-game')
        this.buttonLight = document.querySelector('.button-light')
        this.buttonLightText = document.querySelector('.button-light-text');
        this.info.innerText = 'Tap screen to jump';
        this.button = document.querySelector('.button')
        this.started = false;
        this.complexity = 1;
        this.counterInterval = null; 
        this.night = true;
        this.start();
    }

    start() {
        this.button.addEventListener('click', () => {
            if (this.started == false) {
                this.started = true; 
                this.character.classList.remove('hide');
                this.block.classList.remove('hide');
                this.textdiv.classList.add('hide');
                this.game.classList.remove('flexstuff');
                this.info.innerText = 'Tap screen to jump';
                this.counter_number = 0;
                this.checkIfFailed()
                this.jump()
                this.block.classList.add('animate_block');
                //to make button not functioning when already started
                if (!this.counterInterval) {
                    this.counterInterval = setInterval(() => {
                        this.counter_number += 1
                        this.info.innerText = `Your score: ${this.counter_number}`;
                    }, this.complexity*1000);
                }
            }
        })
        this.buttonLight.addEventListener('click', ()=> {
            if (this.night == true) {
                this.night = false; 
                this.buttonLightText.innerText = 'Dark mode';
                this.html.style.background = 'white';
                this.h1.forEach((element) => element.style.color = 'black');
                this.buttonLight.style.border = '2px solid black';
                this.button.style.border = '2px solid black';
                this.character.style.background = 'black';
                this.game.style.border = '2px solid black';
            } else {
                this.night = true; 
                this.buttonLightText.innerText = 'Day mode';
                this.html.style.background = 'black';
                this.h1.forEach((element) => element.style.color = 'white');
                this.buttonLight.style.border = '2px solid white';
                this.button.style.border = '2px solid white';
                this.character.style.background = 'white';
                this.game.style.border = '2px solid white';
            }
        })
    }

    stop() {
        this.started = false; 
        clearInterval(this.counterInterval);
        clearInterval(this.failedInterval);
        this.counterInterval = null;
        this.textdivtext.innerText = `Your score: ${this.counter_number}`
        this.character.classList.add('hide');
        this.block.classList.add('hide');
        this.textdiv.classList.remove('hide');
        this.game.classList.add('flexstuff');
        this.character.classList.remove('animate');
        this.info.innerText = 'Try again! Press Start!';
        this.block.classList.remove('animate_block');
    }


    jump() {
        if (this.started == true) {
            this.game.addEventListener('click', () => {
                if (![...this.character.classList].includes('animate')) {
                    this.character.classList.add('animate');
                    this.character.addEventListener('animationend', function() {
                        this.classList.remove('animate');
                    })
                }
            })
        }
    }


    checkIfFailed() {
        this.failedInterval = setInterval(() => {
            const characterPositionFromBottom = parseInt(window.getComputedStyle(this.character).getPropertyValue('bottom'));
            const characterPositionFromLeft = parseInt(window.getComputedStyle(this.character).getPropertyValue('left'));
            const characterWidth = parseInt(window.getComputedStyle(this.character).getPropertyValue('width'));
            const characterRightSidePositionFromLeft = characterPositionFromLeft + characterWidth;
            const blockPositionFromLeft = parseInt(window.getComputedStyle(this.block).getPropertyValue('left'));
            const blockHeight = parseInt(window.getComputedStyle(this.block).getPropertyValue('height'));
            if (blockPositionFromLeft >= characterPositionFromLeft && blockPositionFromLeft <= characterRightSidePositionFromLeft && characterPositionFromBottom <= blockHeight) {
                this.stop();
            }
        }, 10)
    }
}

const newGame = new Game();
newGame;