var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage, cloudGroup, obstacleGroup,cloudimage, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, score, gameover,restart, gameoverimg,restartimg;

var end=0;
var play=1; 
var game_state=play;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  
  cloudimage = loadImage("cloud.png")
  
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  
  gameoverimg= loadImage("gameOver.png")
  restartimg = loadImage("restart.png")
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("collided", trex_collided);

  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudGroup=new Group();
  obstacleGroup=new Group();
  score=0;
  
  gameover = createSprite(300,80);
  gameover.addImage(gameoverimg)
  gameover.visible = false;
  gameover.scale = 0.5;
  restart = createSprite(300,130);
  restart.addImage(restartimg)
  restart.visible = false;
  restart.scale = 0.5;
}

function draw() {
  background(100000000000000000);
  
  if (game_state===play){
       if(keyDown("space")&&trex.y >=159 ) {
    trex.velocityY = -12;
  }
  
    trex.velocityY = trex.velocityY + 0.8
     if (ground.x < 0){
    ground.x = ground.width/2;
  }
    
   score = score + Math.round(getFrameRate()/30); 
  text("Score: "+ score, 500,50);
    
  trex.collide(invisibleGround);
  spawnclouds();
  spawnObstacles();
    
    if (obstacleGroup.isTouching(trex)){
        game_state=end;
        }
  }
else if (game_state===end){
    trex.changeAnimation("collided",trex_collided)
  ground.velocityX=0;
  trex.velocityY=0;
  obstacleGroup.setVelocityXEach(0);
  cloudGroup.setVelocityXEach(0);
  cloudGroup.setLifetimeEach(-1);
  obstacleGroup.setLifetimeEach(-1);
  gameover.visible = true;
  restart.visible = true;
  if (mousePressedOver(restart)){
     reset();
      }
}
   drawSprites();
 
}
function spawnclouds(){
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudGroup.add(cloud);
  
  
  }
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,170,10,40);
    obstacle.velocityX =  -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(obstacle1);
      break;
      case 2:obstacle.addImage(obstacle2);
      break;
      case 3:obstacle.addImage(obstacle3);
      break;
      case 4:obstacle.addImage(obstacle4);
      break;
      case 5:obstacle.addImage(obstacle5);
      break;
      case 6:obstacle.addImage(obstacle6);
      break;
    }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300       ;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}
function reset(){
 
  gameover.visible = false;
  restart.visible = false;
  trex.changeAnimation("running",trex_running);
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
   game_state=play;

  score=0;

}