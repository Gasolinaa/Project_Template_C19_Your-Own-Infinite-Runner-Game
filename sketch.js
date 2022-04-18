var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var gameState = "play"


function preload(){
  towerImg = loadImage("arvotes.png");
  doorImg = loadImage("snake.png");
  climberImg = loadImage("branch.png");
  ghostImg = loadImage("macaco.png");
  
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  tower.scale = 2.4       
  doorsGroup = new Group();
  climbersGroup = new Group();


  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;

  ghost.setCollider('circle',0,0,120)

}

function draw() {
  background(200);
  if (gameState === "play"){

  
  
  if(tower.y > 400){
      tower.y = 300
    }

    if(keyDown("a")){
      ghost.x = ghost.x -3;
    }
    
    if(keyDown("d")){
      ghost.x = ghost.x +3;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -5;
    }
    ghost.velocityY += 0.8;

    if (ghost.isTouching(climbersGroup)){
      ghost.velocityY = 0;
      ghost.velocityX= 0;
    }

    if (doorsGroup.isTouching(ghost)||ghost.y > 600){
      ghost.destroy();
      gameState = "end";
    }
    spawnDoors();
    drawSprites();
}

if(gameState === "end"){
stroke("yellow");
fill("yellow");
textSize(30);
text("Game Over", 230, 250);
}
}
function spawnDoors(){
  if(frameCount%240===0){
    
    door = createSprite(90, -1);
    door.addImage(doorImg);
    door.scale = 0.2;
    
    door.setCollider('circle',0,0,200)

    climber = createSprite(100, 10);
    climber.addImage(climberImg);
    climber.scale = 0.3;
     
    climbersGroup.add(climber);
    climber.setCollider('rectangle',0,100,890,10 )
    climber.debug = false;
    door.x = Math.round(random((100,200)&&(400,500)))
    door.velocityY = 1

    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifetime = 800;


    door.debug = false;
    ghost.debug = false;

    ghost.depth = door.depth
    ghost.depth = ghost.depth +1;

    door.lifetime = 800;
    doorsGroup.add(door);
  }
}