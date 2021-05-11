//Create variables here
var dog, happyDog, database, foodS, foodStock;
var obj;

function preload()
{
	//load images here
  dog      = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  foodStock.set(20 )

  dogObj = createSprite(250,250,10,10);
  dogObj.addImage(dog);
  dogObj.scale = 0.15;


  
}


function draw() {  
  background(46, 139, 87)

    textSize(20);
    fill(255);
    text("Note: Press the up arrow to feed the dog.",75,60);
    text("Food left: "+ foodS,180,100);

if(foodS === 0){
   textSize(10)
   text("Thanks for the food master, I am going for a walk.....",135,320);
   dogObj.velocityX = -5;
   dogObj.addImage(happyDog);
 }  
  
 if(keyWentDown(UP_ARROW)){
   writeStock(foodS);
   dogObj.addImage(happyDog);
 }

 if(keyWentUp(UP_ARROW)){
   dogObj.addImage(dog);
 }

 

  dogObj.display()




  //add styles here

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<0){
    x = 0;
  }else{
    x = x - 1;
  }

  database.ref('/').update({
    Food : x
  })
}







