var tower, towimg
var door, doorimg, doorgroup
var climbers, climbersimg, climbergroup
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload() {
  towimg = loadImage("tower.png")
  doorimg = loadImage("door.png")
  climbersimg = loadImage("climber.png")
   ghostImg = loadImage("ghost-standing.png");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300)
  tower.addImage(towimg)
  tower.velocityY = 1;
  ghost = createSprite(300,300,10,10);
  ghost.addImage("g1",ghostImg);
  ghost.scale = 0.4;
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  ghost.setCollider("rectangle",0,0,250,300);
  ghost.debug = true;
}

function draw() {
 background("black");
  
  
   if(gameState ==="play"){
    
     spawndoor();
     
  if(tower.y>600){ 
    tower.y = 300;
  }
  
  if(keyDown("LEFT_ARROW")){
    ghost.x = ghost.x-2;
  }
  
  if(keyDown("RIGHT_ARROW")){
    ghost.x = ghost.x+2;
  }
  if(keyDown("space")){
    ghost.velocityY = -8; 
  }
 if(climbersGroup.isTouching(ghost)){
   ghost.velocityY = 0;
 }
  if(ghost.y>600||invisibleBlockGroup.isTouching(ghost)){
    ghost.destroy();
    gameState = "END";
  }
    
  ghost.velocityY = ghost.velocityY+0.6;
   }
  
  if(gameState === "END"){
    fill("yellow");
    textSize(20);
    text("Game Over",250,300)
    tower.y = 2000;
    climbersGroup.destroyEach();
    doorsGroup.destroyEach();
    invisibleBlockGroup.destroyEach();
  }
  
  drawSprites();
}

function spawndoor() {
  
  if(frameCount%320 === 0){
    door = createSprite(Math.round(random(150,400)),-50,10,10);
    door.addImage("d1",doorimg);
    door.velocityY = 1;
    door.lifetime = 700;
    ghost.depth = door.depth;
    ghost.depth+= 1;
    climbers = createSprite(200,5,10,10);
    climbers.addImage("c1",climbersimg);
    climbers.x = door.x;
    climbers.velocityY = 1;
    climbers.lifetime = 700;
    ghost.depth = climbers.depth;
    ghost.depth+= 1;
    doorsGroup.add(door);
  climbersGroup.add(climbers);
   invisibleBlock = createSprite(200,15,100,10);
   invisibleBlock.velocityY = 1; 
   invisibleBlock.x = door.x;
   invisibleBlock.lifetime = 700;
   invisibleBlockGroup.add(invisibleBlock);
     invisibleBlock.debug = true;
  }
  
  
}