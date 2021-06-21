const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var starImg, bgImg;
var star, starBody;

var fairyAnim, fairy, fairyVoice;

function preload() {

	starImg = loadImage("images/star.png");
	bgImg = loadImage("images/starNight.png");

	fairyAnim = loadAnimation("images/fairyImage1.png", "images/fairyImage2.png")
	fairyVoice = loadSound("sound/JoyMusic.mp3")
}

function setup() {

	createCanvas(800, 750);

	fairyVoice.play();
	fairy = createSprite(400, 500, 100, 100);
	fairy.addAnimation("runing", fairyAnim);
	fairy.scale = 0.1;

	star = createSprite(650, 30);
	star.addImage(starImg);
	star.scale = 0.2;

	engine = Engine.create();
	world = engine.world;

	starBody = Bodies.circle(650, 30, 5, { restitution: 0.5, isStatic: true });

	World.add(world, starBody);
	Engine.run(engine);
}

function draw() {
	background(bgImg);
	keyPressed();

	star.x = starBody.position.x;
	star.y = starBody.position.y;

	if (star.y > 470 && starBody.position.y > 470) {
		Matter.Body.setStatic(starBody, true);
	}

	drawSprites();
}

function keyPressed() {

	if (keyWentDown("DOWN_ARROW")) {
		Matter.Body.setStatic(starBody, false);
		Matter.Body.setPosition(starBody, { x: random(200, 600), y: 30 })
	}

	if (keyDown("LEFT_ARROW")) {
		fairy.x -= 3 + frameCount / 50;
	}

	if (keyDown("RIGHT_ARROW")) {
		fairy.x += 3 + frameCount / 50;
	}

}