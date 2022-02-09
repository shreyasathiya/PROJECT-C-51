var player;
var playerImg,playerjumpImg,playerrunImg,door1Img;
var door1;
var START= 0;
var LEVEL1= 1;
var LEVEL2= 2;
var END=3;
var gameState = START;
var ground;
var obstacle1, obstacle1Img;
var obstacle2, obstacle2img;
var obstacle1Group,obstacle2Group;

function preload(){
playerImg= loadImage("assets/player.png");
playerjumpImg = loadAnimation("assets/player-jumping.png","assets/player-jumping_2.png")
playerrunImg = loadAnimation("assets/player-running 1.png","assets/player-running 2.png")
doorImg = loadImage("assets/door.png")
obstacle1Img = loadImage("assets/image-removebg-preview (5).png")
obstacle2img1= loadImage("assets/vampire1.png")
obstacle2img2= loadImage("assets/zombie1.png")
}

function setup(){
  createCanvas(2500,400)
player = createSprite(25,300,50,10);
player.addImage("jump",playerImg);

//player.addAnimation("jumping",playerjumpImg)
player.scale = 0.5


ground = createSprite(1250,360,2500,20);

}

function draw() {
  background("black");

  if(gameState===START){
    text("YOU TRAPPED IN A HAUNTED HOUSE. REACH THE door1 TO ESCAPE",300,50);
    text("PRESS SPACE TO START",450,100);
    if(keyDown("space")){
      gameState=LEVEL1;
     
    }
  }
  if(gameState===LEVEL1){
    door1 = createSprite(2450,300,50,10);
    door1.addImage(doorImg);
    door1.scale=0.3
  if(keyDown("UP_ARROW")) {
    player.addAnimation("jump",playerjumpImg)
    player.velocityY = -12;
  }
  if(keyDown("RIGHT_ARROW")) {
    player.changeAnimation("run",playerrunImg)
    player.x += 12;
  
 }
  if(player.isTouching(door1)){
    gameState=LEVEL2;
    obstacle1Group.destroyEach();
    door1.destroy();
  }
  spawnObstacleslevel1()
  obstacle1Group = createGroup();
  }

  if(gameState===LEVEL2){
    fill("red")
    text("REACH THE NEXT DOOR TO ESCAPE",300,50)

    door2 = createSprite(2450,300,50,10);
    door2.addImage(doorImg);
    door2.scale=0.3

     player.x=25;
     player.y=300;

    if(keyDown("UP_ARROW")) {
      player.addAnimation("jump",playerjumpImg)
      player.velocityY = -12;
    }

    if(keyDown("RIGHT_ARROW")) {
      player.changeAnimation("run",playerrunImg)
      player.x += 12;
    
   }
  }
  player.velocityY+=0.8;
  player.collide(ground);
  drawSprites();
}

function spawnObstacleslevel1() {
  if(frameCount % 100 === 0){
    obstacle1=createSprite(25,300,20,20)
   // obstacle1.y = Math.round(random(400,2540))
   obstacle1.x= player.x+250
    obstacle1.addImage(obstacle1Img);
    obstacle1.scale=0.2;
    obstacle1Group.add(obstacle1)
  }
 
}

function spawnObstacleslevel2() {
  if(frameCount % 100 === 0){
    obstacle2=createSprite(25,300,20,20)
   // obstacle1.y = Math.round(random(400,2540))
   obstacle2.x= player.x+250

   var rand = Math.round(random(1,3));
   switch(rand) {
    case 1: obstacle2.addImage(obstacle1);
            break;
    case 2: obstacle2.addImage(obstacle2img1);
            break;
    case 3: obstacle2.addImage(obstacle2img2);
            break;
    default: break;
  }

    obstacle2.scale=0.2;
  }
 
}