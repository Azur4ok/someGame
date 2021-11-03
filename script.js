const game = document.getElementById("game");
const startMenu = document.getElementById("start");
const start = document.getElementById("start-btn");
let countLifes = 5;

start.style.backgroundColor = "green";
start.style.height = '100px';
start.style.width = start.style.width + 100 +'px';
console.log(start);

const score = document.getElementById("score");
let scoreCounter = document.getElementById("score").children[0].textContent;
score.style.color = "yellow";
console.log(scoreCounter);

const audioPlayer = document.getElementById("audio");
console.log(audioPlayer);

let audioSource = audioPlayer.children[0];
console.dir(audioSource);

const songFirstButton = document.getElementById("song1");
const songSecondButton = document.getElementById("song2");

start.addEventListener("click", function(){
    startGame();
});

songFirstButton.addEventListener("click", function(){
    audioSource.src = "./audio/1.mp3";
    audioPlayer.load();
});

songSecondButton.addEventListener("click", function(){
    audioSource.src = "./audio/2.mp3";
    audioPlayer.load();
}); 

const soundButton = document.getElementById("sound").children[0];
let soundCondition = "soundOff";
soundButton.addEventListener("click", () => {
    if (soundCondition == "soundOff") {
        soundButton.src = "images/sound_on.png";
        soundCondition = "soundOn";
        audioPlayer.play();
        console.log(soundCondition);
    } else {
        soundButton.src = "images/mute_sound.png";
        soundCondition = "soundOff";
        audioPlayer.pause();
        console.log(soundCondition);
    }
});

const character = document.getElementById("player");

document.onkeydown = (event) => {
    if (event.key == "w") {
        if (character.offsetTop < 30){   
            character.style.top = "5px";
        } else {
        character.style.top = character.offsetTop - 50 +"px";
        }
    } else if (event.key == "s") {
        if (character.offsetTop > 530)
        character.style.top = "550px";
        else
    character.style.top = character.offsetTop + 50 +"px";
    } else if (event.key == " ") {
        createBullet();
    }

    //Сделать создание пули при нажатии на пробел. Когда пуля долетает до конца поля удалять пулю и останавливать таймер пули
};

// const characterMoving = (event) => {
//     if (event.key == "w") {
//         character.style.top = character.offsetTop - 10 +"px";
//     } else if (event.key == "s") {
//     character.style.top = character.offsetTop + 10 +"px";
//     console.log(event);
//     } 
// };

// character.addEventListener("keydown", characterMoving);

const startGame = () => {
    game.classList.toggle("hide-menu");
    startMenu.classList.toggle("hide-menu");
    createLifes();
    createEnemy();
    scoreCounter = 0;

};

const createEnemy = () => {
    let firstEnemy = document.createElement("div");
    firstEnemy.className = "enemy type-1";
    game.appendChild(firstEnemy);
    
    moveEnemy(firstEnemy);

    // let secondEnemy = document.createElement("div");
    // secondEnemy.className = "enemy type-2";
    // game.appendChild(secondEnemy);

    // moveEnemy(secondEnemy);
};

const moveEnemy = (enemy) => {
    let timerID = setInterval(function() {
        enemy.style.left = enemy.offsetLeft - 10 + "px";
        if (enemy.offsetLeft < -100) {
            enemy.remove(); 
            createEnemy();
            //очистить интервал
            clearInterval(timerID);
            die();
            if (countLifes == 5) {
                enemy.remove();
            }
        }
    }, 100);
};

const createBullet = () => {
    const newBullet = document.createElement("div");
    newBullet.className = "bullet";
    game.appendChild(newBullet);
    newBullet.style.top = character.offsetTop + 140 + "px";
    newBullet.style.left = character.offsetLeft + 140 + "px";

    moveBullet(newBullet);
};

const moveBullet = (bullet) => {
    const timerID = setInterval(function() {
        bullet.style.left = bullet.offsetLeft + 10 + "px";
        if (bullet.offsetLeft > document.querySelector("body").clientWidth) {
            bullet.remove();
            clearInterval(timerID);
        }
        isBoom(bullet);
    }, 10);
};

const isBoom = (bullet) => {
    const enemy = document.querySelector(".enemy");
    const enemyPositionTop = enemy.offsetTop;
    const enemyPositionLeft = enemy.offsetLeft;
    if (bullet.offsetTop > enemy.offsetTop && bullet.offsetTop < enemy.offsetTop + enemy.clientHeight
     && bullet.offsetLeft > enemy.offsetLeft){
            createBoom(enemyPositionTop, enemyPositionLeft); 
            scoreCounter += 1;
            document.getElementById("score").children[0].textContent = scoreCounter + ""; 
            bullet.remove();
            enemy.remove();
            createEnemy();
    }

};

const createBoom = (enemyPositionTop, enemyPositionLeft) => {
    const boom = document.createElement("div");
    boom.classList = "boom";
    game.appendChild(boom);

    boom.style.top = enemyPositionTop + "px";
    boom.style.left = enemyPositionLeft + "px";

    setTimeout(function() {
        boom.remove();
    }, 1000);
};

const createLifes = () => {
    const lifesBlock = document.getElementById("lifes");
        lifesBlock.innerHTML = "";
    let count = 0;
    while(count < countLifes) {
        const span = document.createElement("span");
        lifesBlock.appendChild(span);
        count++;
    };
};


const die = () => {
     countLifes -= 1;
    if (countLifes <= 0) {
        alert("you lost");
        game.classList.toggle("hide-menu");
        startMenu.classList.toggle("hide-menu");
        countLifes = 5;
    };
    createLifes();
};

/*
Задание со ⭐️
⭐️1. Сделать увеличение очков после убийства врага
⭐️2. Создавать элемент взрыва на месте попадания пули по врагу, и через секунду уничтожать элемент взрыва
 */