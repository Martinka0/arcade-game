var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.xRange = [-10, 500];
    this.yRange = [60, 140, 230];
    this.speedRange = [30, 400];
    this.reset();
}

Enemy.prototype.reset = function() {
    var startPos = this.xRange[0];

    this.x = startPos;
    this.y = this.getRandomY();
    this.speed = this.getRandomSpeed();
}

Enemy.prototype.update = function(dt) {
    var maxPos = this.xRange[1];
    this.x += this.speed * dt;

    if (this.x > maxPos) {
        this.reset();
    }
}

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.getRandomY = function() {
    return this.yRange[Math.floor(Math.random() * this.yRange.length)];
}

Enemy.prototype.getRandomSpeed = function() {
    var minSpeed = this.speedRange[0],
        maxSpeed = this.speedRange[1];

    return Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed;
}

// Now write your own player class
var Player = function() {
    this.x = 20;
    this.y = 20;
    this.sprite = 'images/char-horn-girl.png';
    this.reset();
}
// This class requires an update(), render() and
// a handleInput() method.



Player.prototype.reset = function () {
    this.x = 200;
    this.y = 400;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// // Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var allEnemies=[enemy1, enemy2, enemy3];
// var allEnemies = [
//     new Enemy(-200, 83, 170),
//     new Enemy(-200, 166, 265),
//     new Enemy(-200, 249, 225)
// ];

// function checkCollisions (allEnemies, player) { // capitalize the the first letter of Collisions
//     for(var i = 0; i < allEnemies.length; i++) {
//         if (allEnemies[i].x < player.x + player.width &&
//         allEnemies[i].x + allEnemies[i].width > player.x &&
//         allEnemies[i].y < player.y + player.height &&
//         allEnemies[i].height + allEnemies[i].y > player.y) {
//         player.reset(200,400); // call the reset method on the player object and not on the Player constructor, pass x and y coordinates to the reset method
//         }
//     } // put the closing curly brace here
// }





// Player movement up/down keys
Player.prototype.handleInput = function(key) {

    switch (key) {
        case 'left':
            this.x = this.x - 50;
            break;
        case 'up':
            this.y = this.y - 50;
            break;
        case 'right':
            this.x = this.x + 50;
            break;
        case 'down':
            this.y = this.y + 50;
            break;
    }

}
//check position of Player against walls
Player.prototype.update = function() {
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 400) {
        this.x = 400;
    } else if (this.y === 0) {
        this.y = 400;
    } else if (this.y < 0) {
        this.y = 400;
    } else if (this.y > 400) {
        this.y = 400;
    }
};

var player = new Player(200, 400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

