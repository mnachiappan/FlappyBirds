var states = { preload: preload,
				create: create,
				update: update };

var xDim = 1400;
var yDim = 1000;
var birdieWeight = 650;
var FLAP = 420;

var game = new Phaser.Game(xDim, yDim, Phaser.AUTO, '', states);

var birdie,
    gameStarted,
    gameOver;

function preload(){
    game.scale.maxWidth = xDim;
    game.scale.maxHeight = yDim;

    //  Then we tell Phaser that we want it to scale up to whatever the browser can handle, but to do it proportionally
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.setScreenSize();

	game.load.spritesheet('birdie', 'assets/birdie.png', 48, 24);
	game.load.image('finger', 'assets/finger.png');
}

function create(){

	game.physics.startSystem(Phaser.Physics.ARCADE);

	var birdieScale = 3;
    birdie = game.add.sprite(game.width / 6, game.height / 2, 'birdie');
    birdie.anchor.setTo(0.5, 0.5);
    birdie.animations.add('fly', [0, 1, 2, 3], 10, true);
    birdie.scale.setTo(birdieScale, birdieScale);
    game.input.onDown.add(flap);

    // Enable physics on these sprites
    game.physics.enable([birdie], Phaser.Physics.ARCADE);
    birdie.body.gravity.y = birdieWeight;
    birdie.body.collideWorldBounds = true;

    game.stage.backgroundColor = '#DDEEFF';

    reset();
}

function flap(){
    if(!gameStarted){
        beginGame();
    } else if(!gameOver){
        birdie.body.velocity.y = -FLAP;
    } else{
        reset();
    }
}

function reset(){
	birdie.animations.play('fly', 15, true); 
    birdie.body.allowGravity = false;
	birdie.reset(game.world.width / 6, game.world.height / 2);
    birdie.angle = 0;
    gameStarted = false;
    gameOver = false;
}

function beginGame(){
    birdie.body.allowGravity = true;
    gameStarted = true;
}

function endGame(){
    birdie.animations.stop('fly');
    gameOver = true;
    birdie.angle = 90;
}

function update(){
    if(gameStarted){

        var MAX_ANGLE = 60;
        if (birdie.body.velocity.y <= -FLAP){
            birdie.angle = -MAX_ANGLE;
        }else{
            var angle = MAX_ANGLE / FLAP * birdie.body.velocity.y;
            birdie.angle = Math.min(angle, 90);
        }

        if(birdie.body.bottom >= game.world.bounds.bottom){
            endGame();
        }
    }
}
