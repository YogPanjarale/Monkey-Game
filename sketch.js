var play = 1;
var end = 0;
var GameState = play;
//Global Variables
var _background, ground, back_img, monkey, running_img, banana_img, obstacle_img, obstacleGroup, foodGroup, score, hit,restart_img,GameOver_img,restart,GameOver,depth=0,speed=8;


function preload() {
  back_img = loadImage("jungle.jpg");
  running_img = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  obstacle_img = loadImage("stone.png");
  banana_img = loadImage("Banana.png");
restart_img = loadImage("restart.png");
  GameOver_img = loadImage("gameOver.png");
}

function setup() {
  background('white');
  createCanvas(600, 300);
  frameRate(40);
  hit = 0
  _background = createSprite(width, 25);
  _background.addImage(back_img);
  _background.scale = 1.3;
  _background.velocityX = -speed;

  ground = createSprite(width / 2, 270, width, 50);
  ground.visible = false

  monkey = createSprite(100, 200);
  monkey.addAnimation("running", running_img);
  monkey.scale = 0.12;
  
   restart = createSprite(width / 2, height / 1.5);
  restart.addImage("restart", restart_img);
  restart.visible = false;

  gameover = createSprite(width / 2, height / 3);
  gameover.addImage("go", GameOver_img);
  gameover.visible = false;

  score = 0;
  obstaclesGroup = new Group();
  foodGroup = new Group();
}


function draw() {
  background(255);

  if (GameState == play) {
    if (_background.x < 0) {
      _background.x = _background.width / 1.8;
    }
    if (keyDown("space") && monkey.y >= 200) {
      monkey.velocityY = -10;
    }
    monkey.velocityY += 0.4
    monkey.collide(ground);
    spawnStones();
    spawnfood();
    if (obstaclesGroup.isTouching(monkey)) {

      hit -= 1;
      if (hit >= 1) {
        monkey.scale = 0.1;
      }console.log(hit    )
      if (hit <= 0) {
        GameState = end
      }
    }
    if (foodGroup.isTouching(monkey)) {
      foodGroup.destroyEach();
      score += 2
    }
  }

  if (GameState == end) {
    monkey.setVelocity(0,0);
    ground.velocityX = 0;
    _background.velocityX = 0
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    foodGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-1);
    //trex.changeAnimation("collided", trex_collided);
    restart.visible = true;
    gameover.visible = true;
     monkey.pause();
    restart.depth = depth + 1;
    if (mousePressedOver(restart)) {
      reset();
    }
   
     
  }
  switch (score) {
    case 10:
      monkey.scale = 0.14;
      break;
    case 20:
      monkey.scale = 0.16;
      break;
    case 30:
      monkey.scale = 0.18;
      break;
    case 40:
      monkey.scale = 0.20;
      break;
    default:
      break;
  }
  drawSprites();
  scoreboard();
}

function reset() {
  
  obstaclesGroup.destroyEach();
  foodGroup.destroyEach();
  _background.velocityX = -speed;
  restart.visible = false;
  gameover.visible = false;
  score = 0;
  hit= 0;
  GameState = play;
  monkey.play();
}

function spawnStones() {
  if (frameCount % 180 == 0 && random(1, 5) >= 2) {
    var stone = createSprite(width + random(75, 100), 220, 10, 10);
    stone.velocityX = _background.velocityX;
    stone.addImage(obstacle_img);
    stone.scale = 0.2;
    stone.lifetime = width / stone.velocityX;
    obstaclesGroup.add(stone)
    //stone.debug = true 
    stone.setCollider("rectangle", -60, 35, 200, 400, 30);
  }depth++;

}

function spawnfood() {
  if (frameCount % 100 == 0) {
    var banana = createSprite(width, random(50, 100), 10, 10);
    banana.velocityX = _background.velocityX;
    banana.addImage(banana_img);
    banana.scale = 0.05;
    banana.lifetime = width / banana.velocityX;
    foodGroup.add(banana);
    banana.setCollider("rectangle", 0, 0, 50, 10)
  }

}

function scoreboard() {
  textSize(30);
  fill("white")
  text("Score: " + score, 200, 30)
}
