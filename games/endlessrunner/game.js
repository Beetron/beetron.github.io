/* jshint browser: true, devel: true */

var canvas = document.getElementById('myGame');
var keyJump = false;

class Enemy{
    constructor(x, y, w, h) {
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = floorY - this.h + y
        this.speed = 5;
    }
}

class Player{
    constructor(w, h, initX, initY, x, y, speed) {
        this.w = w;
        this.h = h;
        this.initX = initX;
        this.initY = initY;
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
}

if(canvas.getContext) {
var ctx = canvas.getContext('2d');
    
    //Necessary for game loop
    var cw = canvas.width,
    ch = canvas.height,
    cmidX = canvas.width / 2,
    cmidY = canvas.height / 2,
    fps = 60,
    interval = 1000/fps,
    lastTime = Date.now(),
    currentTime = 0,
    delta = 0,
    lastDelta = 0;
    
    var gameEnum = {
        gameOver: 0,
        gameStart: 1,
        gameRunning: 2,
    };
    var gameState = gameEnum.gameStart;
    
    var playerWidth = 50;
    var playerHeight = 50;
    var playerInitX = cmidX / 3 - playerWidth / 2;
    var playerInitY = cmidY - playerHeight / 2;
    var playerSpeed = 0;
    var playerOne = new Player(playerWidth, playerHeight, playerInitX, playerInitY, playerInitX, playerInitY, playerSpeed)

    var playerSprite = new Image();
    var playerSprite2 = new Image();
    playerSprite.src = 'spiralman.png';
    playerSprite2.src = 'spiralman2.png';
    var animationSwitch = true;
    var baseAnimationSwitchTimer = 300;
    var animationSwitchTimer = baseAnimationSwitchTimer;
        
    var basePlayerLives = 3;
    var playerLives = basePlayerLives;
    var heartDisplay =  "";
    var lifeRepresentation = "❤️️ ";
    var playerImmune = false;
    var score = 0;
    
    var floorY = cmidY + playerHeight / 2;

    var jumpHeight = 0;
    var jumpStep = 5;
    var maxJumpHeight = 20;
    var jumpAcceleration = 0;
    var gravity = 1;
   
    var jump = false;
    
	var enemyList = [];
	var baseEnemySpawnTimer = 5000;
	var enemySpawnTimer = baseEnemySpawnTimer;
	var enemySpawnInterval = 50;
	var minEnemySpawnTimer = 1350;
	var nextEnemySpawnModifier = 0;
    
    var groundEnemy = new Image();
    groundEnemy.src = 'groundenemy.png';
    
    var basePlayerImmuneTimer = 3000;
    var playerImmuneTimer = basePlayerImmuneTimer;
    var playerImmmuneTimingMultiplier = 1.2;
    var baseSkipRenderTimer = 50;
    var skipRenderTimer = baseSkipRenderTimer;
    var skipRenderTimerIncrementer = baseSkipRenderTimer;
    var skipRender = false;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function checkCollision(aX, aY, aW, aH, bX, bY, bW, bH){
    //If any of the sides from A are outside of B
    if( aY+aH <= bY ){
        return false;
    }
    if( aY >= bY+bH ){
        return false;
    }
    if( aX+aW <= bX ){
        return false;
    }
    if( aX >= bX+bW ){
        return false;
    }
    //If none of the sides from A are outside B
    return true;
}

//Create listeners for inputs
document.addEventListener('keydown', function(event) {
    if(event.defaultPrevented) {
        return;
    }
    if(gameState != gameEnum.gameRunning) {
        if(event.keyCode){
            gameState = gameEnum.gameRunning;
            score = 0;
        }
    }
    else{
        switch(event.keyCode){
        case 32: //Space
        case 38: //Up
        case 87: //W
        case 13: //Enter
            keyJump = true;
            break;
        default: 
        }    
    }
    event.preventDefault();
}, true);

document.addEventListener('keyup', function(event) {
    if(event.defaultPrevented) {
        return;
    }
    switch(event.keyCode){
        case 32: //Space
        case 38: //Up
        case 87: //W
        case 13: //Enter
            keyJump = false;
            break;
        default:
    }
    event.preventDefault();
}, true);

function handleInput(){
    if(keyJump == true && playerOne.h + playerOne.y >= floorY){
        playerOne.speed += maxJumpHeight;
    }
}

function handlePlayerCollisions(){
    //Handle jump collisions
    //If player isn't past the floor
    if(playerOne.h + playerOne.y >= floorY){
        if(playerOne.speed > 0){
            playerOne.y -= playerOne.speed;
        }
        else{
            playerOne.speed = 0;
        }
    }
    else{        playerOne.speed -= gravity;
        playerOne.y -= playerOne.speed;
    }
}

function handleEnemyBehaviour(){
    //Manage enemies
    enemyList.forEach(function(enemy, index, array){

        //Delete enemies if they stray too far away from the left side of the screen
        if(enemy.x < -50 && index === 0){
            enemyList.shift();
            score += 1;
        }
        else{
            //For each enemy, handle enemy movements
            enemy.x -= enemy.speed;

            if(enemy.x < 100+playerInitX){
                //For each enemy, if a collision is made, deduct a life
                var collision = checkCollision(playerOne.x, playerOne.y, playerOne.w, playerOne.h, enemy.x, enemy.y, enemy.w, enemy.h);
                if(collision && playerImmune === false){
                    if(playerLives - 1 != 0){
                        playerLives -= 1;
                        playerImmune = true;
                    }
                    //GAME OVER
                    else{
                        gameState = gameEnum.gameOver;
                    }
                }
            }
        }
    });
}

function createNewEnemies(){
    //Create new enemies with RNG offset
    if(enemySpawnTimer <= 0 + nextEnemySpawnModifier){
        if(getRandomInt(0, 10) == 9){
            //Add double enemy
            enemyList.push(new Enemy(cmidX + 500, 0, 40, 40));
            enemyList.push(new Enemy(cmidX + 550, 0, 40, 40));
        }
        else if(getRandomInt(0, 5) == 4){
            //Add flying enemy
            enemyList.push(new Enemy(cmidX + 500, -50, 40, 40));
        }
        else{
            //Add enemy
            enemyList.push(new Enemy(cmidX + 500, 0, 40, 40));
        }

        //reset timer to base time
        enemySpawnTimer = baseEnemySpawnTimer;
        if( (baseEnemySpawnTimer - enemySpawnInterval) <= minEnemySpawnTimer){
            //Reached minimum possible time
            baseEnemySpawnTimer = minEnemySpawnTimer;
        }
        else{
            //Reduce interval
            baseEnemySpawnTimer -= enemySpawnInterval;
        }
        //Set next random enemy interval
        nextEnemySpawnModifier = getRandomArbitrary(0, 100)
    }
    else{
        //Countdown to next enemy
        enemySpawnTimer -= delta;
    }
}

function handlePlayerImmunity(){
    //If player gets hit, they are immune for basePlayerImmuneTimer in milliseconds
    if(playerImmune == true){
        if(playerImmuneTimer <= 0){
            playerImmune = false;
            playerImmuneTimer = basePlayerImmuneTimer;
            skipRenderTimer = baseSkipRenderTimer;
            skipRenderTimerIncrementer = baseSkipRenderTimer;
            //when we run out time, we reset all our variables
        }
        else{
            playerImmuneTimer -= delta;
            if(skipRenderTimer <= 0){
                //We skip a render if the player has been hit, the skip occurs progressively less so the player gets an indication of when they are NOT immune anymore
                skipRender = true;
                skipRenderTimer = skipRenderTimerIncrementer * playerImmmuneTimingMultiplier;
                skipRenderTimerIncrementer = skipRenderTimerIncrementer * playerImmmuneTimingMultiplier;
            }
            else{
                skipRenderTimer -= delta;
            }
        }
    }
}

function renderGame(){
    //Update lives display
    heartDisplay = "";
    for(var i=0; i < playerLives; i++){
        heartDisplay += lifeRepresentation;
    }
    //Draw sky
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(0, 0, canvas.width, floorY);
    //Draw floor
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(0, floorY);
    ctx.lineTo(cw, floorY);
    ctx.stroke();
    //Draw 'grass'
    ctx.fillStyle = 'green';
    ctx.fillRect(0, floorY, cw, floorY+50);
    //Draw 'ground'
    ctx.fillStyle = 'brown';
    ctx.fillRect(0, floorY+50, cw, ch);
    
    //If skipRender is turned on, we don't render, controlled by the playerimmune stuff
    if(skipRender == false){
        //Shit animation time
        if(animationSwitch == true){
            //Draw box player              
            ctx.drawImage(playerSprite, playerOne.x, playerOne.y, playerOne.w, playerOne.h);
            if(animationSwitchTimer <= 0){
                animationSwitch = false;
                animationSwitchTimer = baseAnimationSwitchTimer;
            }
            animationSwitchTimer -= delta;
        }
        else{
            ctx.drawImage(playerSprite2, playerOne.x, playerOne.y, playerOne.w, playerOne.h);
            if(animationSwitchTimer <= 0){
                animationSwitch = true;
                animationSwitchTimer = baseAnimationSwitchTimer;
            }
            animationSwitchTimer -= delta;
        }

    }
    else{
        skipRender = false;
    }

    //Render enemies
    enemyList.forEach(function(enemy, index, array){
        //Draw box
        ctx.drawImage(groundEnemy, enemy.x, enemy.y, enemy.w, enemy.h);
    });

    //Draw hp
    ctx.fillStyle = 'black';
    ctx.font = '36px Arial';
    ctx.fillText(heartDisplay, 10, 40);

    //Draw score
    ctx.fillStyle = 'black';
    ctx.font = '36px Arial';
    ctx.fillText(score, cw - 150, 40);
}

function gameLoop() {
    
    currentTime = Date.now();
    delta = (currentTime-lastTime);

    if(delta > interval) {
        
        handleInput();
        
        //Clear canvas
        ctx.clearRect(0, 0, cw, ch);
        
        //If the game isn't over, we play properly
        if(gameState == gameEnum.gameRunning){
            handlePlayerCollisions();
            handleEnemyBehaviour();
            createNewEnemies();
            handlePlayerImmunity();
            renderGame();
        }
        //GAME OVER
        else{
            //Draw white background
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            //Draw game over text
            ctx.fillStyle = 'black';
            ctx.font = '36px Arial';
            if(gameState == gameEnum.gameOver){
                //Reset objects
                playerLives = basePlayerLives;
                enemyList.splice(0,enemyList.length)
                playerOne.x = playerOne.initX;
                playerOne.y = playerOne.initY;
                playerImmune = false;
                jump = false;

                baseEnemySpawnTimer = 5000;
                enemySpawnTimer = baseEnemySpawnTimer;
                enemySpawnInterval = 50;
                minEnemySpawnTimer = 1350;
                nextEnemySpawnModifier = 0;

                playerImmuneTimer = basePlayerImmuneTimer;
                skipRenderTimer = baseSkipRenderTimer;
                skipRenderTimerIncrementer = baseSkipRenderTimer;
                skipRender = false;

                ctx.fillText("Game Over", cw/2 - 100, ch/2);
                ctx.font = '16px Arial';
                ctx.fillText("Press any key to play again", cw/2 - 100, ch/2 + 100);
                ctx.font = '16px Arial';
                ctx.fillText("Final Score: "+score, cw/2 - 70, ch/2 + 50)
            }
            else if(gameState == gameEnum.gameStart){
                ctx.fillText("Endless Runner", cw/2 - 100, ch/2);
                ctx.font = '16px Arial';
                ctx.fillText("Press any key to start.", cw/2 - 100, ch/2 + 100);
            }
        }
        //For timing the frames - essential
        lastTime = currentTime - (delta % interval);
    }
    window.requestAnimationFrame(gameLoop);
}