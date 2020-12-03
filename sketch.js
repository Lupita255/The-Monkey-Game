
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;

function preload(){
  
  var survivalTime = 0;
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
  monkey = createSprite(80,295,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,330,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("white");
  
  if(ground.x < 0) {
    ground.x = ground.width/2;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
  if(keyDown("space")){
    monkey.velocityY = -9;
  }
  
  spawnBananas();
  spawnObstacles();
  
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
  }
  
  if (obstacleGroup.isTouching(monkey)){
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    ground.velocityX = 0;
    
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityYEach(0);
    FoodGroup.setVelocityXEach(0);
    FoodGroup.setVelocityYEach(0);
    
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
  }

 drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);
}

function spawnBananas(){
  if(frameCount % 80 === 0){
    var banana = createSprite(600,200,10,10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.y = Math.round(random(120,200));
    banana.lifetime = 300;
    banana.velocityX = -5;
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 300 === 0) {
    obstacle = createSprite(600,300,10,10);
    obstacle.velocityX = -5;
    obstacle.addImage(obstaceImage);
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
    obstacle.scale = 0.13;
  }
}
