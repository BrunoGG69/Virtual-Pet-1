//Create variables here
var dog, happydog, DogSp, database, foodS, foodStock

function preload()
{
	//load images here
  dog = loadImage("images/dogImg.png");
  happydog = loadImage("images/dogImg1.png");
}

function setup() {

  database = firebase.database();
	createCanvas(500,500);

  DogSp = createSprite(250, 250, 10,10);
  DogSp.addImage(dog);

  DogSp.scale = 0.2;

  foodStock = database.ref('Food');

  foodStock.on("value", readStock);
  
  
}


function draw() {  

  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    DogSp.addImage(happydog);
  }

  drawSprites();
  //add styles here
  fill(255,255,255);

  text("Food Stock Remaining = "+ foodS, 180, 100);

}

function readStock(data){
    foodS = data.val();
}

function writeStock(x){
  if(x <= 0){
    x = 0
    
  }
  else{
    x = x-1;
  }
    database.ref('/').update({
      Food : x
    })      

}



