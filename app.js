game = document.querySelector('#game');
character = document.querySelector('#character')
block = document.querySelector('#block')
h1 = document.querySelector('h1')

game.addEventListener('click', () => {
    if (![...character.classList].includes('animate')) {
        character.classList.add('animate');
        character.addEventListener('animationend', function() {
            this.classList.remove('animate');
        })
    };
});

const checkDead = setInterval(function() {
    const characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'));
    const characterBottom = characterTop + 50;
    const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
    const blockTop = parseInt(window.getComputedStyle(block).getPropertyValue('top'));
    character.style.background = 'black';
    if (blockLeft >= 10 && blockLeft <= 40 && characterBottom >= 180) {
        block.style.animation = 'none';
        block.style.display = 'none';
        alert('u a looser, hehe')
    }
}, 10)