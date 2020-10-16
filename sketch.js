
var monkey , monkey_running, monkey_collided;
var bananaImage,  obstacleImage;
var bananaGroup, obstacleGroup;
var score = 0;

var PLAY =1;
var END =0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_collided = loadAnimation("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  
  createCanvas(600, 200);
  
  monkey = createSprite(100,160,20,20);
  monkey.addAnimation("running" , monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  monkey.scale = 0.11;
  
  ground = createSprite(0,190,600,5);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  obstaclesGroup =  new Group();
  bananaGroup =  new Group();
  
}


function draw() {
 background("white");
  text("Survival Time: " +score, 475, 50);
  if(gameState === PLAY)
  {
     monkey.changeAnimation("running", monkey_running);
    
      score = score + Math.round(getFrameRate()/60);

    if(keyDown("space") && monkey.y > 100)
      {      
        monkey.velocityY = -10;
      }

    monkey.velocityY = monkey.velocityY + 0.8;


    if(ground.x <ground.width /2)
      {      
        ground.x = 300;
      }

    spawnBananas();
    spawnObstacles();

    if(monkey.isTouching(obstaclesGroup))
      {
        gameState = END;        
      }
    if(monkey.isTouching(bananaGroup))
      {
        bananaGroup.destroyEach();
      }
  }
  else if(gameState === END)
  {    
    
   setGameOver();
        
  }
  monkey.collide(ground);  
  drawSprites();
}


function spawnBananas() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(12,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
        
    //add each cloud to the group
    bananaGroup.add(banana);
  }
  
}


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    
    obstacle.velocityX = -5;
    obstacle.addImage(obstacleImage);             
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function setGameOver()
{
  
   fill("red");
    textSize(30);
    text("GAME OVER!" , 250,100);
    
    monkey.changeAnimation("collided", monkey_collided);  
        
    ground.velocityX =0;
    monkey.velocityX = 0;
        
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
        
    obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
}