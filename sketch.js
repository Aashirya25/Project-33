const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var plank;
var ground;
var higherground;
var con, con2, con3
var rope, rope3
var bubble,bubble_img;
var chewsound
var button3
var balloon
var winimg,win
var loseimg,lose

function preload()
{
  //loading images
  bubble_img = loadImage("bubble.png")
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  winimg= loadImage("win.png")
  loseimg= loadImage("lose.png")
//loading animations
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  star_img = loadImage('star.png');
//loading sound
  chewsound = loadSound ("chewing.mp3")

  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(500,800);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

   var fruit_options = {
    restitution: 0.8
  }
  
  ground =new Ground(250,height-10,width,20);
  fruit = Bodies.circle(100,400,15,fruit_options);
  World.add(world,fruit);
  
  bubble = createSprite(330,400,20,20);
  bubble.addImage(bubble_img);
  bubble.scale = 0.1;
  
  win = createSprite(250,250,20,20)
  win.visible = false
  win.addImage(winimg)
  win.scale = 0.5

  lose = createSprite(250,250,20,20)
  lose.visible = false
  lose.addImage(loseimg)
  lose.scale = 0.25


  //bunny sprite
  blink.frameDelay = 20;
  eat.frameDelay = 20;
  bunny = createSprite(270,100,100,100);
  bunny.addImage(rabbit);
  bunny.scale = 0.2;
  higherground =new Ground(300,170,100,10);

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');

  //ropes and constraints
  rope = new Rope(5.5,{x:230,y:330});
  rope2 = new Rope(4,{x:50,y:450});
  rope3 = new Rope(6,{x:430,y:400});
  con = new Link(rope,fruit);
  con2 = new Link(rope2,fruit);
  con3 = new Link(rope3,fruit);

  //creating 3 buttons
  button = createImg('cut_btn.png');
  button.position(200,320);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg('cut_btn.png');
  button2.position(30,420);
  button2.size(50,50);

  //button2.Clicked(drop);
  
  //button2.mousePress(drop);
  
  //button2.mouseClick(drop);
  
  button2.mouseClicked(drop2);

  button3 = createImg('cut_btn.png');
  button3.position(400,400);
  button3.size(50,50);
  button3.mouseClicked(drop3);

//creating balloon
  balloon = createImg('balloon.png');
  balloon.position(50,500);
  balloon.size(100,60);
  balloon.mouseClicked(blow);

  ellipseMode(RADIUS);
}

function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);
  Engine.update(engine);
  textSize(20);
  fill(300,230)
text("Help the bunny to eat the watermelon",0,15)
text("Use the balloon and the bubble!",0,35)
 
  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  ground.show();
  higherground.show();
  rope.show();
  rope2.show();
  rope3.show();

  if(collide(fruit,bunny,80)==true)
  {
   remove_rope();
   bubble.visible = false;
   World.remove(engine.world,fruit);
   fruit = null;
   //bunny.changeAnimation('eating');
   //bunny.change('eating');
   bunny.changeAnimation('eating');
   //bunny.changeAnimation();
   //bunny.Animation('eating');
    chewsound.play()
    win.visible = true
  }
 

    if(collide(fruit,bubble,40) == true) { 
      engine.world.gravity.y = -1; 
      bubble.position.x = fruit.position.x; 
      bubble.position.y = fruit.position.y; 
    } 
    
/*if(fruit.position.y < height - 800){ bunny.changeAnimation('crying'); lose.visible = true }*/

     

  drawSprites();

}

function drop()
{
  rope.break();
  con.dettach();
  con = null; 
}

function drop2()
{
  rope2.break();
  con2.dettach();
  con2 = null; 
}

function drop3()
{
  rope3.break();
  con3.dettach();
  con3 = null; 
}

function remove_rope()
{
  rope.break();
  con.dettach();
  con = null; 
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
              
               return true; 
            }
            else{
              return false;
            }
         }
}

function blow (){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0.01,y:-0.02})
}
