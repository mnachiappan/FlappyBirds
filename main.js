var states = { preload: preload,
				create: create,
				update: update };

var xDim = 1400;
var yDim = 1000;
var birdieWeight = 650;

var game = new Phaser.Game(xDim, yDim, Phaser.AUTO, '', states);

var birdie;

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

    // Enable physics on these sprites
    game.physics.enable([birdie], Phaser.Physics.ARCADE);
    birdie.body.gravity.y = birdieWeight;
    birdie.body.collideWorldBounds = true;

    game.stage.backgroundColor = '#DDEEFF';

    reset();
}

function reset(){
	birdie.animations.play('fly', 15, true);
	birdie.x = game.width / 6;
	birdie.y = game.height / 2;
	birdie.body.allowGravity = false;
}

function update(){

}
